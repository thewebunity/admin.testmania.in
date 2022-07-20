const Student = require("../models/student");
const Exam = require("../models/exam");

exports.getData = async (req, res) => {
  try {
    console.log("getData");
    const students = await Student.count({});
    const exams = await Exam.count({});

    console.log("dashboard :========> ", students, exams);
    return res.status(200).json({
      message: `Successfully got data!`,
      students,
      exams,
    });
  } catch (err) {
    console.log(`Error while getting data :========> ${err.message}`);
    return res.status(500).json({ message: `Error while getting data ` });
  }
};
