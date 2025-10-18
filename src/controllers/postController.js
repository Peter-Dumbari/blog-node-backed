const { validationResult } = require("express-validator");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { title, body, tags } = req.body;
    const post = new Post({
      author: req.user._id,
      title,
      body,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
    });
    await post.save();
    return res.status(201).json({ post });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;
    const [post, total] = await Promise.all([
      post
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("author", "username email")
        .lean(),
    ]);
    return res.status(200).json({ page, limit, total, posts });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error, message: "Server error" });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name email")
      .lean();
    if (!post) return res.status(404).json({ error: "Post not found" });

    const comments = await Comment.find({ post: post._id })
      .populate("author", "name email")
      .sort({ createdAt: 1 })
      .lean();

    res.json({ ...post, comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (!post.author.equals(req.user._id))
      return res.status(403).json({ error: "Forbidden" });

    const { title, body, tags } = req.body;
    if (title) post.title = title;
    if (body) post.body = body;
    if (tags) post.tags = tags.split(",").map((tag) => tag.trim());
    await post.save();
    return res.status(200).json({ post: post, message: "Post updated" });
  } catch (error) {
    return res.status(500).json({ error: "Server error", message: error });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (!post.author.equals(req.user._id))
      return res.status(403).json({ error: "Forbidden" });

    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ post: req.params.id });
    return res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Server error", message: error });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const userId = req.user._id;
    const liked = post.likes.some((id) => id.equals(userId));
    if (liked) {
      post.likes = post.filter((id) => !id.equals(userId));
    } else {
      post.likes.push(userId);
    }
    await post.save();
    return res
      .status(200)
      .json({ liked: !liked, likesCount: post.likes.length });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Server error", message: error });
  }
};
