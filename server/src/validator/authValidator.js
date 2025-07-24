const { body } = require("express-validator");

const signupValidator = [
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("interests").isArray(),
  body("interests.*").isString(),
];

module.exports = { signupValidator };