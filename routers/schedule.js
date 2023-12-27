const express=require('express');
const router=express.Router();
const Schedule=require('../models/Schedule');

const authMiddleware=require('../middlewares/authentication');

router.use(express.json());
router.use(express.urlencoded({extended:true}));
router.use(authMiddleware);

router.get('/',async (req,res)=>{
  try
  {
    const schedules = await Schedule.find({ user: req.user.id });
    res.json(schedules);
  }catch{
    res.json({message:'Error'});
  }
});

router.get('/:id',async (req,res)=>{
  try
  {
    const schedules = await Schedule.findOne({ _id: req.params.id, user: req.user.id });
    res.json(schedules);
  }catch{
    res.json({message:'Error'});
  }
}); 

router.post('/',async (req,res)=>{
  try
  {
    const newSchedule = await Schedule.create({
      content:req.body.content,
      date: req.body.date,
      time: req.body.time,
      media: req.body.media,
      user: req.user.id,
    });
    res.json(newSchedule);
  }catch{
    res.json({message:'Error'});
  }
});

router.delete('/:id',async (req,res)=>{
  try
  {
    const deletedSchedule=await Schedule.findOneAndDelete({_id:req.params.id , user:req.user.id});
    res.json(deletedSchedule);
  }catch{
    res.json({message:'Error'});
  }
});

module.exports=router;