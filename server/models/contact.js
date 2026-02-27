const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: String,
    phoneNumber: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Contact", contactSchema);
