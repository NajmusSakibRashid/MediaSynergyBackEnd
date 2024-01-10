const SocialPost = require('social-post-api');
const socialPost = new SocialPost(process.env.SOCIAL_AUTH_TOKEN);
module.exports = socialPost;