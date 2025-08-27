const prisma = require("../config/prisma");

const searchCourses = async ({ q, limit = 10, page = 1, sort = 'createdAt', order = 'desc' }) => {
  const pageNumber = Math.max(1, parseInt(page));
  const limitNumber = Math.min(50, Math.max(1, parseInt(limit)));
  const offset = (pageNumber - 1) * limitNumber;

  // Valid sort fields
  const validSortFields = ['createdAt', 'title', 'price', 'category'];
  const sortField = validSortFields.includes(sort) ? sort : 'createdAt';
  const sortOrder = order === 'asc' ? 'asc' : 'desc';

  if (!q || q.trim().length < 2) {
    throw new Error('INVALID_QUERY');
  }

  const searchConditions = {
    published: true,
    OR: [
      { title: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
      { category: { contains: q, mode: 'insensitive' } },
      { instructor: { name: { contains: q, mode: 'insensitive' } } }
    ]
  };

  const totalCourses = await prisma.course.count({ where: searchConditions });

  const courses = await prisma.course.findMany({
    where: searchConditions,
    include: {
      instructor: { select: { id: true, name: true, profilePhoto: true } },
      enrollments: { select: { id: true } },
      modules: { include: { lessons: { select: { id: true } } } }
    },
    orderBy: { [sortField]: sortOrder },
    skip: offset,
    take: limitNumber
  });

  const formattedCourses = courses.map(course => ({
    id: course.id,
    title: course.title,
    slug: course.slug,
    description: course.description.substring(0, 200) + '...',
    thumbnail: course.thumbnail,
    category: course.category,
    price: course.price,
    instructor: course.instructor,
    studentsCount: course.enrollments.length,
    lessonsCount: course.modules.reduce((total, module) => total + module.lessons.length, 0),
    createdAt: course.createdAt,
    updatedAt: course.updatedAt
  }));

  return {
    courses: formattedCourses,
    pagination: {
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCourses / limitNumber),
      totalCourses,
      coursesPerPage: limitNumber,
      hasNextPage: pageNumber < Math.ceil(totalCourses / limitNumber),
      hasPrevPage: pageNumber > 1
    },
    search: {
      query: q,
      resultsFound: totalCourses,
      searchTime: new Date().toISOString()
    }
  };
};

const filterCourses = async (params) => {
  const {
    category,
    minPrice,
    maxPrice,
    instructor,
    isFree,
    limit = 12,
    page = 1,
    sort = 'createdAt',
    order = 'desc'
  } = params;

  const pageNumber = Math.max(1, parseInt(page));
  const limitNumber = Math.min(50, Math.max(1, parseInt(limit)));
  const offset = (pageNumber - 1) * limitNumber;

  const validSortFields = ['createdAt', 'title', 'price', 'category', 'studentsCount'];
  const sortField = validSortFields.includes(sort) ? sort : 'createdAt';
  const sortOrder = order === 'asc' ? 'asc' : 'desc';

  const filterConditions = { published: true, AND: [] };

  if (category) {
    filterConditions.AND.push({ category: { equals: category, mode: 'insensitive' } });
  }

  if (minPrice !== undefined || maxPrice !== undefined || isFree === 'true') {
    const priceCondition = {};
    if (isFree === 'true') priceCondition.equals = 0;
    else {
      if (minPrice !== undefined) priceCondition.gte = parseFloat(minPrice);
      if (maxPrice !== undefined) priceCondition.lte = parseFloat(maxPrice);
    }
    filterConditions.AND.push({ price: priceCondition });
  }

  if (instructor) {
    filterConditions.AND.push({ instructor: { name: { contains: instructor, mode: 'insensitive' } } });
  }

  if (filterConditions.AND.length === 0) delete filterConditions.AND;

  const totalCourses = await prisma.course.count({ where: filterConditions });

  let orderBy = {};
  if (sortField === 'studentsCount') {
    orderBy = { enrollments: { _count: sortOrder } };
  } else {
    orderBy[sortField] = sortOrder;
  }

  const courses = await prisma.course.findMany({
    where: filterConditions,
    include: {
      instructor: { select: { id: true, name: true, profilePhoto: true } },
      enrollments: { select: { id: true } },
      modules: { include: { lessons: { select: { id: true } } } }
    },
    orderBy,
    skip: offset,
    take: limitNumber
  });

  const formattedCourses = courses.map(course => ({
    id: course.id,
    title: course.title,
    slug: course.slug,
    description: course.description.substring(0, 200) + '...',
    thumbnail: course.thumbnail,
    category: course.category,
    price: course.price,
    instructor: course.instructor,
    studentsCount: course.enrollments.length,
    lessonsCount: course.modules.reduce((total, module) => total + module.lessons.length, 0),
    modulesCount: course.modules.length,
    createdAt: course.createdAt,
    isFree: course.price === 0
  }));

  return {
    courses: formattedCourses,
    pagination: {
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCourses / limitNumber),
      totalCourses,
      coursesPerPage: limitNumber,
      hasNextPage: pageNumber < Math.ceil(totalCourses / limitNumber),
      hasPrevPage: pageNumber > 1
    },
    filters: {
      applied: { category, minPrice, maxPrice, instructor, isFree: isFree === 'true' },
      resultsFound: totalCourses
    }
  };
};

module.exports = {
  searchCourses,
  filterCourses
};