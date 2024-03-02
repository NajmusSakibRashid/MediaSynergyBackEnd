const express = require("express");

const router = express.Router();
const Post = require("../models/Community-Post");
const Community = require("../models/Community");
const Comment = require("../models/Post-Comment");

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
    console.log("new post created \n");
    // console.log("new post created \n", newPost);
  } catch (Error) {
    res.json({ message: "Error" });
    console.log("Error creating post");
    console.log(Error);
  }
});

router.post("/comment/:postId", async (req, res) => {
  console.log("commenting on post");
  console.log(req.body);
  console.log(req.user);

  try {
    const post = await Post.findById(req.params.postId);
    // create comment
    const comment = await Comment.create({
      text: req.body.comment,
      commenter: req.user.id,
      date: Date.now(),
      postId: req.params.postId,
    });

    post.comments.push(comment._id);
    await post.save();
    res.json("Comment done");
  } catch (Error) {
    res.json({ message: "Error" });
    console.log("Error commenting on post");
    console.log(Error);
  }
});

router.get("/getAllComments/:postId", async (req, res) => {
  console.log("fetching all comments of a post");
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
    console.log("successfully fetched comments");
    // console.log("comments of this post: \n", comments);
  } catch {
    res.json({ message: "Error" });
  }
});

module.exports = router;
