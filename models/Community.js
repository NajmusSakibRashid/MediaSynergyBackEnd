const mongoose = require('mongoose');
// const Profile = require('./Profile');
const User = require('./User');

const communitySchema = new mongoose.Schema({
  name: String,
  tagline: String,
  admin: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  posts: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Post'
  }],
  users: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  }]
});

communitySchema.pre('save', async function (next) {
  const community = this;

  // Fetch the admin associated with this community
  const admin = await User.findById(community.admin);

  // If the admin doesn't exist, prevent saving and return an error
  if (!admin) {
    const error = new Error('Admin user not found');
    return next(error);
  }

  // If all checks pass, proceed with saving
  next();
});

module.exports = mongoose.model('Community', communitySchema);