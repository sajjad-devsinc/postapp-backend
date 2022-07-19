const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String },
  body: { type: String},
  isPublish: {type: Boolean},
  userId: {type: ObjectId}

});



const PostModel = mongoose.model('post', PostSchema);

module.exports = PostModel;
