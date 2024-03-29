// External Modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

app.use(cors());

// Internal Modules
const signupRouter = require("./routers/signup");
const signinRouter = require("./routers/signin");
const userRouter = require("./routers/user-router");
const consumerRouter = require("./routers/consumer-router");
const fileRouter = require("./routers/file");
const scheduleHandler = require("./utility/scheduling-handler");
const getnextScheduleMS = require("./utility/get-next-schedule-ms");
const communityRouter = require("./routers/community");

const port = process.env.PORT || 3000;

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.DB_NAME,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/signup", signupRouter);
app.use("/signin", signinRouter);
app.use("/user", userRouter);
app.use("/consumer", consumerRouter);
app.use("/file", fileRouter);
app.use("/communities", communityRouter);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/consumer', consumerRouter);
app.use('/file',fileRouter);

// const eventEmitter = require('./utility/event-emitter');

// app.get('/test',(req,res)=>{
//   eventEmitter.emit('post',{user:'659ec7a90efc9a260bf5d440',message:'Hello World'}); 
//   res.send('Done');
// })

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

setTimeout(scheduleHandler, getnextScheduleMS());