const express = require("express");

const router = express.Router();

const Community = require("../models/Community");
const Post = require("../models/Community-Post");
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

router.get("/post/:id", async (req, res) => {
  console.log("fetching post by id");
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.json(post);
    // console.log(post);
  } catch {
    res.json({ message: "Error" });
  }
});

router.get("/allPosts/:communityId", async (req, res) => {
  console.log("fetching all posts");
  try {
const posts = await Post.find({ community: req.params.communityId }).sort({ createdAt: 1 });
    res.json(posts);
    // res.send("posts,, all posts");
    // console.log(posts);
  } catch {
    res.json({ message: "Error" });
  }
});

router.post("/post/like/:id", async (req, res) => {
  try {
    // Find the post by ID and increment its likes field by 1
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { likes: 1 } }, // Increment the likes field by 1
      { new: true } // Return the updated document
    );

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/join/:communityId/:userId", async (req, res) => {
  console.log("joining community");
  console.log(req.params);
  try {
    const community = await Community.findOneAndUpdate(
      { _id: req.params.communityId },
      { $push: { users: req.params.userId } },
      { new: true }
    );
    console.log("community joined \n", community);
    res.json(community);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
});

router.post("/leave/:communityId/:userId", async (req, res) => {
  console.log("leaving community");
  console.log(req.params);
  try {
    const community = await Community.findOneAndUpdate(
      { _id: req.params.communityId },
      { $pull: { users: req.params.userId } },
      { new: true }
    );
    console.log("community left \n", community);
    res.json(community);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
  // res.send("leave community");
});

router.delete("/delete/:communityId"), async (req, res) => {
  console.log("deleting community");
  try {
    const community = await Community.findOneAndDelete({ _id: req.params.communityId });
    res.json(community);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
}


// router.get("/")
module.exports = router;
