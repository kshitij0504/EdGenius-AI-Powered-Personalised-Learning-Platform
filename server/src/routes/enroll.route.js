const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/enroll.controller");
const authenticate = require("../middleware/authMiddleware");

router.post("/enroll", authenticate, paymentController.enrollCourse);
router.post("/cart/add", authenticate, paymentController.addToCart);
router.post("/cart/checkout", authenticate, paymentController.checkoutCart);
router.post("/verify", authenticate, paymentController.verifyPayment);
router.get("/my-courses", authenticate, paymentController.getMyCourses);

module.exports = router;
