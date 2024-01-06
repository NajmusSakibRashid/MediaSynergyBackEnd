const express=require('express');
const bcrypt=require('bcrypt');
const router=express.Router();
const User=require('../models/User');

router.post('/',async (req,res)=>{
  try
  {
    const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password
    });
    await user.save();
    res.json(user);
  }
  catch{
    res.json({message:'Error'});
  }
});

module.exports=router;