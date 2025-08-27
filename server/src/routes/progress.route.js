const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const progressController = require('../controllers/progress.controller')
// Protect all progress routes
router.use(authenticate);

router.put('/lesson/:lessonId', progressController.markLessonComplete);
router.get('/lesson/:lessonId', progressController.getLessonProgress);
router.get('/course/:courseId', progressController.getCourseProgress);
router.get('/overall', progressController.getUserOverallProgress);

module.exports = router;
