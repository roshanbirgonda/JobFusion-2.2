const express = require("express");
const router = express.Router();
const { Seeker, Recruiter, validate } = require("../models/users");
const bcrypt = require("bcrypt");

// Register
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      console.error("Validation Error:", error);
      return res.status(400).send({ message: error.details[0].message });
    }

    const { email, password, role } = req.body;

    const userModel = role === "seeker" ? Seeker : Recruiter;
    isSeeker = await Seeker.findOne({ email });
    isRecruiter = await Recruiter.findOne({ email });

    if (isSeeker || isRecruiter) {
      return res.status(409).send("Email already exists!!");
    }

    // const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, 10);

    const userToSave = new userModel({ ...req.body, password: hashPassword });

    userToSave.save();
    console.log("Registered!!!");
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
