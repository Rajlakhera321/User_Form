const { paginationData } = require("../helper/pagination");
const { registerModel } = require("../model");
const Handlebars = require("handlebars")
const {emailHelper, pagination} = require("../helper");
const fs = require("fs");

const userRegister = async (req, res) => {
  try {
    const { name, email, phone, dob } = req.body;
    const data = await registerModel.find({ email: email });
    await registerModel.create({
      name,
      email,
      phone,
      dob,
    });
    const htmlRequest = await fs.readFileSync(
      `${__dirname}/../emailTemplate/register.html`,
      "utf8"
    );
    const template = Handlebars.compile(htmlRequest);
    const replacements = {
      name: name,
      email: email,
    };
    const htmlToSend = template(replacements);
    const options = {
      from: process.env.USER_NAME,
      to: email,
      subject: "Thank you for registering in our site",
      html: htmlToSend,
    };
    await emailHelper.sendMail(options);
    return res.status(201).json({ message: "Register successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDetails = async (req, res) => {
  try {
    const { offset, limits } = pagination.paginationData(req.query.pageLimit, req.query.pageNumber);
    const data = await registerModel.find().sort({createdAt: -1}).limit(limits).skip(offset);
    return res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  userRegister,
  getDetails,
};
