const progressService = require('../service/progress.service')

const markLessonComplete = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { completed = true } = req.body;
    const userId = req.user.id;

    const progress = await progressService.markLessonComplete(userId, lessonId, completed);
    res.json({ success: true, progress });
  } catch (error) {
    console.error('Mark lesson complete error:', error);
    if (error.message === 'NOT_FOUND') return res.status(404).json({ error: 'Lesson not found' });
    if (error.message === 'NOT_ENROLLED') return res.status(403).json({ error: 'You are not enrolled in this course' });
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getLessonProgress = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user.id;

    const progress = await progressService.getLessonProgress(userId, lessonId);
    res.json({ success: true, progress });
  } catch (error) {
    console.error('Get lesson progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const data = await progressService.getCourseProgress(userId, courseId);
    res.json({ success: true, ...data });
  } catch (error) {
    console.error('Get course progress error:', error);
    if (error.message === 'NOT_ENROLLED') return res.status(403).json({ error: 'You are not enrolled in this course' });
    if (error.message === 'NOT_FOUND') return res.status(404).json({ error: 'Course not found' });
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserOverallProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await progressService.getUserOverallProgress(userId);
    res.json({ success: true, ...data });
  } catch (error) {
    console.error('Get user overall progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateVideoProgress = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { currentTime, duration, videoProgress, watchedSegments } = req.body;
    const userId = req.user.id;

    const { progress, isCompleted } = await progressService.updateVideoProgress(
      userId,
      lessonId,
      { currentTime, duration, videoProgress, watchedSegments }
    );

    res.json({
      success: true,
      progress,
      message: isCompleted ? 'Lesson completed!' : 'Progress saved'
    });
  } catch (error) {
    console.error('Update video progress error:', error);

    if (error.message === 'INVALID_TIME') return res.status(400).json({ error: 'Invalid time parameters' });
    if (error.message === 'NOT_ENROLLED') return res.status(403).json({ error: 'You are not enrolled in this course' });

    res.status(500).json({ error: 'Internal server error' });
  }
};

const getVideoProgress = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user.id;

    const progress = await progressService.getVideoProgress(userId, lessonId);

    res.json({ success: true, lessonId, progress });
  } catch (error) {
    console.error('Get video progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  markLessonComplete,
  getLessonProgress,
  getCourseProgress,
  getUserOverallProgress
};
