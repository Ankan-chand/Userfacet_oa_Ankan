const express = require('express');
const { submitResponse, getSimilarity } = require('../controller/response');
const router = express.Router();


//definig routes
router.route("/submit").post(submitResponse);
router.route("/similarity").get(getSimilarity);

module.exports = router;