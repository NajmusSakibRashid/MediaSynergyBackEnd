const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  user:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'User',
    required:true,
  },
  content:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Content',
    required: true,
  },
  date: String,
  platforms:[String],
});

module.exports = mongoose.model('Schedule', scheduleSchema);