const Schedule=require('../models/Schedule');
const Content=require('../models/Content');
const formatDate=require('./format-date');
const socialPost=require('./social-post');
const getNextScheduleMS=require('./get-next-schedule-ms');
const eventEmitter=require('./event-emitter');


const schedulingHandler=async ()=>{
  setTimeout(schedulingHandler,getNextScheduleMS());
  const utc=new Date();
  utc.setHours(utc.getHours()+6);
  const crr = formatDate(utc);
  console.log(crr);
  const schedules=await Schedule.find({date:{$lte:crr}});
  console.log('we are here');
  if(!schedules)
    return;
  schedules.forEach(async (schedule)=>{
    if(schedule.repeat==='daily')
    {
      const date=new Date(schedule.date);
      date.setDate(date.getDate()+1);
      schedule.date=formatDate(date);
      await Schedule.updateOne({_id:schedule._id},{$set:{date:schedule.date}});
    }
    else if(schedule.repeat==='weekly')
    {
      const date=new Date(schedule.date);
      date.setDate(date.getDate()+7);
      schedule.date=formatDate(date);
      await Schedule.updateOne({_id:schedule._id},{$set:{date:schedule.date}});
    }
    else if(schedule.repeat==='monthly')
    {
      const date=new Date(schedule.date);
      date.setMonth(date.getMonth()+1);
      schedule.date=formatDate(date);
      await Schedule.updateOne({_id:schedule._id},{$set:{date:schedule.date}});
    }
    else if(schedule.repeat==='none')
      await Schedule.deleteOne({_id:schedule._id}); 
    const content=await Content.findOne({_id:schedule.content});
    if(!content)
      return;
    const productsServices=content.productsServices?content.productsServices.map((productService,index)=>`${index+1}. ${productService}`).join('\n'):'';
    const targetConsumers=content.consumer?content.consumer.map((elem,index)=>`${index+1}. Gender ${elem.gender} from age ${elem.ageFrom} to ${elem.ageTo}`).join('\n'):'';
    const text=`<b>${content.title?content.title:''}</b>\n${content.description?content.description:''}\n<b>Products are:</b>\n${productsServices}\n<b>Target Consumers are:</b>\n${targetConsumers}`;
    const medias=content.media.filter((elem)=>elem!=='');
    const post=await socialPost.post({
      post:text,
      platforms:schedule.platforms,
      mediaUrls:medias.length>0?medias:undefined,
    }).catch((err)=>{
      console.log(err);
    });
    console.log(post);
    content.postIds=[...content.postIds,...post.postIds];
    await Content.updateOne({_id:content._id},{$set:{postIds:content.postIds}});
    post.user=schedule.user;
    eventEmitter.emit('post',post);
  });
}

module.exports=schedulingHandler;