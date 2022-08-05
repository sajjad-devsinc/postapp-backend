const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");
const { Schema } = mongoose;
// indexes for searching
// refrence
const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  isPublish: { type: Boolean, required: true },
  userId: { type: ObjectId, required: true },
});

const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel;
