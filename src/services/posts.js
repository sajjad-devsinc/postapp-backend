const PostModel = require('../models/posts')
const ObjectId = require('mongoose').Types.ObjectId

exports.findPost = (params) => PostModel.find(params).lean()

exports.addPost = (req) => PostModel.create(req.body)

exports.updatePost = (id, req) =>
    PostModel.findByIdAndUpdate({ _id: id }, req.body).lean()

exports.deletePost = (id) => PostModel.findByIdAndDelete({ _id: id }).lean()
