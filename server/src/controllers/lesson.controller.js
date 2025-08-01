const lessonService = require("../service/lesson.service");
const { ApiError } = require("../utils/ApiError");

const createLessonController = async (req, res) => {
  const instructorId = req.user.id;
  const video = req.file;

  if (!video) {
    return res.status(400).json({ success: false, message: "Video is required" });
  }

  const lessonData = {
    ...req.body,
    videoUrl: video?.path,
  };

  const lesson = await lessonService.createLesson(lessonData, instructorId, res);
  return res.status(201).json({ success: true, message: "Lesson created", data: lesson });
};

const getLessonsByModuleController = async (req, res) => {
  const { moduleId } = req.params;
  const instructorId = req.user.id;

  const lessons = await lessonService.getLessonsByModule(moduleId, instructorId, res);
  return res.status(200).json({
    success: true,
    message: "Lessons fetched",
    data: lessons,
  });
};

const deleteLessonController = async (req, res) => {
  const lessonId = req.params.id;
  const instructorId = req.user.id;

  const deleted = await lessonService.deleteLesson(lessonId, instructorId, res);
  return res.status(200).json({
    success: true,
    message: "Lesson deleted",
    data: deleted,
  });
};

const updateLessonController = async (req, res) => {
  const lessonId = req.params.id;
  const instructorId = req.user.id;
  const video = req.file;

  const updateData = {
    ...req.body,
    videoUrl: video?.path,
    videoPublicId: video?.filename,
  };

  const updated = await lessonService.updateLesson(lessonId, updateData, instructorId, res);
  return res.status(200).json({
    success: true,
    message: "Lesson updated",
    data: updated,
  });
};


module.exports = { createLessonController, getLessonsByModuleController, deleteLessonController, updateLessonController };
