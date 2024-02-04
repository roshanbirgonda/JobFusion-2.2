const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const recruiterSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});
const seekerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },

  jobsApplied: [{ type: mongoose.Schema.Types.ObjectId, ref: "seekers" }],
});

seekerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ email: this.email, id: this._id }, "impossible", {
    expiresIn: "7d",
  });
  return token;
};
recruiterSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ email: this.email, id: this._id }, "impossible", {
    expiresIn: "7d",
  });
  return token;
};

// Define distinct collections for Seekers and Recruiters
const Seeker = mongoose.model("seeker", seekerSchema);
const Recruiter = mongoose.model("recruiter", recruiterSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: passwordComplexity().required(),
    role: Joi.string().valid("seeker", "recruiter"),
  });
  return schema.validate(data);
};

module.exports = { Seeker, Recruiter, validate };
