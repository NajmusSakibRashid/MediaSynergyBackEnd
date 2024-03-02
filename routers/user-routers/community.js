const express = require("express");
const router = express.Router();

// Define your routes here
const Community = require("../../models/Community");
const Post = require("../../models/Community-Post");
const communityPostRouter = require("../community-post");

router.use("/post", communityPostRouter);
// Route to fetch all communities of this user
router.get("/my_communities", async (req, res) => {
  try {
    console.log(req.user.id);
    const communities = await Community.find({
      users: req.user.id, // User is a member of the community
      admin: { $ne: req.user.id }, // User is not the admin of the community
    });
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

router.get("/suggest", async (req, res) => {
  try {
    console.log(req.user.id);
    const communities = await Community.find({ users: { $nin: [req.user.id] } });
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
      image: req.body.image,
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

router.delete("/:id", async (req, res) => {
  console.log("deleting community");
  try {
    const deletedCommunity = await Community.findOneAndDelete({
      _id: req.params.id,
      admin: req.user.id,
    });
    res.json(deletedCommunity);
  } catch {
    res.json({ message: "Error" });
  }
});

// will not use this one
router.post("/createPost/:communityId", async (req, res) => {
  console.log("creating post");
  console.log(req.body);
  console.log(req.user);
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
      community: req.params.communityId,
      comments: [],
      likes: 0,
      date: new Date(),
    });

    // res.json(newPost, "\neije banay dilam new post");
    // res.send("new post created");
    res.json(newPost);
    // console.log("new post created \n", newPost);
  } catch (err) {
    console.log(err);

    res.json({ message: "Error" });
  }
});

module.exports = router;
