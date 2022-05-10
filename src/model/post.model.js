const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: String,
    userId: String,
  },
  { timestamps: true }
);

module.exports.PostModel = mongoose.model("Post", PostSchema);
