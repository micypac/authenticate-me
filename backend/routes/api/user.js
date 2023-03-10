const express = require("express");
const router = express.Router();
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

// signup route specific middleware to check for mandatory keys and values in request body using express-validator
const validateSignUp = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// user signup route
router.post("/", validateSignUp, async (req, res, next) => {
  const { email, username, password } = req.body;

  const user = await User.signup({ email, username, password });

  await setTokenCookie(res, user);

  return res.json({
    user,
  });
});

module.exports = router;
