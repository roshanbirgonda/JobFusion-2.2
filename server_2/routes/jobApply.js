const express = require("express");
const verifyToken = require("../utils/verify");
const { Seeker } = require("../models/users");
const Job = require("../models/jobDetails");
const Resume = require("../models/resume");
const router = express.Router();

router.post("/apply-job/:id", verifyToken, async (req, res) => {
  try {
    //console.log(req.params.id);
    const jobId = req.params.id;
    const { id, email } = req.user;
    console.log(email);
    const seeker = await Seeker.findOne({ email });
    const job = await Job.findById(jobId);
    seeker.jobsApplied.push(jobId);
    job.AppliedUsers.push(id);
    const temp = await seeker.save();
    const jodSaved = await job.save();
    res.json({ jodSaved });
  } catch (error) {
    res.send(error.message);
  }
});
router.get("/applied-users/:id", (req, res) => {
  console.log("searching for applied users");
});

module.exports = router;
