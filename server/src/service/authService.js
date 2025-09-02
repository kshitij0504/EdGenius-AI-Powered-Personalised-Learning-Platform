const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const {
  sendVerificationEmail,
  sendPasswordResetEmail,
} = require("../utils/sendEmail");
const { OAuth2Client } = require("google-auth-library");
const {
  generateEmailVerificationToken,
  verifyEmailVerificationToken,
  generateSiginToken,
  generatePasswordResetToken,
  verifyPasswordResetToken,
} = require("../utils/tokenUtils");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signup = async (name, email, password, interests) => {
  console.log("Signup Service:", { name, email, interests });

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const message = existingUser.isVerified
      ? "Email is already registered and verified."
      : "Email already registered. Please verify your account.";
    throw new ApiError(409, message);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const token = generateEmailVerificationToken();
  if (!token) throw new ApiError(500, "Could not generate verification token");

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const createdUser = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        interests,
      },
    });

    await tx.verificationToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    return user;
  });

  try {
    await sendVerificationEmail(createdUser.email, token);
  } catch (err) {
    await prisma.user.delete({ where: { id: createdUser.id } });
    throw new ApiError(500, "Failed to send verification email");
  }

  return createdUser;
};

const verifyEmail = async (token) => {
  let payload;

  try {
    payload = verifyEmailVerificationToken(token);
  } catch (error) {
    throw new ApiError(400, "Invalid or expired token");
  }

  const verificationRecord = await prisma.verificationToken.findUnique({
    where: { token },token
  });

  if (!verificationRecord) {
    throw new ApiError(400, "Invalid or expired token");
  }

  if (verificationRecord.expiresAt < new Date()) {
    throw new ApiError(400, "Token has expired");
  }

  const user = await prisma.user.findUnique({
    where: { id: verificationRecord.userId },
  });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  if (user.isVerified) {
    await prisma.verificationToken.delete({
      where: { token },
    });
    return {
      redirectUrl: `${process.env.FRONTEND_URL}/login?message=already_verified`,
    };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { isVerified: true },
  });

  await prisma.verificationToken.delete({ where: { token } });

  return { redirectUrl: `${process.env.FRONTEND_URL}/login?message=verified` };
};

// authService.js
const signin = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { error: { status: 404, message: "User not found" } };
  }

  if (!user.isVerified) {
    return { error: { status: 403, message: "Email not verified" } };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { error: { status: 401, message: "Invalid email or password" } };
  }

  const token = generateSiginToken(user);

  const userData = {
    id: user.id,
    email: user.email,
    isVerified: user.isVerified,
    interests: user.interests,
    role: user.role,
    redirectTo:
      user.role === "INSTRUCTOR" ? "/instructor/dashboard" : "/user/home",
  };

  return {
    token,
    user: userData,
  };
};

const googleLoginService = async (credential) => {
  let ticket;
  try {
    ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
  } catch (err) {
    throw new ApiError(401, "Invalid Google token");
  }

  const payload = ticket.getPayload();
  const { email, name, picture } = payload;

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
        isVerified: true,
        isGoogleUser: true,
        interests: [],
        profilePhoto: picture || process.env.DEFAULT_PROFILE_PIC,
      },
    });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };
};

const resetPassworService = async (token, newPassword) => {
  const payload = verifyPasswordResetToken(token);

  const record = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!record || record.expiresAt < new Date()) {
    throw new ApiError(400, "Invalid or expired token");
  }

  const hashed = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: payload.userId },
    data: { password: hashed },
  });

  await prisma.passwordResetToken.delete({ where: { token } });

  return { message: "Password reset successful" };
};

const forgetPasswordService = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new ApiError(404, "User not found");

  const token = generatePasswordResetToken(user.id);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.passwordResetToken.create({
    data: { userId: user.id, token, expiresAt },
  });

  await sendPasswordResetEmail(user.email, token);
  return { message: "Reset link sent to email" };
};

const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isVerified: true,
      interests: true,
      profilePhoto: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

module.exports = {
  signup,
  verifyEmail,
  signin,
  googleLoginService,
  resetPassworService,
  forgetPasswordService,
  getUserById
};
