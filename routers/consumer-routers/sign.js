const express=require('express');
const router=express.Router();

const Consumer=require('../../models/Consumer');

router.post('/',async (req,res)=>{
  const consumer=new Consumer({
    age:req.body.age,
    gender:req.body.gender,
    latlng:req.body.latlng,
    searchHistory:[],
    clickHistory:[]
  });
  try{
    const savedConsumer=await consumer.save();
    res.json(savedConsumer);
  }catch(err){
    res.json({message:err});
  }
});

module.exports=router;