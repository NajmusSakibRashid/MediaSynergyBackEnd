const mongoose = require('mongoose');
const Profile = require('./Profile');
const User = require('./User');

const contentSchema = new mongoose.Schema({
  title: String,
  description: String,
  media: [String],
  category: String,
  date: String,
  clickcount: Number,
  productsServices: [String],
  consumer: [{
    ageFrom: Number,
    ageTo: Number,
    gender: String
  }],
  profile: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Profile',
    required: true,
  }],
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  keywords: [String],
});

contentSchema.pre('save', async function (next) {
  const content = this;

  // Fetch the profile and user associated with this content
  for (profileId of content.profile) {
    const profile = await Profile.findById(profileId);
    const user = await User.findById(content.user);

    // If either the profile or user doesn't exist, prevent saving and return an error
    if (!profile || !user) {
      const error = new Error('Profile or User not found');
      next(error);
    }

    // If the user of the profile is not the same as the user of the content, prevent saving and return an error
    if (profile.user.toString() !== user._id.toString()) {
      const error = new Error('User of Profile is not the same as User of Content');
      next(error);
    }
  }

  // If all checks pass, proceed with saving
  next();
});

module.exports = mongoose.model('Content', contentSchema);