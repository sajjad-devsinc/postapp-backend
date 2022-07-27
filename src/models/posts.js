const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  isPublish: { type: Boolean, required: true },
  userId: { type: ObjectId, required: true },
});

const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel;
