const express = require("express");
const passport = require("passport");
const postValidation = require("../middlewares/post-validation");
const router = express.Router();
const {
  getPosts,
  newPost,
  getUserPosts,
  getUserDrafts,
  editPost,
  deletePost,
} = require("../controllers/posts");
//highorder middle ware
router.get("/", getPosts);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postValidation.validate("addPost"),
  newPost
);
router.get(
  "/:uid",
  passport.authenticate("jwt", { session: false }),
  getUserPosts
);
router.get(
  "/drafts/:uid",
  passport.authenticate("jwt", { session: false }),
  getUserDrafts
);
router.put(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  postValidation.validate("editPost"),
  editPost
);
router.delete(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  deletePost
);
module.exports = router;
