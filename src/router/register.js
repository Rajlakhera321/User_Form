const express = require("express");
const router = express.Router();
const { registerController } = require("../controller");
const { registerValidation, valid } = require("../validation");

router.post(
  "/",
  registerValidation.signUpValidation,
  valid.validate,
  registerController.userRegister
);

router.get("/details", registerController.getDetails);

module.exports = router;
