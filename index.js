// External Modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Internal Modules
const signupRouter = require('./routers/signup');
const signinRouter = require('./routers/signin');

require('dotenv').config();
const port = process.env.PORT || 3000;

// Connect to DB
mongoose.connect(process.env.MONGODB_URI,{
  dbName: process.env.DB_NAME,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/signup', signupRouter);
app.use('/signin', signinRouter);

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});