const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const Resume = require("../models/resume"); // Assuming your schema is defined in a separate file
const verifyToken = require("../utils/verify");
const router = express.Router();
const Job = require("../models/jobDetails");
const { Seeker } = require("../models/users");
// Define multer storage settings to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define the POST route to save the PDF file
// Posting resume feature
router.post(
  "/post-res",
  verifyToken,
  upload.single("resume"),
  async (req, res) => {
    console.log(req.user.id);
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No file was uploaded.",
          success: false,
        });
      }

      // Destructure fields from req.body
      const { fullName, email, number, description } = req.body;

      // Create a new instance of the Resume model with the uploaded data
      const resume = new Resume({
        fullName,
        email,
        number,
        fileType: req.file.mimetype,
        description,
        resume: {
          data: req.file.buffer, // Store the file buffer as binary in the database
          contentType: req.file.mimetype, // Store the file content type
        },
        createdAt: new Date(),
        seekerId: req.user.id,
      });

      // Save the resume to the database
      const newResumes = await resume.save();
      const newResume = newResumes;
      if (newResume) {
        const { fullName, email, number, description, _id } = newResume;
        console.log(_id);
        return res.status(200).json({
          fullName,
          email,
          number,
          description,
          _id,
        });
      } else {
        return res.status(500).json({
          message: "Failed to upload resume.",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  }
);
router.get("/api/job/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const { id } = req.params;
    const jobDetails = await Job.findById(id);
    const { AppliedUsers } = jobDetails;
    const seekerDetails = await Promise.all(
      AppliedUsers.map(async (id) => {
        console.log(id);
        const details = await Resume.findOne({ seekerId: id });
        const { fullName, email, number, description, _id } = details;
        // console.log(_id);
        return {
          fullName,
          email,
          number,
          description,
          _id,
        };
      })
    );
    console.log(seekerDetails);
    res.status(200).json(seekerDetails);
  } catch (error) {
    res.send({ error: error.message });
  }
});
// Define a DELETE route to delete a specific resume
// Deleting the resume based on the resume id
router.delete("/all-res/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the resume by ID and delete it
    const deletedResume = await Resume.findByIdAndDelete(id);

    if (deletedResume) {
      console.log("Resume deleted!!");
      return res.status(200).json({
        message: "Resume deleted successfully.",
        success: true,
        deletedResume: deletedResume,
      });
    } else {
      return res.status(404).json({
        message: "Resume not found.",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error deleting resume:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

module.exports = router;
