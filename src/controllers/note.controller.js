const noteModel = require("../models/note.model")
const { addTask2DB } = require('../services/note.service')
const moment = require("moment")

async function checkLimitTask (id) {
  try {
    const today = moment().startOf("day");
    let countTask = await noteModel.count({
      user: id,
      createdAt: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate(),
      },
    });
    // console.log(countTask, moment("2021-12-03").endOf("day").toDate());
    if (countTask >= 5) throw new Error("Limit task can add in day");
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getTaskList ( user, day) {
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
}

// async function addTask (content, id) {
//   try {
//     await noteModel.create({
//       content: content,
//       user: id
//     })
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }

async function checkTaskExist (id, user) {
  try {
    await noteModel.findOneAndUpdate({
      _id: id,
      user: user,
      ticked: true,
    });
  } catch (err) {
    throw new Error("Opps, something went wrong");
  }
}

module.exports.create = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;
    await checkLimitTask(userId);
    await addTask2DB(content, userId);
    return res.status(200).json({ message: "Successful"});
  } catch (err) {
    return res.status(400).json({ message: err.message});
  }
}

module.exports.tickTask = async (req, res) => {
  try {
    const { id } = req.params
    const user = req.user.id
    if(!id) throw new Error("Missing id");
    await checkTaskExist(id, user);
    return res.status(200).json({ message: "Successful"})
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
} 

module.exports.getList = async (req, res) => {
  try {
    let { day } = req.query;
    const user = req.user.id
    const data = await getTaskList(user, day);
    return res.status(200).json({ message: "Successful", data: data})
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}