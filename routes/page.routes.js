const express = require("express");
const { authenticateToken } = require("../middleware/authenticate");
const pageController = require("../controllers/page");


const router = express.Router();



router.get(`/page/:id`, pageController.getPage);
router.get(`/all`, pageController.getPages);
router.put(`/edit`, pageController.editPage);
router.get('/logo' ,pageController.getLogo);



module.exports = router;
