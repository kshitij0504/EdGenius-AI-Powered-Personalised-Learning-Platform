import { ApiError } from "./ApiError.js";


export const isInstructor = (req, res, next) => {
  if (req.user.role !== "INSTRUCTOR") {
    return res.status(403).json(new ApiError(403, "Unautorized request"));
  }
  next();
};