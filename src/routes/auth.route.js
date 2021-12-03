const express = require("express");
const authRoute = express.Router();
const { register, login } = require("../controllers/auth.controller");
const resgisterValidator = require("./validators/register.validator")
const loginValidator = require('./validators/login.validator')

authRoute.route("/register").post(resgisterValidator, register);

authRoute.route("/login").post(loginValidator, login);

module.exports = authRoute;