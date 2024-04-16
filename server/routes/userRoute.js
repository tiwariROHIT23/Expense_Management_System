const express = require("express");
const {
  loginController,
  registerController,
  sendotp,
  verifyOtp,
  changePassword
} = require("../controllers/userController");

//router object
const router = express.Router();

//routers
// POST || LOGIN USER
router.post("/login", loginController);

//POST || REGISTER USER
router.post("/register", registerController);

router.post("/sendotp", sendotp)

router.post("/verifyotp", verifyOtp)

router.post("/changepassword",changePassword);



module.exports = router;
