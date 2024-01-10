const express = require('express');
const Content = require('../../../models/Content');
const router = express.Router();

const socialPost = require('../../../utility/social-post');

router.post('/', async (req, res) => {
  try
  {
    const content = await Content.findOne({ _id: req.body.content, user: req.user.id });
    const post = await socialPost.post({
      "post": content.description,
      "platforms": req.body.platforms,
      "mediaUrls": content.media.length > 0 ? content.media : null,
    }).catch((err) => {
      console.log(err);
    });
    res.json(post);
  }catch(err){
    console.log(err);
    res.json({message:'Error'});
  }
});

module.exports = router;
