const prisma = require("../config/prisma");
const { ApiError } = require("../utils/ApiError");

const createModule = async (moduleData, instructorId, res) => {
  const course = await prisma.course.findUnique({
    where: { id: moduleData.courseId },
    include: { instructor: true },
  });

  if (!course) {
    return res.status(404).json(new ApiError(404, "Course not found"));
  }

  if (course.instructorId !== instructorId) {
    return res
      .status(403)
      .json(
        new ApiError(
          403,
          "You are not authorized to add modules to this course"
        )
      );
  }

  const order = await prisma.module.count({
    where: { courseId: moduleData.courseId },
  });

  return prisma.module.create({
    data: {
      title: moduleData.title,
      order: order + 1,
      courseId: moduleData.courseId,
    },
  });
};

const getModulesByCourseId = async (courseId, res) => {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    return res.status(404).json(new ApiError(404, "Course not found"));
  }

  return prisma.module.findMany({
    where: { courseId },
    orderBy: { order: "asc" },
  });
};

const updateModule = async (moduleId, updatedData, res) => {
  const existing = await prisma.module.findUnique({ where: { id: moduleId } });

  if (!existing) {
    return res
      .status(404)
      .json(new ApiError(404, "Module not found"));
  }

  return prisma.module.update({
    where: { id: moduleId },
    data: updatedData,
  });
};

const deleteModule = async (moduleId, res) => {
  const existing = await prisma.module.findUnique({ where: { id: moduleId } });

  if (!existing) {
    return res
      .status(404)
      .json(new ApiError(404, "Module not found"));
  }

  return prisma.module.delete({
    where: { id: moduleId },
  });
};

module.exports = {
  createModule,
  getModulesByCourseId,
  updateModule,
  deleteModule,
};
