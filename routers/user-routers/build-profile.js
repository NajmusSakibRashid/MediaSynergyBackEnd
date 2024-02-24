const express=require('express');
const user=require('../../models/User');
const profile=require('../../models/Profile');
const router=express.Router();

router.get('/',async (req,res)=>{
  try
  {
    const profiles = await profile.find({ user: req.user.id });
    console.log("in build profile router");
    res.json(profiles);
  }catch{
    res.json({message:'Error'});
  }
});

module.exports=router;