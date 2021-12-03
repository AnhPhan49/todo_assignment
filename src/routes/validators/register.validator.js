const { check } = require("express-validator");

module.exports = [
  check("user")
    .exists()
    .withMessage("Please provide username")
    .notEmpty()
    .withMessage("Please do not leave the username blank"),

  check("password")
    .exists()
    .withMessage("Please provide password")
    .notEmpty()
    .withMessage("Please do not leave the password blank")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  check("password")
    .exists()
    .withMessage("Please provide re-password")
    .notEmpty()
    .withMessage("Please do not leave the re-password blank")
    .isLength({ min: 6 })
    .withMessage("Re-password must be at least 6 characters"),
];
