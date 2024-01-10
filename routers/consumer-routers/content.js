const express=require('express');
const router=express.Router();

const Content=require('../../models/Content');
const Consumer=require('../../models/Consumer');
const search=require('../../utility/search-content');
const formatDate=require('../../utility/format-date');
const sort=require('../../utility/sort-content');

let contents=[];
let lastUpdated=0;

const init = async () => {
  try
  {
    const localContents = await Content.find();
    contents.push(...localContents);
    lastUpdated = formatDate(new Date());
  }catch{
    console.log('Error');
  }
}

init();

router.get('/', async (req, res) => {
  try
  {
    const latestContents = await Content.find({ date: { $gt: lastUpdated } });
    contents.push(...latestContents);
    lastUpdated = formatDate(new Date());
    if (req.query.search) {
      const consumer = req.headers['consumer'];
      const result = search(contents, req.query.search);

      // Update consumer's search history with unique values
      const searchTerms = req.query.search.split(' ');
      const uniqueSearchTerms = [...new Set(searchTerms)];
      await Consumer.updateOne({ _id: consumer }, { $addToSet: { searchHistory: uniqueSearchTerms } });
      const client = await Consumer.findOne({ _id: consumer });
      res.json(await sort(result, client));
    } else {
      res.json(await sort(contents, client));
    }
  }
  catch{
    res.json({ message: 'Error' });
  }
});

router.get('/:id',async (req,res)=>{
  try
  {
    const content = await Content.findOne({ _id: req.params.id });
    const consumer = req.headers['consumer'];
    await Consumer.updateOne({ _id: consumer }, { $addToSet: { clickHistory: content } });
    await Content.updateOne({ _id: req.params.id }, { $inc: { clickcount: 1 } });
    res.json(content);
  }
  catch{
    res.json({message:'Error'});
  }
});

module.exports=router;  