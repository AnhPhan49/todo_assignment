require("dotenv").config()
const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function validateExistAccount(user) {
  try {
    let account = await userModel.findOne({user: user});
    if(account) 
      return true;
    return false;
  } catch (err) {
    throw new Error (err.message);
  }
}

async function createAccount(user, password, repassword) {
  try {
    if(password !== repassword) throw new Error ("Repassword not match");
    const hashPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      user:user,
      password: hashPassword
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

async function passwordCompare(user, password) {
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

module.exports.register = async (req, res) => {
  try {
    let result = validationResult(req);
    if (result.errors.length !== 0) {                               //validator   
      let messages = result.mapped();
      let message = "";

      for (m in messages) {
        message = messages[m].msg;
        break;
      }
      throw new Error(message);
    }
    let { user, password, repassword } = req.body;
    let checkExist = await validateExistAccount(user);              // check exist account
    if (checkExist) throw new Error("Account already exist")
    await createAccount(user, password, repassword);                //write new data to database
    return res.status(200).json({message: "Successful"})
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports.login = async(req, res) => {
  try {
    let result = validationResult(req);
    if (result.errors.length !== 0) {                               //validator   
      let messages = result.mapped();
      let message = "";
      for (m in messages) {
        message = messages[m].msg;
        break;
      }
      throw new Error(message);
    }
    let { user, password } = req.body;
    let checkExist = await validateExistAccount(user);             // check exist account
    if (!checkExist) {
      throw new Error("Wrong phone or password");
    }

    let idAcount = await passwordCompare(user, password);          // check match password
    const { JWT_SECRET } = process.env;                            
    jwt.sign(                                                      // create JWT
      {
        id: idAcount,                                              // hash ID account in token
      },
      JWT_SECRET,
      {
        expiresIn: "7h",                                           // time exprires
      },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({
          message: "Login success",
          data: token,
        });
      }
    );
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}
