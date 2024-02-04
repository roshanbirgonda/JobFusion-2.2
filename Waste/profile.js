const express = require("express");
const router = express.Router();
const verifyToken = require("../server_2/utils/verify");
const Profile = require("../server_2/models/profile");

router.post("/", verifyToken, async (req, res) => {
  const profile = req.body;
  const newProfile = new Profile(profile);
  const saved = await newProfile.save();
  res.send(saved);
});
router.get("/", verifyToken, async (req, res) => {
  try {
    // Fetch all profiles from the database
    const profiles = await Profile.find();
    res.json(profiles); // Send the profiles as a JSON response
  } catch (err) {
    console.error("Error fetching profiles:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
