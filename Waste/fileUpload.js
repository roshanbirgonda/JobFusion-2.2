// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const File = require("../models/seekerProfile");
// const fs = require("fs");
// const path = require("path");
// const Resume = require("../models/fileUpload");
// // Middlewares
// const verifyToken = require("../utils/verify");

// // Creating upload directory to store pdfs
// const uploadDir = path.join(__dirname, "..", "uploads");

// // Create the 'uploads' directory if it doesn't exist
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // specify the directory where files will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // generate unique filename
//   },
// });
// const upload = multer({ storage: storage });

// // const upload = multer({ storage: storage });

// // // MongoDB schema and model
// // // const fileSchema = new mongoose.Schema({
// // //   email: String,
// // //   filename: String,
// // //   contentType: String,
// // //   size: Number,
// // //   path: String,
// // //   createdAt: { type: Date, default: Date.now },
// // // });

// // // const File = mongoose.model("File", fileSchema);

// // // Seeker can upload a resume based on his email. If already uploaded throws an error.
// // // router.post("/upload", verifyToken, upload.single("pdf"), async (req, res) => {
// // //   try {
// // //     console.log("File uploading");
// // //     const { email } = req.user;
// // //     const exists = await File.findOne({ email });
// // //     // Save file metadata to MongoDB
// // //     if (exists) {
// // //       return console.log("Resume already uploaded!!");
// // //     } else {
// // //       const newFile = new File({
// // //         email: email,
// // //         filename: req.file.filename,
// // //         contentType: req.file.mimetype,
// // //         size: req.file.size,
// // //         path: req.file.path,
// // //       });
// // //       await newFile.save();

// // //       res.send("File uploaded successfully");
// // //     }
// // //   } catch (error) {
// // //     console.log({ error: error.message });
// // //     res.status(500).send("Error uploading file");
// // //   }
// // // });
// // router.post(
// //   "/post-res",
// //   verifyToken,
// //   upload.single("pdf"),
// //   async (req, res) => {
// //     try {
// //       console.log("File uploading");
// //       return res.send("Completed");

// //       // Check if a file already exists for the user
// //       const existingFile = await File.findOne({ email });

// //       if (existingFile) {
// //         const absolutePath = path.resolve(__dirname, "..", req.file.path);
// //         console.log(absolutePath);
// //         fs.unlinkSync(absolutePath);
// //         console.log("Resume already uploaded!!");
// //         return res.status(400).send("Resume already uploaded");
// //       }

// //       // Save file metadata to MongoDB
// //       const newFile = new File({
// //         email: email,
// //         filename: req.file.filename,
// //         contentType: req.file.mimetype,
// //         size: req.file.size,
// //         path: req.file.path,
// //       });
// //       await newFile.save();

// //       res.send({ path: req.file.path });
// //     } catch (error) {
// //       console.log({ error: error.message });
// //       res.status(500).send("Error uploading file");
// //     }
// //   }
// // );

// // // Can view the based on the email passed in the query
// // router.get("/view-pdf", async (req, res) => {
// //   try {
// //     const { email } = req.query;

// //     // Find the file by email
// //     const file = await File.findOne({ email });

// //     if (!file) {
// //       return res.status(404).json({ message: "File not found" });
// //     }
// //     const absolutePath = path.resolve(__dirname, "..", file.path);
// //     // Send the file as a response
// //     res.sendFile(absolutePath);
// //   } catch (error) {
// //     console.error("Error retrieving PDF:", error);
// //     res.status(500).send(error.message);
// //   }
// // });

// // // Deleting based on email passed in query of url

// // router.delete("/delete-pdf", async (req, res) => {
// //   try {
// //     const { email } = req.query;

// //     // Find the file by email
// //     const file = await File.findOne({ email });

// //     if (!file) {
// //       return res.status(404).json({ message: "File not found" });
// //     }

// //     // Delete the file from the filesystem
// //     const absolutePath = path.resolve(__dirname, "..", file.path);
// //     fs.unlinkSync(absolutePath);

// //     // Delete the file record from the database
// //     await File.findOneAndDelete({ email });

// //     res.json({ message: "File deleted successfully" });
// //   } catch (error) {
// //     console.error("Error deleting PDF:", error);
// //     res.status(500).send(error.message);
// //   }
// // });
// // module.exports = router;
