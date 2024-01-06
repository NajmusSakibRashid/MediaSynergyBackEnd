const express = require('express');
const router = express.Router();

const contentRouter = require('./consumer-routers/content');
const signRouter = require('./consumer-routers/sign');

router.use('/content', contentRouter);
router.use('/sign', signRouter);

module.exports = router;