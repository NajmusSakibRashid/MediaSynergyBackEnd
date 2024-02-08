const express = require('express');

const router = express.Router();
const Content = require('../../models/Content');
const formatDate = require('../../utility/format-date');

const publishRouter = require('./content-routers/publish');
const scheduleRouter = require('./content-routers/schedule');

router.use('/publish', publishRouter);
router.use('/schedule', scheduleRouter);

router.get('/', async (req, res) => {
  try
  {
    const contents = await Content.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contents);
  }catch{
    res.json({ message: 'Error' });
  }
});

router.get('/:id', async (req, res) => {
  try
  {
    const contents = await Content.findOne({ _id: req.params.id, user: req.user.id });
    res.json(contents);
  }catch{
    res.json({ message: 'Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newContent = await Content.create({
      profile: req.body.profile,
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      media: req.body.media,
      category: req.body.category,
      date: formatDate(new Date()),
      productsServices: req.body.productsServices,
      consumer: req.body.consumer,
      keywords: req.body.keywords,
      clickcount: 0,
    });
    res.json(newContent);
  } catch(err) {
    console.log(err);
    res.json({ message: 'Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedContent = await Content.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json(deletedContent);
  } catch {
    res.json({ message: 'Error' });
  }
});

router.put('/:id', async (req, res) => {
  try{
    const content=await Content.findOneAndUpdate({_id:req.params.id,user:req.user.id},{
      title: req.body.title,
      description: req.body.description,
      media: req.body.media,
      category: req.body.category,
      productsServices: req.body.productsServices,
      consumer: req.body.consumer,
      keywords: req.body.keywords,
    });
    res.json(content);
  }catch{
    res.json({ message: 'Error' });
  }
});

module.exports = router;