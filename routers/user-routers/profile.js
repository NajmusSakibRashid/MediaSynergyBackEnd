const express=require('express');
const user=require('../../models/User');
const profile=require('../../models/Profile');
const router=express.Router();

router.get('/',async (req,res)=>{
  try
  {
    const profiles = await profile.find({ user: req.user.id });
    res.json(profiles);
  }catch{
    res.json({message:'Error'});
  }
});

router.get('/:id',async (req,res)=>{	
  try
  {
    const profiles = await profile.findOne({ _id: req.params.id, user: req.user.id });
    res.json(profiles);
  }catch{
    res.json({message:'Error'});
  }
});

router.post('/',async (req,res)=>{
  try
  {
    const newProfile = await profile.create({
      user: req.user.id,
      logo: req.body.logo,
      name: req.body.name,
      slogan: req.body.slogan,
      description: {
        aboutUs: req.body.aboutUs,
        goal: req.body.goal,
      },
      contact: {
        physicalAddress: req.body.physicalAddress,
        latlng: req.body.latlng,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        website: req.body.website,
        businessHours: {
          start: req.body.start,
          end: req.body.end
        },
        weekend: req.body.weekend,
      },
      productConsumer: req.body.productConsumer,
      awards: req.body.awards,
      history: req.body.history,
      testimonials: req.body.testimonials,
    });
    res.json(newProfile);
  }catch{
    res.json({message:'Error'});
  }
});

router.delete('/:id',async (req,res)=>{
  try
  {
    const deletedProfile=await profile.findOneAndDelete({_id:req.params.id , user:req.user.id});
    res.json(deletedProfile);
  }catch{
    res.json({message:'Error'});
  }
});

router.put('/:id',async (req,res)=>{
  try
  {
    const updatedProfile=await profile.findOneAndUpdate({_id:req.params.id , user:req.user.id},{
      logo: req.body.logo,
      name: req.body.name,
      slogan: req.body.slogan,
      description: {
        aboutUs: req.body.aboutUs,
        goal: req.body.goal,
      },
      contact: {
        physicalAddress: req.body.physicalAddress,
        latlng: req.body.latlng,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        website: req.body.website,
        businessHours: {
          start: req.body.start,
          end: req.body.end
        },
        weekend: req.body.weekend,
      },
      productConsumer: req.body.productConsumer,
      awards: req.body.awards,
      history: req.body.history,
      testimonials: req.body.testimonials,
    });
    res.json(updatedProfile);
  }catch{
    res.json({message:'Error'});
  }
});

module.exports=router;