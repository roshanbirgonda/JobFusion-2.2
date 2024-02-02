const Joi = require("joi");

const jobValidationSchema = Joi.object({
  JobTitle: Joi.string().required(),
  companyName: Joi.string().required(),
  minPrice: Joi.number().required(),
  maxPrice: Joi.number().required(),
  salaryType: Joi.string().required(),
  jobLocation: Joi.string().required(),
  postingDate: Joi.date().default(new Date()),
  companyLogo: Joi.string().uri().required(),
  experienceLevel: Joi.string().required(),
  skills: Joi.array().items(Joi.string()).required(),
  employmentType: Joi.string().required(),
  description: Joi.string().required(),
  postedBy: Joi.string().email().required(),
});

module.exports = jobValidationSchema;
