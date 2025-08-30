const authService = require("../service/authService");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

const signup = async (req, res) => {
  try {
    const { name, email, password, interests } = req.body;

    if (!name || !email || !password || !interests) {
      return res.status(400).json(new ApiError("All fields are required"));
    }

    const result = await authService.signup(name, email, password, interests);

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          result,
          "Signup successful. Please check your email to verify your account."
        )
      );
  } catch (error) {
    console.error("Signup Error:", error);
    return res
      .status(error.statusCode || 500)
      .json(
        new ApiError(
          error.statusCode || 500,
          null,
          error.message || "Something went wrong during signup."
        )
      );
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const result = await authService.verifyEmail(token);
    return res.redirect(302, result.redirectUrl);
  } catch (error) {
    console.error("Email Verification Error:", error);
    return res.redirect(
      302,
      `${process.env.FRONTEND_URL}/login?error=${encodeURIComponent(
        error.message || "Something went wrong during email verification."
      )}`
    );
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.signin(email, password);

  if (result.error) {
    return res
      .status(result.error.status)
      .json({ message: result.error.message });
  }

  res.cookie("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  return res.status(200).json({
    message: "Login successful",
    user: result.user,
    success: true,
  });
};

const googleSignin = async (req, res, next) => {
 const { credential } = req.body;
  if (!credential) {
    return next(new ApiError(400, "Missing Google token"));
  }

  try {
    const { user, token } = await authService.googleLoginService(credential);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res
      .status(200)
      .json(new ApiResponse(200, { user }, "Google login successful"));
  } catch (error) {
    next(error);
  }
}

const logout = async (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    })
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.forgetPasswordService(email);
    res.status(200).json(new ApiResponse(200, result, "Email sent"));
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const result = await authService.resetPassworService(token, newPassword);
    res.status(200).json(new ApiResponse(200, result, "Password reset"));
  } catch (error) {
    next(error);
  }
};

const userData = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await authService.getUserById(userId);
    res.status(200).json(new ApiResponse(200, { user }, "User data fetched"));
  } catch (error) {
    next(error);
  }
}
module.exports = { signup, verifyEmail, signin, logout, googleSignin, forgotPassword, resetPassword, userData };
