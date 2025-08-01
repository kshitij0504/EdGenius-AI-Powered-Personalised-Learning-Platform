const express = require("express");
const router = express.Router();
const { createLessonController, getLessonsByModuleController, updateLessonController, deleteLessonController } = require("../controllers/lesson.controller");
const authenticate = require("../middleware/authMiddleware");
const uploadVideo = require("../middleware/multervideo.middleware");
const { isInstructor } = require("../utils/role");

router.use(authenticate)
router.post("/create", isInstructor, uploadVideo.single("video"), createLessonController);
router.get("/:moduleId", getLessonsByModuleController);
router.put("/:id", uploadVideo.single("video"), updateLessonController);
router.delete("/:id", deleteLessonController);

module.exports = router;
