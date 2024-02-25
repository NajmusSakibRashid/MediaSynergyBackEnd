const express=require('express');
const router=express.Router();

const authMiddleware=require('../middlewares/authentication');
const contentRouter=require('./user-routers/content');
const profileRouter=require('./user-routers/profile');
const notificationRouter=require('./user-routers/notifications');
const communityRouter = require('./user-routers/community');
const User=require('../models/User');

router.use(authMiddleware);

router.get('/',async (req,res)=>{
  const user=await User.findById(req.user.id)
  if(!user) return res.status(400).send({error:'User not found'});
  res.send({user});
})

router.use('/content',contentRouter);
router.use('/profile',profileRouter);
router.use('/notifications',notificationRouter);
router.use('/communities',communityRouter);

module.exports=router;
