const noteModel = require('../models/note.model')

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
};
