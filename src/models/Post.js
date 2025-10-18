const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);

postSchema.index({ title: "text", body: "text", tags: 1 });

module.exports = mongoose.model("post", postSchema);
