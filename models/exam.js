const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuestionSchema = new Schema(
  {
    question: { type: String, required: true },
    description: { type: String },
    answer: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    options: { type: [String], required: true },
  },
  { timestamps: true }
);

const ExamSchema = new Schema(
  {
    title: { type: String },
    questions: { type: [QuestionSchema] },
    startDate: { type: Date },
    endDate: { type: Date },
    duration: { type: Number },
    marks: { type: Number, default: 1 },
    fee: { type: Number },
    subject: { type: Schema.Types.ObjectId, ref: "Subject" },
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", ExamSchema);

module.exports = Exam;
