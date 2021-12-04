const userModel = require('../models/user.model');
const bcrypt = require("bcrypt");

module.exports = {
  validateExistAccount: async function (user) {
    try {
      let account = await userModel.findOne({user: user});
      if(account) 
        return true;
      return false;
    } catch (err) {
      throw new Error (err.message);
    }
  },

  createAccount: async function createAccount(user, password) {
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await userModel.create({
        user:user,
        password: hashPassword
      });
      return newUser;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  passwordCompare: async function (user, password) {
    try {
      const account = await userModel.findOne({user: user});
      let passwordMatch = await bcrypt.compare(password, account.password);
      if (!passwordMatch) {
        throw new Error( "Wrong email or password");
      }
      return account._id
    } catch (err) {
      throw new Error(err.message);
    }
  }
}