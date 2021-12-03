const express = require("express");
const noteRoute = express.Router();
const { create, tickTask, getList } = require("../controllers/note.controller");
const checkLogin = require('../middlewares/checkLogin.middleware')
const addTaskValidator = require('./validators/addTask.validator')

noteRoute.route("/create").post(checkLogin, addTaskValidator, create);

noteRoute.route("/task/tick/:id").put(checkLogin, tickTask);

noteRoute.route("/tasks").get(checkLogin, getList);

module.exports = noteRoute;
