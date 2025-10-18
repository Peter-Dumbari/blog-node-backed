const express = require("express");
const router = express.Router();
const auth = require("../utils/a");
const { commentCreateValidator } = require("../utils/validator");
const {
  createComment,
  deleteComment,
} = require("../controllers/commentController");

router.post("/", auth, commentCreateValidator, createComment);
router.delete("/:id", auth, deleteComment);

module.exports = router;
