const express = require("express");
const {
  createModuleController,
  getModulesByCourseIdController,
  updateModuleController,
  deleteModuleController,
} = require("../controllers/module.controller");
const { isInstructor } = require("../utils/role");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authenticate);


router.post("/:courseId", isInstructor, createModuleController);
router.get("/:courseId", getModulesByCourseIdController);
router.put("/update/:moduleId", isInstructor, updateModuleController);
router.delete("/delete/:moduleId", isInstructor, deleteModuleController);

module.exports = router;