const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    phone: { type: String, required: true, trim: true },
    gender: { type: String },
    dob: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
