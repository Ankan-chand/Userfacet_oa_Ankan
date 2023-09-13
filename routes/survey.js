const express = require("express");
const { getAllSurveys, createSurvey } = require("../controller/survey");
const router = express.Router();


//defining routes
router.route("/surveys").get(getAllSurveys);
router.route("/create/survey").post(createSurvey);
module.exports = router;