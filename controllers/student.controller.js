const Student = require("../models/student");
const studentAuth = require("../middleware/firebaseConfig").studentAuth;

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

exports.getStudents = async (req, res) => {
  console.log(`---------------- Getting students ------------------`);
  try {
    let students;

    students = await Student.find({}).sort({ createdAt: -1 }).lean();

    students = transformData(students);

    console.log(`Students Found! :=========> `, students);
    return res.status(200).json({
      message: `Successfully got students!`,
      students: students,
    });
  } catch (err) {
    console.log(`Error while getting students :========> ${err.message}`);
    return res.status(500).json({ message: `Error while getting students ` });
  }
};

exports.getStudent = async (req, res) => {
  try {
    let student = await Student.findOne({
      _id: req.params.id,
    }).lean();

    student = transformData(student);

    console.log(`Student Found! :=========> `, student);

    return res.status(200).json({
      message: `Got student successfully!`,
      student,
    });
  } catch (err) {
    console.log(`Error finding student :=======> ${err.message}`);
    res
      .status(500)
      .json({ message: `Error finding student :=======> ${err.message} ` });
  }
};

exports.getStudentExams = async (req, res) => {
  console.log(`---------------- Getting student exams ------------------`);
  try {
    const student = await Student.findOne({
      _id: req.params.id,
    }).lean();

    console.log(`Student Found! :=========> `, student);
    let exams = student.exams;

    console.log("exams", exams);
    if (exams.length > 0) {
      exams = transformData(exams);
    }

    exams = exams.sort((a, b) => b.submittedAt - a.submittedAt);

    return res.status(200).json({
      message: `Successfully got exams!`,
      exams,
    });
  } catch (err) {
    console.log(`Error while getting exams :========> ${err.message}`);
    return res.status(500).json({ message: `Error while getting exams ` });
  }
};

exports.getCurrentExam = async (req, res) => {
  const { id, examId } = req.params;

  try {
    const student = await Student.findOne({
      _id: id,
    }).lean();

    const exam = student.exams.find((i) => i._id == examId);

    console.log(`Current exam found! :=========> `, exam);

    return res.status(200).json({
      message: `Got current exam successfully!`,
      exam,
    });
  } catch (err) {
    console.log(`Error finding current exam :=======> ${err.message}`);
    res.status(500).json({
      message: `Error finding current exam :=======> ${err.message} `,
    });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { name, password, email, phone, dob, gender ,school } = req.body;

    if (!name || !password || !email) {
      return res.status(400).send({ message: "Missing fields" });
    }

    const { uid } = await studentAuth.createUser({
      displayName: name,
      password,
      email,
    });

    try {
      const student = await Student.create({
        _id: uid,
        name,
        email,
        phone,
        dob,
        school,
        gender,
      });

      console.log("Student created successfully!", student);
      return res.status(200).json({ message: "User added successfully!" });
    } catch (err) {
      console.log("here one");
      return res.status(500).json({ message: err.message });
    }
  } catch (err) {
    console.log("here 2");
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
  }
};

exports.editStudent = async (req, res) => {
  console.log("Editing student");
  console.log(req.body.password, req.body.email);
  if (req.body.password) {
    console.log("Changing password");
    try {
      await studentAuth.updateUser(req.body.id, {
        password: req.body.password,
      });
      console.log(`Successfully changed password`);
    } catch (err) {
      console.log("Error while changing password :=======> ", err.message);
      return res.status(500).json({
        message: `Error while changing password :=======> ${err.message}`,
      });
    }
  }

  try {
    await Student.updateOne(
      { _id: req.body.id },
      {
        name: req.body.name,
        phone: req.body.phone,
        gender: req.body.gender,
        school: req.body.school,
        email: req.body.email,
        dob: req.body.dob,
      }
    );

    console.log(`Student updated successfully!`);
    return res.status(200).json({ message: `Student updated successfully!` });
  } catch (err) {
    console.log(`Error while updating student :============> ${err}`);
    res
      .status(500)
      .json({ message: `Error while updating student :============> ${err}` });
  }
};

exports.deleteStudent = async (req, res) => {
  const selected = req.body.selected;

  try {
    const response = await Student.deleteMany({ _id: { $in: selected } });
    console.log(
      `Successfully deleted ${response.deletedCount} out of ${selected.length}`
    );

    return res.status(200).json({
      message: `Successfully deleted ${response.deletedCount} out of ${selected.length}`,
    });
  } catch (err) {
    console.log("Error while deleting students :=============> ", err.message);
    return res.status(500).json({
      message: `Error while deleting students :=============> ${err.message}`,
    });
  }
};
