const PostModel = require('../models/posts');

const getPosts = (req, res, next) => {
    PostModel.find({isPublish:true}).then(
        (data) => {
            res.json(data);
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    )
}

const newPost = (req, res, next) => {
    PostModel.create(req.body).then(
        (data) => {
            res.send("post added successfully");
        }
    )
}

const editPost = (req,res,next)=>{
    const id=req.params.pid;
    PostModel.findByIdAndUpdate(id,req.body).then(
        (data)=>{
            res.send("Post Updated Successfully");
        }
    ).catch(
        (err)=>{
            console.log(err);
        }
    )
}

const deletePost = (req,res,next)=>{
    const id=req.params.pid;
    PostModel.findByIdAndDelete(id).then(
        (data)=>{
            res.send("Post Deleted Successfully");
        }
    ).catch(
        (err)=>{
            console.log(err);
        }
    )
}

const getUserPosts=(req,res,next)=>{
    const id=req.params.uid;
    PostModel.find({isPublish:true,userId:id}).then(
        (data) => {
            res.json(data);
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    )

}
const getUserDrafts=(req,res,next)=>{
    const id=req.params.uid;
    PostModel.find({isPublish:false,userId:id}).then(
        (data) => {
            res.json(data);
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    )

}
module.exports = { getPosts, newPost,editPost,deletePost, getUserPosts,getUserDrafts }