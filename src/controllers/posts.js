const { validationResult } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;
const postService = require('../services/posts');
const getPosts = async (req, res, next) => {
  // get all posts
  try{
  const allPosts= await postService.findPost({ isPublish: true });
  res.status(200).json(allPosts);
  }
  catch{
    res.status(500).send({message:"internal server error"});
  }
};

const newPost = async (req, res, next) => {
  // check validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).send({ message: "fields validation failed" });
  // check valid user to perform action
  if (req.user._id !== req.body.userId) return res.status(401).send({ message: "unauthorized user" });
  // add the post
  try{
  const addPost = await postService.addPost(req);
  res.status(201).send({ messgae: "post added successfully", post: addPost });
  }
  catch{
    res.status(500).send({message:"internal server error"});
  }
};

const editPost = async (req, res, next) => {
  // check validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).send({ message: "fields validation failed" });
  // get post id from url
  const pid = req.params.pid;
  // check post id is valid or not
  if (!ObjectId.isValid(pid)) return res.status(400).send({ message: "Invalid post id Bad request" });
  // find post by id
  const post = await postService.findPost({ _id: pid });
  // check valid user to perform action
  if (req.user._id != post.userId) return res.status(401).send({ message: "unauthorized user" });
  // edit the post
  try{
  const editPost = await postService.updatePost(pid,req);
  res.status(200).send({ messgae: "post edited successfully", post: editPost });
  }
  catch{
    res.status(500).send({message:"internal server error"});
  }
};

const deletePost = async (req, res, next) => {
  // get post id from url
  const pid = req.params.pid;
  // check post id is valid or not
  if (!ObjectId.isValid(pid)) return res.status(400).send({ message: "Invalid post id Bad request" });
  // find post by id
  const post = await postService.findPost({_id: pid});
  // check valid user to perform action
  if (req.user._id != post.userId) return res.status(401).send({ message: "unauthorized user" });
  // edit the post
  try{
  const deletePost = await postService.deletePost(pid)
  res.status(200).send({ messgae: "post deleted successfully", post: deletePost });
  }
  catch{
    res.status(500).send({message:"internal server error"});
  }
};

const getUserPosts = async (req, res, next) => {
  // get user id from params
  const uid = req.params.uid;
  // check user id is valid or not
  if (!ObjectId.isValid(uid)) return res.status(400).send({ message: "Invalid user id Bad request" });
  // check user id matches with the login user
  if (req.user._id != uid) return res.status(401).send({ message: "unauthorized user" });
  try{
  const userPosts = await postService.findPost({ isPublish: true , userId: uid });
  res.status(200).send(userPosts);
  }
  catch{
    res.status(500).send({message:"internal server error"});
  }
};
const getUserDrafts = async (req, res, next) => {
  // get user id from params
  const uid = req.params.uid;
  // check user id is valid or not
  if (!ObjectId.isValid(uid)) return res.status(400).send({ message: "Invalid user id Bad request" });
  // check user id matches with the login user
  if (req.user._id != uid) return res.status(401).send({ message: "unauthorized user" });
  try{
  const userDrafts = await postService.findPost({ isPublish: true , userId: uid });
  res.status(200).send(userDrafts);
  }
  catch{
    res.status(500).send({message:"internal server error"});
  }
};
module.exports = {
  getPosts,
  newPost,
  editPost,
  deletePost,
  getUserPosts,
  getUserDrafts,
};
