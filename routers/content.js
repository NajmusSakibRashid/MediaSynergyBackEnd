const express=require('express');
const router=express.Router();
const Content=require('../models/Content');

const authMiddleware=require('../middlewares/authentication');

router.use(express.json());
router.use(express.urlencoded({extended:true}));
router.use(authMiddleware);

router.get('/',async (req,res)=>{
  const contents=await Content.find({user:req.user.id});
  res.json(contents);
});

router.get('/:id',async (req,res)=>{
  const contents=await Content.findOne({_id:req.params.id , user:req.user.id});
  res.json(contents);
});

router.post('/',async (req,res)=>{
  try
  {
    const newContent = await Content.create({
      profile:req.body.profile,
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      date: req.body.date,
      productsServices: req.body.productsServices,
      consumer: req.body.consumer,
      keywords: req.body.keywords,
    });
    res.json(newContent);
  }catch{
    res.json({message:'Error'});
  }
});

router.delete('/:id',async (req,res)=>{
  try
  {
    const deletedContent=await Content.findOneAndDelete({_id:req.params.id , user:req.user.id});
    res.json(deletedContent);
  }catch{
    res.json({message:'Error'});
  }
});

module.exports=router;