const PostModel = require("../models/posts");

const getPosts = (req, res, next) => {
  PostModel.find({ isPublish: true })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const newPost = (req, res, next) => {
  if (
    req.body.title &&
    req.body.body &&
    req.body.isPublish &&
    req.body.userId
  ) {
    PostModel.create(req.body)
      .then((data) => {
        res.status(201).send("post added successfully");
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  } else {
    res.status(400).send("Bad request Validation Error");
  }
};

const editPost = (req, res, next) => {
  const id = req.params.pid;
  if (req.user._id === id) {
    PostModel.findByIdAndUpdate(id, req.body)
      .then((data) => {
        res.status(202).send("Post Updated Successfully");
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  } else {
    res.status(400).send("Bad request invalid id");
  }
};

const deletePost = (req, res, next) => {
  const id = req.params.pid;
  PostModel.findOneAndRemove({ _id: id, userId: req.user._id })
    .then((data) => {
        if(data){
            res.status(202).send(data+"deleted Successfully");
        }
        else{
            res.status(400).send("Bad request No data found");
        }

    })
    .catch((err) => {
      res.status(204).send(err.message);
    });
};

const getUserPosts = (req, res, next) => {
  const id = req.params.uid;
  if (id === req.user._id) {
    PostModel.find({ isPublish: true, userId: id })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } else {
    res.status(400).send("Unauthorized");
  }
};
const getUserDrafts = (req, res, next) => {
  const id = req.params.uid;
  if (id === req.user._id) {
    PostModel.find({ isPublish: false, userId: id })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } else {
    res.status(400).send("Unauthorized");
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
