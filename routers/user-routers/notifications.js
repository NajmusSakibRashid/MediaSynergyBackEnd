const express = require('express');
const app = express();
const router = express.Router();
const eventEmitter = require('../../utility/event-emitter');

router.get('/',(req,res)=>{
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.write(`${JSON.stringify({message:'Connected'})}\n\n`)
  eventEmitter.on('post',(post)=>{
    if(post.user==req.user.id)
      res.write(`data: ${JSON.stringify(post)}\n\n`);
  });
  res.on('close',()=>{
    eventEmitter.removeListener('post',()=>{});
  });
})

module.exports=router;