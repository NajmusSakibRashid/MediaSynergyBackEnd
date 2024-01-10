const express=require('express');
const router=express.Router();

const authMiddleware=require('../middlewares/authentication');
const contentRouter=require('./user-routers/content');
const profileRouter=require('./user-routers/profile');

router.use(authMiddleware);

router.use('/content',contentRouter);
router.use('/profile',profileRouter);

module.exports=router;
