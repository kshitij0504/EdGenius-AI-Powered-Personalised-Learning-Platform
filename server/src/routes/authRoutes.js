const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validate = require("../middleware/validate");
const { signupValidator } = require("../validator/authValidator");
const authenticate = require("../middleware/authMiddleware");
const jwt = require('jsonwebtoken');

function isValidToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}
router.post("/signup", signupValidator, validate, authController.signup);
router.get("/verify-email/:token", authController.verifyEmail);
router.post("/signin", authController.signin);
router.post("/signout",authController.logout)
router.post("/google-signin", authController.googleSignin);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.get("/user", authenticate, authController.userData);
router.get('/status', (req, res) => {
  const token = req.cookies.token; // Read the HttpOnly cookie
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      authenticated: false, 
      message: 'No token found' 
    });
  }

  const payload = isValidToken(token);
  
  if (payload) {
    res.json({ 
      success: true,
      authenticated: true, 
      role: payload.role, 
      user: {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role
      }
    });
  } else {
    res.status(401).json({ 
      success: false,
      authenticated: false, 
      message: 'Invalid token' 
    });
  }
});

module.exports = router;