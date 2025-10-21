const express = require("express");
const router = express.Router();
const { commentCreateValidator } = require("../utils/validator");
const {
  createComment,
  deleteComment,
} = require("../controllers/commentController");
const auth = require("../middlewares/auth");

router.post("/", auth, commentCreateValidator, createComment);
router.delete("/:id", auth, deleteComment);

module.exports = router;
