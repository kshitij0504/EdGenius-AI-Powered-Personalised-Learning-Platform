const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/ApiError");

const authenticate = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("Authentication Middleware: Token received", token);
  
  if (!token) {
    return next(new ApiError(401, "Authentication token missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    console.log(decoded)
    next();
  } catch (err) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
};

module.exports = authenticate;
