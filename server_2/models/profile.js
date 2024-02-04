const mongoose = require("mongoose");

const personalInfoSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  currentEmploymentStatus: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  socialNetworks: {
    linkedin: String,
    twitter: String,
    github: String,
  },
  hobbies: {
    type: [String],
  },
  languagesKnown: {
    type: [String],
  },
  educationQualification: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
  },
  githubProjects: {
    type: [String],
  },
});

const PersonalInfo = mongoose.model("PersonalInfo", personalInfoSchema);

module.exports = PersonalInfo;
