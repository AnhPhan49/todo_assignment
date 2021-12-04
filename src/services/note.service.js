const noteModel = require('../models/note.model')
const moment = require("moment");

module.exports = {
  addTask2DB: async function (content, id) {
    try {
      const newTask = await noteModel.create({
        content: content,
        user: id,
      });
      return newTask;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  checkUpdateTask: async function (id, user) {
    try {
      const tickTask = await noteModel.findOneAndUpdate({
        _id: id,
        user: user,
        ticked: true,
      });
      return tickTask;
    } catch (err) {
      throw new Error("Opps, something went wrong");
    }
  },

  getTaskList: async function ( user, day) {
    try {
      const queryDay = moment(day).startOf("day");
      let taskList = await noteModel.find({
        user: user,
        createdAt: {
          $gte: queryDay.toDate(),
          $lte: moment(queryDay).endOf("day").toDate(),
        },
      });
      return taskList;
    } catch (err) {
      throw new Error(err.message);
    }
  },

};
