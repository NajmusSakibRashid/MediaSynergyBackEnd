const express=require('express');
const router=express.Router();

const authMiddleware=require('../middlewares/authentication');
const contentRouter=require('./user-routers/content');
const profileRouter=require('./user-routers/profile');
const scheduleRouter=require('./user-routers/schedule');

router.use(authMiddleware);

router.use('/content',contentRouter);
router.use('/profile',profileRouter);
router.use('/schedule',scheduleRouter);

module.exports=router;
