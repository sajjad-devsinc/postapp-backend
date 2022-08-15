const { ObjectId } = require('mongoose')
const mongoose = require('mongoose')
const { Schema } = mongoose
// indexes for searching
// refrence
const PostSchema = new Schema({
    title: { type: String, required: true, minlength: 4 },
    body: { type: String, required: true, minlength: 8 },
    isPublish: { type: Boolean, required: true },
    userId: { type: ObjectId, required: true, index: true },
})

const PostModel = mongoose.model('post', PostSchema)
module.exports = PostModel
