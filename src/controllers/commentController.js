const { validationResult } = require("express-validator");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { postId, body } = req.body;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const comment = new Comment({
      post: postId,
      author: req.user._id,
      body,
    });

    await comment.save();
    await comment.populate("author", "name email");
    return res.status(201).json({ comment });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Server error", message: error });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    const post = await Post.findById(comment.post);
    if (
      !comment.author.equals(req.user._id) &&
      !post.author.equals(req.user._id)
    ) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    await comment.remove();
    return res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Server error", message: error });
  }
};
