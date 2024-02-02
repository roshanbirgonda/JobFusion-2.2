const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  JobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  salaryType: { type: String, required: true },
  jobLocation: { type: String, required: true },
  postingDate: { type: Date, required: true, default: Date.now() },
  companyLogo: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  skills: [{ type: String, required: true }],
  employmentType: { type: String, required: true },
  description: { type: String, required: true },
  postedBy: { type: String, required: true },
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "recruiters" },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
