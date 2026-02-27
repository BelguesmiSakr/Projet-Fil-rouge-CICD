const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: { type: String, required: true, minlength: 8 },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
