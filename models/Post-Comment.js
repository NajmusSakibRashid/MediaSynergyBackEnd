const mongoose = require("mongoose");

const User = require("./User");
const Post = require("./Community-Post");

const commentSchema = new mongoose.Schema({
    commenter: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    text: String,
    postId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Post",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }, 
});

commentSchema.pre('save', async function (next) {
    const comment = this;

    // Fetch the admin associated with this community
    const commenter = await User.findById(comment.commenter);

    // If the admin doesn't exist, prevent saving and return an error
    if (!commenter) {
        const error = new Error('Commenter user not found');
        return next(error);
    }

    // If all checks pass, proceed with saving
    next();
}
);

module.exports = mongoose.model("post-comments", commentSchema);
