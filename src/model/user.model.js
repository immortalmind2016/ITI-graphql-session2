const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports.UserModel = mongoose.model("User", UserSchema);
