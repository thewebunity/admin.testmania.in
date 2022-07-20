const Subject = require("../models/subject");
const Exam = require("../models/exam");
const axios = require("axios");
const { ObjectId } = require("mongodb");
const { getToken } = require("../middleware/authenticate");

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

exports.getSubjects = async (req, res) => {
  console.log(`---------------- Getting subjects ------------------`);
  try {
    let subjects;

    subjects = await Subject.find({}, { _id: 1, name: 1, description: 1 })
      .sort({ name: 1 })
      .lean();

    subjects = transformData(subjects);

    console.log(`Subjects Found! :=========> `, subjects);
    return res.status(200).json({
      message: `Successfully got subjects!`,
      subjects,
    });
  } catch (err) {
    console.log(`Error while getting subjects :========> ${err.message}`);
    return res.status(500).json({ message: `Error while getting subjects ` });
  }
};

exports.getSubject = async (req, res) => {
  try {
    let subject = await Subject.findOne({
      _id: ObjectId(req.params.id),
    }).lean();

    subject = transformData(subject);

    console.log(`Subject Found! :=========> `, subject);

    return res.status(200).json({
      message: `Got subject successfully!`,
      subject,
    });
  } catch (err) {
    console.log(`Error finding subject :=======> ${err.message}`);
    res
      .status(500)
      .json({ message: `Error finding subject :=======> ${err.message} ` });
  }
};

exports.addSubject = async (req, res) => {
  try {
    const subject = await Subject.create({
      name: req.body.name,
      description: req.body.description,
    });

    console.log(`subject added successfully!`, subject);
    return res.status(200).json({
      message: `subject added successfully!`,
      subject: subject,
      id: subject._id,
    });
  } catch (err) {
    console.log(`Error while adding subject :=======> `, err);
    return res.status(500).json({ message: err.message });
  }
};

exports.editSubject = async (req, res) => {
  try {
    await Subject.updateOne(
      { _id: req.body.id },
      {
        name: req.body.name,
        description: req.body.description,
      }
    );

    console.log(`subject updated successfully!`);
    return res.status(200).json({ message: `subject updated successfully!` });
  } catch (err) {
    console.log(`Error while updating subject :============> ${err}`);
    res
      .status(500)
      .json({ message: `Error while updating subject :============> ${err}` });
  }
};

exports.deleteSubject = async (req, res) => {
  const id = req.body.id;
  console.log(`---------------- Deleting subject ------------------ ${id}`);

  try {
    const subject = await Subject.findOne({ _id: id });
    console.log(`subject found :=========> `, subject);
    if (subject.exams.length > 0) {
      return res
        .status(400)
        .json({ message: `Can't delete subject with exams!` });
    }
  } catch (err) {
    console.log(`Error while finding subject :==========> ${err.message}`);
    return res
      .status(500)
      .json({ message: `Error while finding subject. Try again later!` });
  }

  try {
    const response = await Subject.deleteOne({ _id: ObjectId(id) });
    console.log(
      `Successfully deleted ${response.deletedCount} subject(s) with id: ${id}`
    );

    return res.status(200).json({
      message: `Successfully deleted ${response.deletedCount} subject(s)`,
    });
  } catch (err) {
    console.log("Error while deleting subjects :=============> ", err.message);
    return res.status(500).json({
      message: `Error while deleting subjects :=============> ${err.message}`,
    });
  }
};
