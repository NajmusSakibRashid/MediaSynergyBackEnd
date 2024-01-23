const express=require('express');
const router=express.Router();
const Schedule=require('../../../models/Schedule');
const Content=require('../../../models/Content');

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
    const content=await Content.findOne({_id:req.body.content});
    if(!content){
      return res.json({message:'Content not found'});
    }
    if(content.user!=req.user.id){
      return res.json({message:'Not authorized'});
    }
    const newSchedule = await Schedule.create({
      user:req.user.id,
      content:req.body.content,
      date: req.body.date,
      platforms: req.body.platforms,
    });
    res.json(newSchedule);
  }catch(err){
    console.log(err);
    res.json({message:'Error'});
  }
});

router.put('/:id',async (req,res)=>{
  try
  {
    const updatedSchedule=await Schedule.findOneAndUpdate({_id:req.params.id , user:req.user.id},{
      date: req.body.date,
      platforms: req.body.platforms,
    });
    res.json(updatedSchedule);
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