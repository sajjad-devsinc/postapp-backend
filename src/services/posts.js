const PostModel = require("../models/posts");
exports.allPosts = async ()=>{
  return await PostModel.find({ isPublish: true });
}
exports.addPost =async (req)=>{
  return await PostModel.create(req.body);
}
exports.findPost= async (id)=>{
  return await PostModel.findById({ _id: id });
}
exports.updatePost= async (id,req)=>{
  return await PostModel.findByIdAndUpdate({ _id: id }, req.body);
}
exports.deletePost= async (id)=>{
  return await PostModel.findByIdAndDelete({ _id: id });
}
exports.userPosts= async (id)=>{
  return await PostModel.find({ isPublish: true , userId:id });
}
exports.userDrafts= async (id)=>{
  return await PostModel.find({ isPublish: false , userId:id });
}
