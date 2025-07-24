const authService = require("../service/authService");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

const signup = async (req, res) => {
  try {
    const { email, password, interests } = req.body;

    if (!email || !password || !interests) {
      return res.status(400).json(new ApiError("All fields are required"));
    }

    console.log("Signup Request:", { email, interests });

    const result = await authService.signup(email, password, interests);

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

  res
    .cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    })
    .status(200)
    .json(result.response);
};

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

module.exports = { signup, verifyEmail, signin, logout };
