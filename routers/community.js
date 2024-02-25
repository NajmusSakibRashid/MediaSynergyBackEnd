const express = require("express");

const router = express.Router();

const Community = require("../models/Community");
console.log("Community debug");
// Route to fetch all communities
router.get("/", async (req, res) => {
  // print("communities");
  console.log("console hi");
  try {
    // res.json({ message: " response hi" });
    const communities = await Community.find(); // Fetch all communities
    res.json(communities); // Send communities as a response
    // res.send('hellooooo from response')
    // console.log("communities", communities);
  } catch (error) {
    console.error("Error fetching communities:", error); // Log error to console
    res.status(500).json({ message: error.message }); // Send error response
  }
  // res.send(dummyCommunities);

  // res.json(dummyCommunities);
});

router.get("/abc", (req, res) => {
  res.send("Hello World");
});

module.exports = router;