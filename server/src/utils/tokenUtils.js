const jwt = require("jsonwebtoken");
const { ApiError } = require("./ApiError");

const generateEmailVerificationToken = (userId) => {
  return jwt.sign({ userId }, process.env.EMAIL_VERIFICATION_SECRET, {
    expiresIn: "1d",
  });
};

const verifyEmailVerificationToken = (token) => {
  try {
    return jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);
  } catch (error) {
    return res.status(400).json(new ApiError(400, "Invalid or expired token"));
  }
};

const generateSiginToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, isVerified: user.isVerified },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

module.exports = {
  generateEmailVerificationToken,
  verifyEmailVerificationToken,
  generateSiginToken,
};
