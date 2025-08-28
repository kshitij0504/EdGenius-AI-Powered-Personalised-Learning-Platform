const instructorService = require('../service/instructor.service');

exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { page = 1, limit = 10, published, category, search } = req.query;

    const { courses, totalCount } = await instructorService.getInstructorCourses({
      instructorId,
      page: parseInt(page),
      limit: parseInt(limit),
      published,
      category,
      search
    });

    res.json({
      success: true,
      data: {
        courses,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCount / limit),
          totalCourses: totalCount,
          hasNext: (page * limit) < totalCount,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user.id;
    const course = await instructorService.getCourseDetails({ courseId, instructorId });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found or not authorized' });
    }

    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { title, description, thumbnail, category, price } = req.body;

    const course = await instructorService.createCourse({
      instructorId, title, description, thumbnail, category, price
    });

    res.status(201).json({ success: true, data: course, message: 'Course created successfully' });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ success: false, message: 'Course slug already exists' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user.id;
    const updateData = req.body;

    const updatedCourse = await instructorService.updateCourse({ courseId, instructorId, updateData });
    if (!updatedCourse) {
      return res.status(404).json({ success: false, message: 'Course not found or not authorized' });
    }

    res.json({ success: true, data: updatedCourse, message: 'Course updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleCoursePublication = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user.id;
    const { published } = req.body;

    const success = await instructorService.toggleCoursePublication({ courseId, instructorId, published });
    if (!success) {
      return res.status(404).json({ success: false, message: 'Course not found or not authorized' });
    }

    res.json({ success: true, message: `Course ${published ? 'published' : 'unpublished'} successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const instructorId = req.user.id;

    const result = await instructorService.deleteCourse({ courseId, instructorId });
    if (result.blocked) {
      return res.status(400).json({ success: false, message: 'Cannot delete course with active enrollments' });
    }
    if (!result) {
      return res.status(404).json({ success: false, message: 'Course not found or not authorized' });
    }

    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getEnrolledStudents = async (req, res) => {
  try {
    const instructorId = req.user.id;
    const { courseId, page = 1, limit = 20, search } = req.query;
    console.log(instructorId, courseId)

    const { enrollments, totalCount } = await instructorService.getEnrolledStudents({
      instructorId,
      courseId,
      page: parseInt(page),
      limit: parseInt(limit),
      search
    });

    res.json({
      success: true,
      data: {
        enrollments,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCount / limit),
          totalEnrollments: totalCount,
          hasNext: page * limit < totalCount,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const instructorId = req.user.id;

    const result = await instructorService.getStudentProgress({ instructorId, userId, courseId });

    if (!result) {
      return res.status(404).json({ success: false, message: 'Course not found or not authorized' });
    }
    if (result.notEnrolled) {
      return res.status(404).json({ success: false, message: 'Student not enrolled in this course' });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};