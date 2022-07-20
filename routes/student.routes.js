const express = require("express");
const { authenticateToken } = require("../middleware/authenticate");
const studentController = require("../controllers/student.controller");

const router = express.Router();

router.get(`/`, authenticateToken, studentController.getStudents);

router.get(`/exams/:id`, authenticateToken, studentController.getStudentExams);

router.get(
  `/:id/current-exam/:examId`,
  authenticateToken,
  studentController.getCurrentExam
);

router.get(`/:id`, authenticateToken, studentController.getStudent);

router.post(`/add`, authenticateToken, studentController.addStudent);

router.put(`/edit`, authenticateToken, studentController.editStudent);

router.delete("/delete", authenticateToken, studentController.deleteStudent);

module.exports = router;
