const express = require("express");
const router = express.Router();

// Define your routes here
const Community = require("../../models/Community");

// Route to fetch all communities of this user
router.get("/my_communities", async (req, res) => {
  try {
    console.log(req.user.id);
    const communities = await Community.find({ users: req.user.id }); // Fetch all communities
    console.log(req.user.id);
    res.json(communities);
    // res.send('heheeeee',req.user.id);
    // res.send("hehee");
    // console.log("communities of this user: \n", communities);
  } catch {
    res.json({ message: "Error" });
  }
});

router.get("/managed_by_me", async (req, res) => {
  try {
    console.log(req.user.id);
    const communities = await Community.find({ admin: req.user.id }); // Fetch all communities
    console.log(req.user.id);
    res.json(communities);
    // res.send('heheeeee',req.user.id);
    // res.send("hehee");
    // console.log("communities of this user: \n", communities);
  } catch {
    res.json({ message: "Error" });
  }
});

router.get("/:id", async (req, res) => {
  console.log("fetching community by id");
  try {
    const community = await Community.findOne({ _id: req.params.id });
    res.json(community);
    console.log(community);
  } catch {
    res.json({ message: "Error" });
  }
});

router.post("/", async (req, res) => {
  console.log("creating community");
  console.log(req.body);
  try {
    const newCommunity = await Community.create({
      name: req.body.name,
      tagline: req.body.tagline,
      admin: req.user.id,
      posts: [],
      users: [req.user.id],
    });
    console.log("new community created \n", newCommunity);
    res.json(newCommunity);
  } catch (err) {
    console.log(err);
    res.json({ message: "Error" });
  }
});

module.exports = router;
