// External Modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// Internal Modules
const signupRouter = require('./routers/signup');
const signinRouter = require('./routers/signin');
const profileRouter = require('./routers/profiles');

const port = process.env.PORT || 3000;

// Connect to DB
mongoose.connect(process.env.MONGODB_URI,{
  dbName: process.env.DB_NAME,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/profiles', profileRouter);

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});