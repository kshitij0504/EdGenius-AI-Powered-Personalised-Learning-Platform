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
    let totalDuration = 0;
    let watchedTime = 0;

    enrollment.course.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        totalLessons++;
        if (lesson.completions.length > 0) {
          const completion = lesson.completions[0];
          if (completion.completed) {
            completedLessons++;
          }
          if (completion.duration) {
            totalDuration += completion.duration;
            watchedTime += (completion.currentTime || 0);
          }
        }
      });
    });

    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    // Calculate time spent in hours and minutes
    const timeSpentSeconds = watchedTime;
    const hours = Math.floor(timeSpentSeconds / 3600);
    const minutes = Math.floor((timeSpentSeconds % 3600) / 60);
    const timeSpent = `${hours}h ${minutes}m`;

    // Determine status
    let status = 'Started';
    if (progressPercentage === 100) status = 'Completed';
    else if (progressPercentage > 0) status = 'In Progress';

    return {
      courseId: enrollment.course.id,
      title: enrollment.course.title,
      slug: enrollment.course.slug,
      thumbnail: enrollment.course.thumbnail,
      totalLessons,
      completedLessons,
      progressPercentage,
      timeSpent,
      status,
      enrolledAt: enrollment.enrolledAt,
      lastAccessed: completedLessons > 0
        ? Math.max(...enrollment.course.modules.flatMap(m =>
            m.lessons.flatMap(l =>
              l.completions.filter(c => c.lastWatchedAt).map(c => new Date(c.lastWatchedAt))
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

// NEW: Get user statistics for progress dashboard
const getUserStats = async (userId) => {
  // Get all enrollments with progress
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

  let totalLessons = 0;
  let completedLessons = 0;
  let totalWatchTime = 0;
  const completionDates = [];

  enrollments.forEach(enrollment => {
    enrollment.course.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        totalLessons++;
        if (lesson.completions.length > 0) {
          const completion = lesson.completions[0];
          if (completion.completed) {
            completedLessons++;
            if (completion.completedAt) {
              completionDates.push(completion.completedAt);
            }
          }
          if (completion.currentTime) {
            totalWatchTime += completion.currentTime;
          }
        }
      });
    });
  });

  // Calculate streak (consecutive days of learning)
  const streak = calculateStreak(completionDates);

  // Calculate weekly progress
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const completedThisWeek = completionDates.filter(
    date => new Date(date) >= oneWeekAgo
  ).length;

  // Calculate daily average (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentCompletions = completionDates.filter(
    date => new Date(date) >= thirtyDaysAgo
  ).length;
  
  const dailyAverage = recentCompletions / 30;

  // Calculate average daily study time
  const avgDailyTimeSeconds = totalWatchTime / 30;
  const avgDailyHours = (avgDailyTimeSeconds / 3600).toFixed(1);

  // Calculate completion rate
  const completionRate = totalLessons > 0 
    ? Math.round((completedLessons / totalLessons) * 100) 
    : 0;

  return {
    totalLessons,
    completedLessons,
    xpPoints: completedLessons * 10, // 10 XP per completed lesson
    streak,
    completedThisWeek,
    weeklyGoal: 10, // Default weekly goal
    avgDailyStudyTime: `${avgDailyHours}h`,
    completionRate,
    totalEnrolledCourses: enrollments.length
  };
};

// Helper function to calculate learning streak
const calculateStreak = (completionDates) => {
  if (completionDates.length === 0) return 0;

  // Sort dates in descending order
  const sortedDates = completionDates
    .map(d => new Date(d).toDateString())
    .sort((a, b) => new Date(b) - new Date(a));

  // Remove duplicates
  const uniqueDates = [...new Set(sortedDates)];

  let streak = 0;
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  // Check if user learned today or yesterday
  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
    return 0;
  }

  // Count consecutive days
  let currentDate = new Date(uniqueDates[0]);
  for (let i = 0; i < uniqueDates.length; i++) {
    const checkDate = new Date(currentDate);
    checkDate.setDate(checkDate.getDate() - i);
    
    if (uniqueDates[i] === checkDate.toDateString()) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
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
  getUserStats,
  updateVideoProgress,
  getVideoProgress
};
