const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validate = require("../middleware/validate");
const { signupValidator } = require("../validator/authValidator");
const authenticate = require("../middleware/authMiddleware");

router.post("/signup", signupValidator, validate, authController.signup);
router.get("/verify-email/:token", authController.verifyEmail);
router.post("/signin", authController.signin);
// router.get("/protected", authenticate, (req, res) => {
//   res.status(200).json({
//     message: "You have accessed a protected route",
//     user: req.user,
//   });
// });
router.post("/signout",authController.logout)
router.post("/google-signin", authController.googleSignin);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;