const express = require("express");
const passport = require('passport');
const router = express.Router();
const {getPosts,newPost,getUserPosts,getUserDrafts, editPost,deletePost} = require('../controllers/posts');
router.get(
  '/',getPosts
)
router.post(
  '/',newPost
)
router.get(
  '/:uid',passport.authenticate('jwt', { session: false }), getUserPosts
)
router.get(
  '/drafts/:uid',passport.authenticate('jwt', { session: false }),getUserDrafts
)
router.put(
  '/:pid',passport.authenticate('jwt', { session: false }),editPost
)
router.delete(
  '/:pid',passport.authenticate('jwt', { session: false }),deletePost
)

module.exports = router;
