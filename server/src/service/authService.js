const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { sendVerificationEmail } = require("../utils/sendEmail");
const {
  generateEmailVerificationToken,
  verifyEmailVerificationToken,
  generateSiginToken,
} = require("../utils/tokenUtils");

const signup = async (email, password, interests) => {
  console.log("Signup Service:", { email, interests });

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
    where: { token },
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

const signin = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.isVerified) {
    throw new ApiError(403, "Email not verified");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid password");
  }

  if(!user.isVerified) {
    throw new ApiError(403, "Email not verified");
  }

  const token = generateSiginToken(user);

  const userData = {
    id: user.id,
    email: user.email,
    isVerified: user.isVerified,
    interests: user.interests,
    role: user.role,
  };

  return {
    token,
    response: new ApiResponse(200, { user: userData }, "Login successful"),
  };
}

module.exports = { signup, verifyEmail, signin };
