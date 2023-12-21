const express=require('express');
const bcrypt=require('bcrypt');
const app=express();
const router=express.Router();
const User=require('../models/User');

router.use(express.urlencoded({extended:true}));

router.post('/',async (req,res)=>{
  const password=bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));
  const user=new User({
    name:req.body.name,
    email:req.body.email,
    password
  });
  await user.save();
  res.json(user);
});

module.exports=router;