const Schedule=require('../models/Schedule');
const Content=require('../models/Content');
const formatDate=require('./format-date');
const socialPost=require('./social-post');
const getNextScheduleMS=require('./get-next-schedule-ms');


const schedulingHandler=async ()=>{
  setTimeout(schedulingHandler,getNextScheduleMS());
  const crr=formatDate(new Date());
  console.log(crr);
  const schedules=await Schedule.find({date:{$lte:crr}});
  if(!schedules)
    return;
  schedules.forEach(async (schedule)=>{
    await Schedule.deleteOne({_id:schedule._id});
    if(schedule.repeat==='daily')
    {
      const date=new Date(schedule.date);
      date.setDate(date.getDate()+1);
      schedule.date=formatDate(date);
      await Schedule.create(schedule);
    }
    else if(schedule.repeat==='weekly')
    {
      const date=new Date(schedule.date);
      date.setDate(date.getDate()+7);
      schedule.date=formatDate(date);
      await Schedule.create(schedule);
    }
    else if(schedule.repeat==='monthly')
    {
      const date=new Date(schedule.date);
      date.setMonth(date.getMonth()+1);
      schedule.date=formatDate(date);
      await Schedule.create(schedule);
    }
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
  });
}

module.exports=schedulingHandler;