const mongoose = require("mongoose");
// const Profile = require('./Profile');
const User = require("./User");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "author",
    required: true,
  },
  community: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Community",
    required: true,
  },
  comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Comment",
    },
  ],
  likes: 
  {
    type: Number,
    default: 0
  }
  ,
  date: {
    type: Date,
    default: Date.now,
  },
});

postSchema.pre('save', async function (next) {
    const post = this;
  
    // Fetch the admin associated with this community
    const author = await User.findById(post.author);
  
    // If the admin doesn't exist, prevent saving and return an error
    if (!author) {
      const error = new Error('Author user not found');
      return next(error);
    }
  
    // If all checks pass, proceed with saving
    next();
  });


module.exports = mongoose.model("Community-Post", postSchema);
