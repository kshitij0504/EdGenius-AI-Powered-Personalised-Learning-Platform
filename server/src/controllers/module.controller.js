const moduleService = require("../service/module.service");
const { ApiResponse } = require("../utils/ApiResponse");

const createModuleController = async (req, res, next) => {
  const instructorId = req.user.id;
  const courseId = req.params.courseId;

  const moduleData = {
    ...req.body,
    courseId,
  };

  const module = await moduleService.createModule(moduleData, instructorId,res);
  return res.status(201).json(new ApiResponse(201, module, "Module created"));
};

const getModulesByCourseIdController = async (req, res, next) => {
  const courseId = req.params.courseId;
  const modules = await moduleService.getModulesByCourseId(courseId,res);
  return res.status(200).json(new ApiResponse(200, modules));
};

const updateModuleController = async (req, res, next) => {
  const moduleId = req.params.moduleId;
  const updatedData = req.body;
  const module = await moduleService.updateModule(moduleId, updatedData,res);
  return res.status(200).json(new ApiResponse(200, module, "Module updated"));
};

const deleteModuleController = async (req, res, next) => {
  const moduleId = req.params.moduleId;
  await moduleService.deleteModule(moduleId,res);
  return res.status(200).json(new ApiResponse(200, null, "Module deleted"));
};

module.exports = {
  createModuleController,
  getModulesByCourseIdController,
  updateModuleController,
  deleteModuleController,
};
