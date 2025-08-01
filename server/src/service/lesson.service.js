const prisma = require("../config/prisma");
const { ApiError } = require("../utils/ApiError");

const createLesson = async (data, instructorId, res) => {
  const module = await prisma.module.findUnique({
    where: { id: data.moduleId },
    include: {
      course: true,
    },
  });

  if (!module) {
    return res.status(404).json(new ApiError(404, "Module Not Found"));
  }

  if (module.course.instructorId !== instructorId) {
    return res
      .status(403)
      .json(
        new ApiError(
          403,
          "You are not authorized to add lessons to this module"
        )
      );
  }

  const lessonOrder = await prisma.lesson.count({
    where: { moduleId: data.moduleId },
  });

  return prisma.lesson.create({
    data: {
      title: data.title,
      content: data.content,
      order: lessonOrder + 1,
      videoUrl: data.videoUrl,
      videoPublicId: data.videoPublicId,
      moduleId: data.moduleId,
    },
  });
};

const getLessonsByModule = async (moduleId, instructorId, res) => {
  const module = await prisma.module.findUnique({
    where: { id: moduleId },
    include: { course: true },
  });

  if (!module) {
    return res.status(404).json(new ApiError(404, "Module not found"));
  }

  if (module.course.instructorId !== instructorId) {
    return res.status(403).json(new ApiError(403, "Unauthorized access to this module"));
  }

  return prisma.lesson.findMany({
    where: { moduleId },
    orderBy: { order: "asc" },
  });
};

const deleteLesson = async (lessonId, instructorId, res) => {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: {
        include: { course: true },
      },
    },
  });

  if (!lesson) {
    return res.status(404).json(new ApiError(404, "Lesson not found"));
  }

  if (lesson.module.course.instructorId !== instructorId) {
    return res.status(403).json(new ApiError(403, "Unauthorized to delete this lesson"));
  }

  return prisma.lesson.delete({ where: { id: lessonId } });
};

const updateLesson = async (lessonId, updateData, instructorId, res) => {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: {
        include: { course: true },
      },
    },
  });

  if (!lesson) {
    return res.status(404).json(new ApiError(404, "Lesson not found"));
  }

  if (lesson.module.course.instructorId !== instructorId) {
    return res.status(403).json(new ApiError(403, "Unauthorized to update this lesson"));
  }

  return prisma.lesson.update({
    where: { id: lessonId },
    data: {
      title: updateData.title,
      content: updateData.content,
      videoUrl: updateData.videoUrl || lesson.videoUrl,
      videoPublicId: updateData.videoPublicId || lesson.videoPublicId,
    },
  });
};



module.exports = {
  createLesson,
  getLessonsByModule,
  deleteLesson,
  updateLesson
};
