const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const progressController = require("../controllers/progressController")
// Get user overall statistics
router.get('/stats', authenticate, async (req, res) => {
  try {
    const stats = await progressController.getUserStats(req.user.id);
    console.log(stats);
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's overall progress across all courses
router.get('/overview', authenticate, async (req, res) => {
  try {
    const progress = await progressController.getUserOverallProgress(req.user.id);
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get progress for a specific course
router.get('/course/:courseId', authenticate, async (req, res) => {
  try {
    const progress = await progressController.getCourseProgress(
      req.user.id,
      req.params.courseId
    );
    res.json(progress);
  } catch (error) {
    if (error.message === 'NOT_ENROLLED') {
      return res.status(403).json({ error: 'Not enrolled in this course' });
    }
    if (error.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Mark lesson as complete/incomplete
router.post('/lesson/:lessonId/complete', authenticate, async (req, res) => {
  try {
    const { completed = true } = req.body;
    const progress = await progressController.markLessonComplete(
      req.user.id,
      req.params.lessonId,
      completed
    );
    res.json(progress);
  } catch (error) {
    if (error.message === 'NOT_ENROLLED') {
      return res.status(403).json({ error: 'Not enrolled in this course' });
    }
    if (error.message === 'NOT_FOUND') {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Update video progress
router.post('/lesson/:lessonId/video-progress', authenticate, async (req, res) => {
  try {
    const { currentTime, duration, videoProgress, watchedSegments } = req.body;
    const result = await progressController.updateVideoProgress(
      req.user.id,
      req.params.lessonId,
      { currentTime, duration, videoProgress, watchedSegments }
    );
    res.json(result);
  } catch (error) {
    if (error.message === 'INVALID_TIME') {
      return res.status(400).json({ error: 'Invalid time values' });
    }
    if (error.message === 'NOT_ENROLLED') {
      return res.status(403).json({ error: 'Not enrolled in this course' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Get video progress
router.get('/lesson/:lessonId/video-progress', authenticate, async (req, res) => {
  try {
    const progress = await progressController.getVideoProgress(
      req.user.id,
      req.params.lessonId
    );
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
