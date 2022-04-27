const authorModel = require("../models/authorModel");
const validator = require("../utils/validator");


//Creating Author documents by validating the details.
const createAuthor = async function (req, res) {
  try {
    // Request body verifying
    let requestBody = req.body;

    if (!validator.isValidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Invalid request parameter, please provide author Detaills",
        });
    }

    
    const { fname, lname, title, email, password } = requestBody;

    // Validation
    if (!validator.isValid(fname)) {
      return res
        .status(400)
        .send({ status: false, message: "First name is required" });
    }
    if (!validator.isValid(lname)) {
      return res
        .status(400)
        .send({ status: false, message: "Last name is required" });
    }
    if (!validator.isValid(title)) {
      return res
        .status(400)
        .send({ status: false, message: "Title is required" });
    }
    if (!validator.isValidTitle(title)) {
      return res
        .status(400)
        .send({
          status: false,
          message: `Title should be among Mr, Mrs and Miss`,
        });
    }
    if (!validator.isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: `Email is required` });
    }

    // email validation
    if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
      res.status(400).send({status: false,message: `Email should be a valid email address`});
      return;
    }

    if (!validator.isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: `Password is required` });
    }
    const isEmailAlredyUsed = await authorModel.findOne({ email });
    if (isEmailAlredyUsed) {
      return res
        .status(400) 
        .send({
          status: false,
          message: `${email} email address is already registered`,
        });
    }
    

    const newAuthor = await authorModel.create(requestBody);
    return res
      .status(201)
      .send({
        status: true,
        message: `Author created successfully`,
        data: newAuthor,
      });
  } catch (error) {
    res.status(500).send({ status: false, Error: error.message });
  }
};



module.exports = {
  createAuthor,
};