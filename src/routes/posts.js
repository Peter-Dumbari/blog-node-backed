const express = require("express");
const auth = require("../middlewares/auth");
const { postCreateValidator } = require("../utils/validator");
const {
  createPost,
  updatePost,
  getPost,
  getPosts,
  deletePost,
  toggleLike,
  getUserPosts,
} = require("../controllers/postController");
const upload = require("../config/multer");
const router = express.Router();

router.post("/", auth, upload.single("image"), postCreateValidator, createPost);
router.put("/:id", auth, updatePost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.delete("/:id", auth, deletePost);
router.get("/user/:userId", auth, getUserPosts);
router.post("/like/:id", auth, toggleLike);

module.exports = router;
