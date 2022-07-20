const mongoose = require("mongoose");
const { Schema } = mongoose;

const QSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    question: { type: String, required: true },
    description: { type: String },
    answer: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    selectedAnswer: { type: String, required: true, default: null },
    options: { type: [String], required: true },
    isFlagged: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const StudentExamSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    startedAt: { type: Date },
    submittedAt: { type: Date },
    subject: { type: Object },
    fee: { type: Number },
    questions: { type: [QSchema] },
    marks: { type: Number },
    score: { type: Number, default: 0 },
    inProgress: { type: Boolean, default: false },
    isSubmitted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const StudentSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    school: { type: String, required: true, trim: true },
    gender: { type: String, enum: ["MALE", "FEMALE"] },
    email: { type: String, lowercase: true },
    dob: { type: Date },
    exams: { type: [StudentExamSchema], default: [] },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
