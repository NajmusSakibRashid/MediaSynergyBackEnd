const express = require('express');
const Content = require('../../../models/Content');
const router = express.Router();

const socialPost = require('../../../utility/social-post');

router.post('/', async (req, res) => {
  try
  {
    // console.log(req.body)
    const content = await Content.findOne({ _id: req.body.content, user: req.user.id });
    // console.log(content);
    const productsServices = content.productsServices?content.productsServices.map((productService,index) => `${index+1}. ${productService}`).join('\n'):'' ;
    const targetConsumers = content.consumer?content.consumer.map((elem,index)=>`${index+1}. Gender ${elem.gender} from age ${elem.ageFrom} to ${elem.ageTo}`).join('\n'):'';
    const text = `<b>${content.title?content.title:''}</b>\n${content.description?content.description:''}\n<b>Products are:</b>\n${productsServices}\n<b>Target Consumers are:</b>\n${targetConsumers}`;
    const post = await socialPost.post({
      "post": text,
      "platforms": req.body.platforms,
      // "mediaUrls": content.media.length > 0 ? content.media : null,
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
