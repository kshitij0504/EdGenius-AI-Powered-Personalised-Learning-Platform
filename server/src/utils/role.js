const { ApiError } = require("../utils/ApiError");

const isInstructor = (req, res, next) => {
  if (req.user.role !== "INSTRUCTOR") {
    return res.status(403).json(new ApiError(403, "Unauthorized request"));
  }
  next();
};

module.exports = { isInstructor };
