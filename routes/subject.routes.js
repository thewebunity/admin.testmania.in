const express = require("express");
const { authenticateToken } = require("../middleware/authenticate");
const subjectController = require("../controllers/subject.controller");

const router = express.Router();

router.get(`/`, authenticateToken, subjectController.getSubjects);

router.get(`/:id`, authenticateToken, subjectController.getSubject);

router.post(`/add`, authenticateToken, subjectController.addSubject);

router.put(`/edit`, authenticateToken, subjectController.editSubject);

router.delete("/delete", authenticateToken, subjectController.deleteSubject);

module.exports = router;
