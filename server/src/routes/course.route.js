const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const authenticate = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");
const { isInstructor } = require("../utils/role");


router.post(
  "/",
  authenticate,
  isInstructor,
  upload.single("thumbnail"),
  courseController.createCourseController
);

router.get("/", authenticate, courseController.getAllCoursesController);
router.get("/:slug", authenticate, courseController.getCourseBySlugController);

module.exports = router;
