const PostModel = require('../models/posts')

exports.findPost = (params) => PostModel.find(params)
exports.addPost = (req) => PostModel.create(req.body)
exports.updatePost = (id, req) =>
    PostModel.findByIdAndUpdate({ _id: id }, req.body).lean()
exports.deletePost = (id) => PostModel.findByIdAndDelete({ _id: id })
