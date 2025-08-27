const { slugify } = require("../utils/slugify");
const prisma = require("../config/prisma");
const { ApiError } = require("../utils/ApiError");

const createCourse = async (data, instructorId) => {
  const { title, description, category, thumbnail, price } = data;
  const slug = slugify(title);

  const existing = await prisma.course.findUnique({ where: { slug } });
  if (existing)
    throw new ApiError(409, "Course with this title already exists");

  const course = await prisma.course.create({
    data: {
      title,
      slug,
      description,
      category,
      thumbnail,
      price: parseFloat(price),
      instructorId,
    },
  });

  return course;
};

const getAllPublishedCourses = async () => {
  return await prisma.course.findMany({
    where: { published: true },
    include: {
      instructor: { select: { id: true, name: true, profilePhoto: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getCourseBySlug = async (slug) => {
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      instructor: { select: { id: true, name: true, profilePhoto: true } },
      modules: {
        orderBy: { order: "asc" },
        include: { lessons: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!course) throw new ApiError(404, "Course not found");
  return course;
};

module.exports = {
  createCourse,
  getAllPublishedCourses,
  getCourseBySlug,
};
