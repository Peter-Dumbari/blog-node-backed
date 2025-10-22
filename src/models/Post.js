const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinary");

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    type: {
      type: String,
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
    image: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    tags: [
      {
        type: String,
        trim: true,
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

// postSchema.index({ title: "text", body: "text", tags: 1 });
// Automatically delete image from Cloudinary when post is removed
postSchema.pre("remove", async function (next) {
  try {
    if (this.image && this.image.public_id) {
      await cloudinary.uploader.destroy(this.image.public_id);
    }
    next();
  } catch (err) {
    console.error("Error deleting image from Cloudinary:", err);
    next(err);
  }
});

module.exports = mongoose.model("post", postSchema);
