const router = require("express").Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Seeker, Recruiter } = require("../models/users");

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

//Login
router.post("/", async (req, res) => {
  try {
    console.log("Trying to login!!!");
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.message });

    const { email, password } = req.body;

    console.log("Searching for email: ", email);

    const seekerData = await Seeker.findOne({ email });
    const recruiterData = await Recruiter.findOne({ email });

    const user = seekerData || recruiterData;
    // console.log(user);
    // console.log("From recruiter sside!!");
    // console.log(recruiterData);
    //  const role = recruiterData ? recruiterData.role : seekerData.role;

    if (!user) {
      return res.status(401).send({ message: "Invalid Email" });
    }
    // console.log("After finding email.")

    // Make sure that the retrieved seekerData is an instance of the Seeker model
    // const seeker = seekerData ? new Seeker(seekerData) : null;
    // const recruiter = recruiterData ? new Recruiter(recruiterData) : null;

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();

    res.status(200).json({
      token: token,
      role: user.role,
      email: user.email,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
