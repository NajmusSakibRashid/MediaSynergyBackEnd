const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  content:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Content',
    required: true,
  },
  date: String,
  time: String,
  media:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Media',
    required:true,
  }
});