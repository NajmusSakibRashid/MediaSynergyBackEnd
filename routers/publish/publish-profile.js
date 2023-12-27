const express=require('express');
const router=express.Router();
const Profile=require('../../models/Profile');

const authMiddleware=require('../../middlewares/authentication');

router.use(express.json());
router.use(express.urlencoded({extended:true}));
router.use(authMiddleware);

router.post('/:id',async (req,res)=>{
  try
  {
    const profile = await Profile.findOne({ _id: req.params.id, user: req.user.id });
    res.json({
      ...profile,
      message: 'The profile has been published successfully!'
    })
  }
  catch{
    res.json({message:'Error'});
  }
});

module.exports=router; 