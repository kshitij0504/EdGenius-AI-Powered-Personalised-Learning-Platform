const Razorpay = require('razorpay');
const crypto = require('crypto');
const { ApiError } = require('../utils/ApiError');
const prisma = require('../config/prisma');

console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID ? "Set" : "Not set");
console.log("Razorpay Secret:", process.env.RAZORPAY_KEY_SECRET ? "Set" : "Not set");

// Add debugging to see actual values
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY_SECRET present:", !!process.env.RAZORPAY_KEY_SECRET);

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET, // ✅ Fixed variable name
});

const enrollCourse = async (userId, courseId, res) => {
  try {
    console.log("Enroll request for user:", userId, "course:", courseId);
    
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw new ApiError(404, 'Course not found');

    const existing = await prisma.enrollment.findFirst({ where: { userId, courseId } });
    if (existing) throw new ApiError(400, 'Already enrolled');

    if (course.price === 0) {
      await prisma.enrollment.create({ data: { userId, courseId } });
      return { message: 'Successfully enrolled in free course' };
    }

    console.log("Creating Razorpay order for paid course:", course.price);
    
    // Fix: Create shorter receipt (under 40 characters)
    const shortCourseId = courseId.replace('course-', '').substring(0, 10);
    const shortUserId = userId.substring(0, 8);
    const receipt = `rcpt_${shortCourseId}_${shortUserId}`;
    
    console.log("Receipt:", receipt, "Length:", receipt.length);
    
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: Math.round(course.price * 100),
      currency: 'INR',
      receipt: receipt, // ✅ Now under 40 characters
    });

    console.log("Razorpay order created:", razorpayOrder);
    
    const amountInPaise = Math.round(course.price * 100);
    
    await prisma.payment.create({
      data: {
        userId,
        courseId,
        razorpayOrderId: razorpayOrder.id,
        amount: amountInPaise,
      },
    });

    return {
      message: 'Payment required',
      razorpayOrderId: razorpayOrder.id,
      courseTitle: course.title,
      amount: amountInPaise,
    };
    
  } catch (error) {
    console.error("Enrollment error:", error);
    throw error;
  }
};



const addToCart = async (userId, courseId) => {
  const existing = await prisma.cartItem.findUnique({
    where: { userId_courseId: { userId, courseId } },
  });
  if (existing) throw new ApiError(400, 'Course already in cart');

  await prisma.cartItem.create({ data: { userId, courseId } });
  return { message: 'Course added to cart' };
};

const checkoutCart = async (userId, res) => {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { course: true },
  });

  if (!cartItems.length) throw new ApiError(400, 'Cart is empty');

  const total = cartItems.reduce((sum, item) => sum + item.course.price, 0);

  const razorpayOrder = await razorpayInstance.orders.create({
    amount: Math.round(total * 100),
    currency: 'INR',
    receipt: `cart_${userId}_${Date.now()}`,
  });

  for (const item of cartItems) {
    await prisma.payment.create({
      data: {
        userId,
        courseId: item.courseId,
        razorpayOrderId: razorpayOrder.id,
        amount: item.course.price * 100,
      },
    });
  }

  return {
    message: 'Cart checkout initiated',
    razorpayOrderId: razorpayOrder.id,
    amount: total * 100,
  };
};

const verifyPayment = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');

  if (generatedSignature !== razorpaySignature) {
    return res.status(400).json({ success: false, message: 'Invalid signature' });
  }

  await prisma.payment.updateMany({
    where: { razorpayOrderId },
    data: { status: 'SUCCESS', razorpayPaymentId },
  });

  const payments = await prisma.payment.findMany({ where: { razorpayOrderId } });
  for (const p of payments) {
    await prisma.enrollment.create({
      data: {
        userId: p.userId,
        courseId: p.courseId,
        paymentId: p.razorpayPaymentId,
      },
    });

    await prisma.cartItem.deleteMany({
      where: { userId: p.userId, courseId: p.courseId },
    });
  }

  res.json({ success: true, message: 'Payment verified and enrolled' });
};

const getMyCourses = async (req, res) => {
  const userId = req.user.id;
  const courses = await prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: true,
    },
  });
  res.status(200).json(courses.map((e) => e.course));
};

module.exports = {
  enrollCourse,
  addToCart,
  checkoutCart,
  verifyPayment,
  getMyCourses,
};