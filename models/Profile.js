const mongoose=require('mongoose');

const profileSchema=new mongoose.Schema({
  user:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'User',
    required:true,
  },
  logo:String,
  name:String,
  slogan:String,
  description:{
    aboutUs:String,
    goal:String,
  },
  contact:{
    physicalAddress:String,
    latlng:String,
    phoneNumber:[String],
    email:String,
    website:String,
    businessHours:{
      start:String,
      end:String
    },
    weekend:[String],
  },
  productConsumer:[{
    product:String,
    consumer:{
      ageFrom:Number,
      ageTo:Number,
      gender:String
    },
  }],
  awards:[{
    image:String,
    award:String,
    description:String,
    year:Number,
  }],
  history:[{
    year:Number,
    description:String,
  }],
  testimonials:[{
    image:String,
    name:String,
    testimonial:String,
  }],
});


module.exports=mongoose.model('Profile',profileSchema);
