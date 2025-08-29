const enrollService = require('../service/enroll.service');
const { ApiError } = require('../utils/ApiError');

const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;
    const result = await enrollService.enrollCourse(userId, courseId, res);
    console.log(res);
    
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

const addToCart = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;
    const result = await enrollService.addToCart(userId, courseId);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

const checkoutCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await enrollService.checkoutCart(userId, res);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

const verifyPayment = async (req, res) => {
  try {
    await enrollService.verifyPayment(req, res);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

const getMyCourses = async (req, res) => {
  try {
    await enrollService.getMyCourses(req, res);
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

module.exports = {
  enrollCourse,
  addToCart,
  checkoutCart,
  verifyPayment,
  getMyCourses,
};