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
} = require("../controllers/postController");
const router = express.Router();

router.post("/", auth, postCreateValidator, createPost);
router.put("/:id", auth, updatePost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.delete("/:id", auth, deletePost);
router.post("/like/:id", auth, toggleLike);

module.exports = router;
