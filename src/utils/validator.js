const { body } = require("express-validator");

exports.registerValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),

  body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
];

exports.loginValidator = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password required"),
];

exports.postCreateValidator = [
  body("title").trim().notEmpty().withMessage("Title required"),
  body("type").trim().notEmpty().withMessage("Post Type required"),
  body("tags").optional().isString().withMessage("Tags must be an array"),
  body("body").trim().notEmpty().withMessage("Body required"),
];

exports.commentCreateValidator = [
  body("postId").notEmpty().withMessage("postId required"),
  body("body").trim().notEmpty().withMessage("Comment body required"),
];
