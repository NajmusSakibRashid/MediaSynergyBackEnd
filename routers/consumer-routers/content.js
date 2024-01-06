const express=require('express');
const router=express.Router();

const Content=require('../../models/Content');
const Consumer=require('../../models/Consumer');
const search=require('../../utility/search-content');
const formatDate=require('../../utility/format-date');

let contents=[];
let lastUpdated=0;

const init = async () => {
  const localContents = await Content.find();
  contents.push(...localContents);
  lastUpdated = formatDate(new Date());
}

init();

router.post('/', async (req, res) => {
  const latestContents=await Content.find({date:{$gt:lastUpdated}});
  contents.push(...latestContents);
  if (req.body.search) {
    const consumer = req.headers['consumer'];
    const result = search(contents, req.body.search);

    // Update consumer's search history
    await Consumer.updateOne({ _id: consumer }, { $push: { searchHistory: req.body.search.split(' ') } });
    
    res.json(result);
  } else {
    res.json(contents);
  }
});

router.get('/',async (req,res)=>{
  const contents=await Content.find();
  res.json(contents);
});

router.get('/:id',async (req,res)=>{
  const contents=await Content.findOne({_id:req.params.id});
  await Content.updateOne({_id:req.params.id},{$inc:{clickcount:1}});
  res.json(contents);
});

module.exports=router;  