const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const verifyToken = require("../utils/verify");
const { number } = require("joi");
// const uploadDir = path.join(__dirname, "uploads");
const uploadDir = path.join(__dirname, "..", "uploads");

const fileSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  mobileNumber: Number,
  description: String,
  filename: String,
  contentType: String,
  size: Number,
  path: String,
  createdAt: { type: Date, default: Date.now },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
