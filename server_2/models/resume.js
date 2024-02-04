// /// WORKING!!!

// const mongoose = require("mongoose");

// // Define the schema
// const ResumeSchema = new mongoose.Schema({
//   fullName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   number: {
//     type: String,
//     required: true,
//   },
//   fileType: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   resume: {
//     data: Buffer, // Store the file buffer as binary data
//     contentType: String, // Store the content type of the file
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Create a model from the schema
// const Resume = mongoose.model("Resume", ResumeSchema);

// module.exports = Resume;

const mongoose = require("mongoose");

// Define the schema
const ResumeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  resume: {
    data: Buffer, // Store the file buffer as binary data
    contentType: String, // Store the content type of the file
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // New field to store the ID of the seeker collection
  seekerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seeker", // Assuming 'Seeker' is the name of your seeker collection/model
  },
});

// Create a model from the schema
const Resume = mongoose.model("Resume", ResumeSchema);

module.exports = Resume;
