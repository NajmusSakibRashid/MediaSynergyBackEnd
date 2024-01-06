const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consumerSchema = new Schema({
  age:Number,
  gender:String,
  latlng:String,
  searchHistory:[String],
  clickHistory:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'Content'
  }]
});

module.exports = mongoose.model('Consumer', consumerSchema);