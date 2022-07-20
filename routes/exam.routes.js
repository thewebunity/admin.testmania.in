const express = require("express");
const { authenticateToken } = require("../middleware/authenticate");
const examController = require("../controllers/exam.controller");

const router = express.Router();

router.get(`/`, authenticateToken, examController.getExams);

router.get(`/:id`, authenticateToken, examController.getExam);

router.get(
  `/:id/question/:questionId`,
  authenticateToken,
  examController.getQuestion
);

router.post(`/add`, authenticateToken, examController.addExam);

router.post(`/add-question`, authenticateToken, examController.addQuestion);

router.put(`/edit`, authenticateToken, examController.editExam);

router.put(`/edit-question`, authenticateToken, examController.editQuestion);

router.delete("/delete", authenticateToken, examController.deleteExam);

router.delete(
  "/delete-question",
  authenticateToken,
  examController.deleteQuestion
);

module.exports = router;
