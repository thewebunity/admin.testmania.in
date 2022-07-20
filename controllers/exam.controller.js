const Subject = require("../models/subject");
const Student = require("../models/student");
const Exam = require("../models/exam");
const { ObjectId } = require("mongodb");

function transformData(data) {
  let transformedData;
  if (data.length > 0) {
    transformedData = data.map((item) => {
      let temp = {
        id: item._id,
        ...item,
      };
      delete temp._id;
      return temp;
    });
  } else {
    transformedData = {
      id: data._id,
      ...data,
    };
    delete transformedData._id;
  }

  return transformedData;
}

exports.getExams = async (req, res) => {
  console.log(`---------------- Getting exams ------------------`);
  try {
    let exams;

    exams = await Exam.find()
      .populate("subject", "name description")
      .sort({ createdAt: -1 })
      .lean();
    console.log("exams", exams);
    exams = transformData(exams);

    console.log(`Exams Found! :=========> `, exams);
    return res.status(200).json({
      message: `Successfully got exams!`,
      exams,
    });
  } catch (err) {
    console.log(`Error while getting exams :========> ${err.message}`);
    return res.status(500).json({ message: `Error while getting exams ` });
  }
};

exports.getExam = async (req, res) => {
  try {
    let exam = await Exam.findOne({
      _id: ObjectId(req.params.id),
    })
      .populate("subject", "name description")
      .lean();

    exam = transformData(exam);

    console.log(`Exam Found! :=========> `, exam);

    return res.status(200).json({
      message: `Got exam successfully!`,
      exam,
    });
  } catch (err) {
    console.log(`Error finding exam :=======> ${err.message}`);
    res
      .status(500)
      .json({ message: `Error finding exam :=======> ${err.message} ` });
  }
};

exports.getQuestion = async (req, res) => {
  try {
    let exam = await Exam.findOne({
      _id: ObjectId(req.params.id),
    }).lean();

    exam = transformData(exam);

    return res.status(200).json({
      message: `Got question successfully!`,
      question: exam.questions.find(
        (q) => q._id.toString() === req.params.questionId
      ),
    });
  } catch (err) {
    console.log(`Error finding exam and questions :=======> ${err.message}`);
    res.status(500).json({
      message: `Error finding exam and questions :=======> ${err.message} `,
    });
  }
};

exports.addExam = async (req, res) => {
  try {
    const exam = await Exam.create({
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      duration: req.body.duration,
      fee: req.body.fee,
      marks: req.body.marks,
      subject: req.body.subject.id,
    });

    try {
      await Subject.updateOne(
        { _id: req.body.subject.id },
        { $push: { exams: exam._id } }
      );

      console.log(`Updated subject added successfully!`);
    } catch (err) {
      console.log(`Error while updating subject :============> ${err}`);
      return res.status(500).json({
        message: `Error while updating subject :============> ${err}`,
      });
    }

    console.log(`Exam added successfully!`, exam);
    return res.status(200).json({
      message: `Exam added successfully!`,
      exam: exam,
      id: exam._id,
    });
  } catch (err) {
    console.log(`Error while adding exam :=======> `, err);
    return res.status(500).json({ message: err.message });
  }
};

exports.addQuestion = async (req, res) => {
  try {
    await Exam.updateOne(
      { _id: req.body.id },
      {
        $push: {
          questions: {
            question: req.body.question,
            description: req.body.description,
            options: req.body.options,
            imageUrl: req.body.imageUrl,
            answer: req.body.answer,
          },
        },
      }
    );

    console.log(`Added question successfully!`);
    return res.status(200).json({
      message: `Added question successfully!`,
    });
  } catch (err) {
    console.log(`Error while updating subject :============> ${err}`);
    return res.status(500).json({
      message: `Error while updating subject :============> ${err}`,
    });
  }
};

