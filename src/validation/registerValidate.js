const { check } = require("express-validator");
const { registerModel } = require("../model");
const moment = require("moment");
const signUpValidationRule = () => {
  return [
    check("name")
      .trim()
      .notEmpty()
      .withMessage("name is required")
      .matches(/^[a-zA-Z ]*$/)
      .withMessage("Only Characters with white space are allowed"),
    check("email")
      .notEmpty()
      .withMessage("email is required")
      .normalizeEmail()
      .isEmail()
      .withMessage("must be a valid email")
      .custom(async (value) => {
        const data = await registerModel.findOne({ email: value });
        if (data) {
          return Promise.reject("Email is already exist");
        }
      }),
    check("dob").notEmpty().withMessage("dob is required"),
    check("phone").notEmpty().withMessage("phone is required"),
  ];
};

const signUpValidation = signUpValidationRule();
module.exports = { signUpValidation };
