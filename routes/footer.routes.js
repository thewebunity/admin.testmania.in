const express = require("express");

const footerController = require("../controllers/footer");

const router = express.Router();



router.get(`/get`, footerController.getFooter);
router.put(`/edit`, footerController.editFooter);



module.exports = router;
