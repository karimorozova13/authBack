const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const sendOTP = require("./sendOTP");
const verifyOTP = require("./verifyOTP");
const loginSendOTP = require("./loginSendOTP");
const loginVerifyOTP = require("./loginVerifyOTP");

module.exports = {
  register,
  login,
  logout,
  current,
  verifyOTP,
  sendOTP,
  loginSendOTP,
  loginVerifyOTP,
};
