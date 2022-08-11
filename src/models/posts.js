const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 6,
  },
  body: {
    type: String,
    required: true,
    minLength: 12,
  },
  isPublish: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "user",
    required: true,
    index: true,
  },
});

const PostModel = mongoose.model("post", PostSchema);
module.exports = PostModel;
