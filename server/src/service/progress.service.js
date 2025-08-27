const prisma = require("../config/prisma");

const markLessonComplete = async (userId, lessonId, completed = true) => {
  // Check if user is enrolled in the course containing this lesson
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: {
        include: {
          course: {
            include: {
              enrollments: { where: { userId } }
            }
          }
        }
      }
    }
  });

  if (!lesson) throw new Error('NOT_FOUND');
  if (lesson.module.course.enrollments.length === 0) throw new Error('NOT_ENROLLED');

  // Upsert lesson progress
  const progress = await prisma.lessonProgress.upsert({
    where: {
      userId_lessonId: { userId, lessonId }
    },
    update: {
      completed,
      completedAt: completed ? new Date() : null
    },
    create: {
      userId,
      lessonId,
      completed,
      completedAt: completed ? new Date() : null
    }
  });

  return progress;
};

const getLessonProgress = async (userId, lessonId) => {
  const progress = await prisma.lessonProgress.findUnique({
    where: { userId_lessonId: { userId, lessonId } }
  });

  return progress || { completed: false, completedAt: null };
};

const getCourseProgress = async (userId, courseId) => {
  // Check enrollment
  const enrollment = await prisma.enrollment.findFirst({
    where: { userId, courseId }
  });
  if (!enrollment) throw new Error('NOT_ENROLLED');

  const courseWithProgress = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
            include: {
              completions: { where: { userId } }
            }
          }
        }
      }
    }
  });

  if (!courseWithProgress) throw new Error('NOT_FOUND');

  let totalLessons = 0;
  let completedLessons = 0;

  const moduleProgress = courseWithProgress.modules.map(module => {
    const lessons = module.lessons.map(lesson => {
      totalLessons++;
      const isCompleted = lesson.completions.length > 0 && lesson.completions[0].completed;
      if (isCompleted) completedLessons++;
      return {
        id: lesson.id,
        title: lesson.title,
        order: lesson.order,
        completed: isCompleted,
        completedAt: isCompleted ? lesson.completions[0].completedAt : null
      };
    });

    return {
      id: module.id,
      title: module.title,
      order: module.order,
      lessons,
      completedCount: lessons.filter(l => l.completed).length,
      totalCount: lessons.length
    };
  });

  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return {
    courseId,
    totalLessons,
    completedLessons,
    progressPercentage,
    modules: moduleProgress,
    enrolledAt: enrollment.enrolledAt
  };
};

const getUserOverallProgress = async (userId) => {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          modules: {
            include: {
              lessons: {
                include: {
                  completions: { where: { userId } }
                }
              }
            }
          }
        }
      }
    }
  });

  const coursesProgress = enrollments.map(enrollment => {
    let totalLessons = 0;
    let completedLessons = 0;

    enrollment.course.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        totalLessons++;
        if (lesson.completions.length > 0 && lesson.completions[0].completed) {
          completedLessons++;
        }
      });
    });

    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    return {
      courseId: enrollment.course.id,
      title: enrollment.course.title,
      slug: enrollment.course.slug,
      thumbnail: enrollment.course.thumbnail,
      totalLessons,
      completedLessons,
      progressPercentage,
      enrolledAt: enrollment.enrolledAt,
      lastAccessed: completedLessons > 0
        ? Math.max(...enrollment.course.modules.flatMap(m =>
            m.lessons.flatMap(l =>
              l.completions.filter(c => c.completed).map(c => new Date(c.completedAt))
            )
          ))
        : null
    };
  });

  return {
    courses: coursesProgress,
    totalEnrolledCourses: coursesProgress.length,
    totalCompletedCourses: coursesProgress.filter(c => c.progressPercentage === 100).length
  };
};

const updateVideoProgress = async (userId, lessonId, { currentTime, duration, videoProgress, watchedSegments = [] }) => {
  // Validate input
  if (currentTime < 0 || (duration && currentTime > duration)) {
    throw new Error('INVALID_TIME');
  }

  // Check enrollment
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: {
        include: {
          course: {
            include: {
              enrollments: { where: { userId } }
            }
          }
        }
      }
    }
  });

  if (!lesson || lesson.module.course.enrollments.length === 0) {
    throw new Error('NOT_ENROLLED');
  }

  // Completion threshold logic
  const completionThreshold = 85; // % watched = complete
  const isCompleted = videoProgress >= completionThreshold;

  // Upsert lesson progress
  const progress = await prisma.lessonProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: {
      currentTime,
      duration: duration || undefined,
      videoProgress,
      watchedSegments,
      lastWatchedAt: new Date(),
      completed: isCompleted,
      completedAt: isCompleted ? new Date() : undefined
    },
    create: {
      userId,
      lessonId,
      currentTime,
      duration,
      videoProgress,
      watchedSegments,
      lastWatchedAt: new Date(),
      completed: isCompleted,
      completedAt: isCompleted ? new Date() : null
    }
  });

  return { progress, isCompleted };
};

const getVideoProgress = async (userId, lessonId) => {
  const progress = await prisma.lessonProgress.findUnique({
    where: { userId_lessonId: { userId, lessonId } },
    include: {
      lesson: { select: { title: true, videoUrl: true } }
    }
  });

  return progress
    ? {
        currentTime: progress.currentTime,
        duration: progress.duration,
        videoProgress: progress.videoProgress,
        watchedSegments: progress.watchedSegments || [],
        completed: progress.completed,
        completedAt: progress.completedAt,
        lastWatchedAt: progress.lastWatchedAt
      }
    : {
        currentTime: 0,
        duration: null,
        videoProgress: 0,
        watchedSegments: [],
        completed: false,
        completedAt: null,
        lastWatchedAt: null
      };
};

module.exports = {
  markLessonComplete,
  getLessonProgress,
  getCourseProgress,
  getUserOverallProgress,
  updateVideoProgress,
  getVideoProgress
};
