const courseService = require("../service/course.service");
const { ApiResponse } = require("../utils/ApiResponse");

const createCourseController = async (req, res, next) => {
  try {
    const instructorId = req.user.id;
    const thumbnail = req.file?.path;
    if (!thumbnail) {
      throw new ApiError(400, "Thumbnail image is required");
    }

    const courseData = {
      ...req.body,
      thumbnail,
    };

    const course = await courseService.createCourse(courseData, instructorId);
    return res.status(201).json(new ApiResponse(201, course, "Course created"));
  } catch (err) {
    next(err);
  }
};

const getAllCoursesController = async (req, res, next) => {
  try {
    const courses = await courseService.getAllPublishedCourses();
    return res.status(200).json(new ApiResponse(200, courses));
  } catch (err) {
    next(err);
  }
};

const getCourseBySlugController = async (req, res, next) => {
  try {
    const course = await courseService.getCourseBySlug(req.params.slug);
    return res.status(200).json(new ApiResponse(200, course));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCourseController,
  getAllCoursesController,
  getCourseBySlugController,
};
