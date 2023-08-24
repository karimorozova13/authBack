const { basedir } = global;

const { catchError } = require(`${basedir}/utils/helpers`);
const { auth } = require(`${basedir}/middlewares`);
const authCtrl = require(`${basedir}/controllers/auth`);

const express = require("express");
const router = express.Router();

// signup
router.post("/register", catchError(authCtrl.register));
router.post("/sendOTP", authCtrl.sendOTP);
router.post("/verifyOTP", authCtrl.verifyOTP);

// signin
router.post("/login", catchError(authCtrl.login));
router.post("/loginSendOTP", authCtrl.loginSendOTP);
router.post("/loginVerifyOTP", authCtrl.loginVerifyOTP);

// logout
router.get("/logout", auth, authCtrl.logout);

// current
router.get("/current", auth, authCtrl.current);

module.exports = router;
