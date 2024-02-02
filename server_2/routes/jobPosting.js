const express = require("express");
const router = express.Router();
const Job = require("../models/jobDetails");
const jobValidationSchema = require("../utils/validation");
const { Recruiter } = require("../models/users");
const verifyToken = require("../utils/verify");

// Posting a job
router.post("/post-job", verifyToken, async (req, res) => {
  try {
    // Validate the request body
    //  return console.log(req.user);

    const { id } = req.user;

    const { error } = jobValidationSchema.validate(req.body);
    if (error) {
      console.log({ message: error.details[0].message });
      return res.status(400).json({ message: error.details[0].message });
    }
    //res.send(req.user);
    req.body.RecruiterId = id;
    // Create a new job posting
    const job = new Job(req.body);
    const savedJob = await job.save();

    res.status(201).json({ acknowledged: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Importing all jobs
router.get("/all-jobs", async (req, res) => {
  try {
    console.log("Searching for jobs!!");
    const jobs = await Job.find({});
    res.send(jobs);
  } catch (error) {
    console.log(error.message);
  }
});

// Importing all jobs by id
// router.get("/all-jobs/:id", async (req, res) => {
//   const id = req.params.id;
//   const job = await Job.findById(id);
//   res.send(job);
// });

// Importing jobs by email Recruiter side
router.get("/myJobs/:email", verifyToken, async (req, res) => {
  console.log(req.params.email);
  const jobs = await Job.find({ postedBy: req.params.email });
  // console.log(jobs);
  res.send(jobs);
});

router.get("/jobs", verifyToken, async (req, res) => {
  //console.log(req.params.email);
  const email = req.user.email;
  // console.log(email);
  const jobs = await Job.find({ postedBy: email });
  //console.log(jobs);
  res.send(jobs);
});

router.get("/check", verifyToken, (req, res) => {
  res.send(req.user);
});

// Deleting a job using job id

router.delete("/job/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Job.deleteOne({ _id: id });
    res.send(result);
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).send({
      message: error.message,
      status: false,
    });
  }
});

// Editing  a job

router.patch("/edit-job/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  const jobData = req.body;

  try {
    const updatedJob = await Job.findOneAndUpdate({ _id: id }, jobData, {
      new: true,
    });

    res.send(updatedJob); // Send the updated job back to the client
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).send({
      message: error.message,
      status: false,
    });
  }
});

// router.patch("/edit-job/:id", verifyToken, async (req, res) => {
//   const id = req.params.id;
//   const jobData = req.body;
//   // const filter = { _id: new ObjectId(id) };
//   // const options = { upsert: true };
//   // const updateDoc = {
//   //   $set: {
//   //     ...jobData,
//   //   },
//   // };

//   const result = await jobsCollections.updateOne(filter, updateDoc, options);
//   res.send(result);
// });

// router.get("/jobs", verifyToken, async (req, res) => {
//   const { email, id } = req.user;
//   const Jobs = await Job.find({ RecruiterId: id });
//   res.json(Jobs);
// });
module.exports = router;
