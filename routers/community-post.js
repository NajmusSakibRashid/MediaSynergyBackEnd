const express = require("express");

const router = express.Router();
const Post = require("../models/Community-Post");
const Community = require("../models/Community");

// create post
router.post("/create/:communityId", async (req, res) => {
  console.log("creating post request received POST");
  console.log(req.body);
  console.log(req.user);
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      community: req.params.communityId,
      author: req.user.id,
      comments: [],
      date: Date.now(),
      likes: 0,
    });

    // find the community, add this post id to the community's posts array
    const community = await Community.findById(req.params.communityId);
    community.posts.push(newPost._id);
    await community.save();
    
    // community.posts.push(newPost._id);

    res.json(newPost);
    console.log("new post created \n", newPost);
  } catch (Error) {
    res.json({ message: "Error" });
    console.log("Error creating post");
    console.log(Error);
  }
});

module.exports = router;
