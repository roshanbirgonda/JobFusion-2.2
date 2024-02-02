const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

//routers
const registerRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const postJobRouter = require("./routes/jobPosting");

// Middlewares
app.use(cors());
app.use(express.json());

// Mongodb Connection
mongoose.connect("mongodb://localhost:27017/temporary");
const db = mongoose.connection;
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
db.once("open", () => {
  console.log("Connected to MongoDB successfully!");
});

// Using the routers
app.use("/api/users", registerRouter);
app.use("/api/auth", loginRouter);
app.use("/", postJobRouter);

// Setting up the server!!
app.listen(5000, () => {
  console.log("Listening to the server on port 5000");
});
