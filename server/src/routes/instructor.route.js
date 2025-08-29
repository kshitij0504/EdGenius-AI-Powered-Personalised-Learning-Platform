const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructor.controller");
const authenticate = require("../middleware/authMiddleware");
const { isInstructor } = require("../utils/role");
const upload = require("../middleware/multer");

router.use(authenticate);
router.get("/courses", isInstructor, instructorController.getInstructorCourses);
router.get(
  "/courses/:courseId",
  isInstructor,
  instructorController.getCourseDetails
);
router.post("/courses", isInstructor, instructorController.createCourse);
router.put(
  "/courses/:courseId",
  isInstructor,
  upload.single("thumbnailFile"), // 👈 multer handles thumbnail file
  instructorController.updateCourse
);
router.patch(
  "/courses/:courseId/publish",
  isInstructor,
  instructorController.toggleCoursePublication
);
router.delete(
  "/courses/:courseId",
  isInstructor,
  instructorController.deleteCourse
);
router.get("/students", isInstructor, instructorController.getEnrolledStudents);
router.get(
  "/students/:userId/courses/:courseId",
  isInstructor,
  instructorController.getStudentProgress
);

module.exports = router;