exports.editExam = async (req, res) => {
  try {
    const exam = await Exam.findOne({ _id: req.body.id }).populate(
      "subject",
      "name"
    );
    console.log(`Exam Found! :=========> `, exam);

    try {
      await Subject.updateOne(
        { _id: exam.subject._id },
        { $pull: { exams: exam._id } }
      );
      console.log(`Subject removed successfully!`);
    } catch (err) {
      console.log(`Error while removing subject :============> ${err}`);
      return res.status(500).json({
        message: `Error while removing subject :============> ${err}`,
      });
    }

    try {
      const exam = await Exam.updateOne(
        { _id: req.body.id },
        {
          title: req.body.title,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          duration: req.body.duration,
          fee: req.body.fee,
          marks: req.body.marks,
          subject: req.body.subject.id,
        }
      );

      try {
        await Subject.updateOne(
          { _id: req.body.subject.id },
          { $push: { exams: exam._id } }
        );

        console.log(`Updated subject added successfully!`);
      } catch (err) {
        console.log(`Error while updating subject :============> ${err}`);
        return res.status(500).json({
          message: `Error while updating subject :============> ${err}`,
        });
      }

      console.log(`Exam added successfully!`, exam);
      return res.status(200).json({
        message: `Exam added successfully!`,
        exam: exam,
        id: exam._id,
      });
    } catch (err) {
      console.log(`Error while adding exam :=======> `, err);
      return res.status(500).json({ message: err.message });
    }
  } catch (err) {
    console.log(`Error while finding exam :============> ${err}`);
    return res.status(500).json({
      message: `Error while finding exam :============> ${err}`,
    });
  }
};

exports.editQuestion = async (req, res) => {
  const id = req.body.id;
  console.log(`---------------- Deleting question ------------------ ${id}`);

  try {
    await Exam.updateOne(
      { "questions._id": req.body.questionId },
      {
        $set: {
          "questions.$.question": req.body.question,
          "questions.$.description": req.body.description,
          "questions.$.options": req.body.options,
          "questions.$.imageUrl": req.body.imageUrl,
          "questions.$.answer": req.body.answer,
        },
      }
    );
    console.log(`Question updated successfully!`);

    return res.status(200).json({
      message: `Question updated successfully!`,
    });
  } catch (err) {
    console.log(`Error while updating subject :============> ${err}`);
    return res.status(500).json({
      message: `Error while updating subject :============> ${err}`,
    });
  }
};

exports.deleteExam = async (req, res) => {
  const id = req.body.id;
  console.log(`---------------- Deleting exam ------------------ ${id}`);

  try {
    const exam = await Exam.findOne({ _id: req.body.id }).populate(
      "subject",
      "name"
    );
    console.log(`Exam Found! :=========> `, exam);

    try {
      await Subject.updateOne(
        { _id: exam.subject._id },
        { $pull: { exams: exam._id } }
      );
      console.log(`Subject removed successfully!`);
    } catch (err) {
      console.log(`Error while removing subject :============> ${err}`);
      return res.status(500).json({
        message: `Error while removing subject :============> ${err}`,
      });
    }
  } catch (err) {
    console.log(`Error while finding exam :============> ${err}`);
    return res.status(500).json({
      message: `Error while finding exam :============> ${err}`,
    });
  }

  try {
    const response = await Exam.deleteOne({ _id: ObjectId(id) });
    console.log(
      `Successfully deleted ${response.deletedCount} exam(s) with id: ${id}`
    );

    return res.status(200).json({
      message: `Successfully deleted ${response.deletedCount} exam(s)`,
    });
  } catch (err) {
    console.log("Error while deleting exams :=============> ", err.message);
    return res.status(500).json({
      message: `Error while deleting exams :=============> ${err.message}`,
    });
  }
};

exports.deleteQuestion = async (req, res) => {
  const id = req.body.id;
  console.log(
    `---------------- Deleting question ------------------ ${req.body.questionId}`
  );

  try {
    await Exam.updateOne(
      { "questions._id": req.body.questionId },
      { $pull: { questions: { _id: req.body.questionId } } }
    );
    console.log(`Question removed successfully!`);
    return res.status(200).json({
      message: `Question removed successfully!`,
    });
  } catch (err) {
    console.log(`Error while removing question :============> ${err}`);
    return res.status(500).json({
      message: `Error while removing question :============> ${err}`,
    });
  }
};
