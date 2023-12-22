const express=require('express');
const user=require('../models/User');
const profile=require('../models/Profile');
const router=express.Router();

const authMiddleware=require('../middlewares/authentication');

router.get('/',authMiddleware,async (req,res)=>{
  const profiles=await profile.find({user:req.user.id});
  res.json(profiles);
});

router.post('/',authMiddleware,async (req,res)=>{
  const newProfile=await profile.create({
    user:req.user.id,
    logo:req.body.logo,
    name:req.body.name,
    slogan:req.body.slogan,
    description:{
      aboutUs:req.body.aboutUs,
      goal:req.body.goal,
    },
    contact:{
      physicalAddress:req.body.physicalAddress,
      mapLink:req.body.mapLink,
      phoneNumber:req.body.phoneNumber,
      email:req.body.email,
      website:req.body.website,
      businessHours:{
        start:req.body.start,
        end:req.body.end
      },
      weekend:req.body.weekend,
    },
    productConsumer:req.body.productConsumer,
    awards:req.body.awards,
    history:req.body.history,
    testimonials:req.body.testimonials,
  });
  res.json(newProfile);
});

module.exports=router;