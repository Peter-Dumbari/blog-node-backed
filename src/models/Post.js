const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: {
      types: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },

    title: {
      type: String,
      require: true,
      trim: true,
    },
    body: {
      type: String,
      require: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

postSchema.index({ title: "text", body: "text", tags: 1 });

module.exports = mongoose.model("Post", postSchema);
