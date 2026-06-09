const userModel = require("../models/user.model");
const emailService = require("../services/email.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const tokenBlacklistModel = require("../models/blacklist.model");
const accountModel = require("../models/account.model");

/**
 * - user register controller
 * - POST /api/auth/register
 **/

async function userRegisterController(req, res) {
  const { email, password, name } = req.body;

  const isExists = await userModel.findOne({
    email: email,
  });

  if (isExists) {
    return res.status(422).json({
      message: "User already exists with this email!!",
      status: "Failed!!",
    });
  }

  const user = await userModel.create({
    email,
    password,
    name,
  });

  await accountModel.create({
    user: user._id,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);
  res.status(201).json({
    user: {
      _id: user.id,
      email: user.email,
      name: user.name,
    },
    token,
  });

  await emailService.sendRegistrationEmail(user.email, user.name);
}

/**
 * - User login Controller
 * - POST /api/auth/login
 */

async function userLoginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Email or Password is INVALID!!",
    });
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "Email or Password is INVALID!!",
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);
  res.status(200).json({
    user: {
      _id: user.id,
      email: user.email,
      name: user.name,
    },
    token,
  });
}

/**
 * - User logout Controller
 * - POST /api/auth/logout
 */
async function userLogoutController(req, res) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({
      message: "User logged out successfully!!",
    });
  }

  res.cookie("token", "");
  res.clearCookie("token");

  await tokenBlacklistModel.create({
    token: token,
  });

  res.status(200).json({
    message: "User logout Successfully!!",
  });
}

module.exports = {
  userRegisterController,
  userLoginController,
  userLogoutController,
};
