const prisma = require("../config/prisma");

// 📌 Get Instructor Courses
exports.getInstructorCourses = async ({ instructorId, page, limit, published, category, search }) => {
  const skip = (page - 1) * limit;

  const whereClause = {
    instructorId,
    ...(published !== undefined && { published: published === "true" }),
    ...(category && { category }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const [courses, totalCount] = await prisma.$transaction([
    prisma.course.findMany({
      where: whereClause,
      include: {
        modules: {
          include: {
            lessons: {
              include: {
                quizzes: { include: { questions: true } },
              },
            },
          },
        },
        enrollments: {
          include: { user: { select: { id: true, name: true, email: true } } },
        },
        _count: { select: { enrollments: true, modules: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: parseInt(skip),
      take: parseInt(limit),
    }),
    prisma.course.count({ where: whereClause }),
  ]);

  return { courses, totalCount };
};

// 📌 Get Course Details
exports.getCourseDetails = async ({ courseId, instructorId }) => {
  return prisma.course.findFirst({
    where: { id: courseId, instructorId },
    include: {
      modules: {
        include: {
          lessons: {
            include: {
              quizzes: { include: { questions: true } },
              completions: {
                include: { user: { select: { id: true, name: true, email: true } } },
              },
            },
          },
        },
        orderBy: { order: "asc" },
      },
      enrollments: {
        include: {
          user: { select: { id: true, name: true, email: true, profilePhoto: true } },
        },
        orderBy: { enrolledAt: "desc" },
      },
      _count: { select: { enrollments: true } },
    },
  });
};

// 📌 Create Course
exports.createCourse = async ({ instructorId, title, description, thumbnail, category, price }) => {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim("-");

  return prisma.course.create({
    data: {
      title,
      slug: `${slug}-${Date.now()}`,
      description,
      thumbnail,
      category,
      price: parseFloat(price) || 0,
      instructorId,
      published: false,
    },
    include: {
      instructor: { select: { id: true, name: true, email: true } },
      _count: { select: { enrollments: true, modules: true } },
    },
  });
};

// 📌 Update Course
exports.updateCourse = async ({ courseId, instructorId, updateData }) => {
  if (updateData.title) {
    const baseSlug = updateData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-");
    updateData.slug = `${baseSlug}-${Date.now()}`;
  }

  return prisma.$transaction(async (tx) => {
    const updated = await tx.course.updateMany({
      where: { id: courseId, instructorId },
      data: updateData,
    });

    if (updated.count === 0) return null;

    return tx.course.findUnique({
      where: { id: courseId },
      include: {
        instructor: { select: { id: true, name: true, email: true } },
        _count: { select: { enrollments: true, modules: true } },
      },
    });
  });
};

// 📌 Toggle Course Publication
exports.toggleCoursePublication = async ({ courseId, instructorId, published }) => {
  const updated = await prisma.course.updateMany({
    where: { id: courseId, instructorId },
    data: { published: Boolean(published) },
  });
  return updated.count > 0;
};

// 📌 Delete Course
exports.deleteCourse = async ({ courseId, instructorId }) => {
  return prisma.$transaction(async (tx) => {
    const enrollmentCount = await tx.enrollment.count({ where: { courseId } });
    if (enrollmentCount > 0) return { blocked: true };

    const deleted = await tx.course.deleteMany({
      where: { id: courseId, instructorId },
    });

    return deleted.count > 0;
  });
};

// 📌 Get Enrolled Students
exports.getEnrolledStudents = async ({ instructorId, courseId, page, limit, search }) => {
  const skip = (page - 1) * limit;

  const whereClause = {
    course: { instructorId },
    ...(courseId && { courseId }),
    ...(search && {
      user: {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      },
    }),
  };

  const [enrollments, totalCount] = await prisma.$transaction([
    prisma.enrollment.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
            createdAt: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            thumbnail: true,
          },
        },
      },
      orderBy: { enrolledAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.enrollment.count({ where: whereClause }),
  ]);

  return { enrollments, totalCount };
};

// 📌 Get Student Progress
exports.getStudentProgress = async ({ instructorId, userId, courseId }) => {
  return prisma.course.findFirst({
    where: { id: courseId, instructorId },
    include: {
      modules: {
        include: {
          lessons: {
            include: {
              completions: { where: { userId } },
              quizzes: { include: { questions: true } },
            },
          },
        },
        orderBy: { order: "asc" },
      },
      enrollments: {
        where: { userId },
        include: { user: { select: { id: true, name: true, email: true, profilePhoto: true } } },
      },
    },
  });
};
