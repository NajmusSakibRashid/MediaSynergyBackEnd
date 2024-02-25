const express = require("express");

const router = express.Router();

const Profile = require("../../models/Profile");
console.log("Profile debug");

router.get("/", async (req, res) => {
    try {
        const profiles = await Profile.find({ user: req.user.id });
        console.log("in profile router");
        res.json(profiles);
        console.log("profiles", profiles);
    } catch {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;