const express = require("express");
const router = express.Router();
const {newPost,getUserPosts,getUserDrafts, editPost,deletePost} = require('../controllers/posts');
router.post(
  '/new',newPost
)
router.get(
  '/:uid', getUserPosts
)
router.get(
  '/drafts/:uid',getUserDrafts
)
router.put(
  '/edit/:pid',editPost
)
router.delete(
  '/delete/:pid',deletePost
)

module.exports = router;