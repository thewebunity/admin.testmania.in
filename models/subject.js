const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubjectSchema = new Schema(
  {
    name: { type: String, trim: true, unique: true },
    description: { type: String, trim: true },
    exams: {
      type: [{ type: Schema.Types.ObjectId, ref: "Exam" }],
      default: [],
    },
  },
  { timestamps: true }
);

const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
