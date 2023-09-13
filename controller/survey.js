const fs = require("fs").promises;
const Survey = require("../utils/surveyClass");
const ErrorHandler = require("../utils/ErrorHandler");

exports.getAllSurveys = async (req, res, next) => {
  try {
    // reading the survey file
    const surveyData = await fs.readFile("data/survey.json", "utf-8");
    const surveys = JSON.parse(surveyData);

    res.status(200).json({
      success: true,
      surveys,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.createSurvey = async (req, res, next) => {
  try {
    const { survey_name, questions } = req.body;
    if (!survey_name || !questions) {
      return next(new ErrorHandler("Unexpected format", 400));
    }

    //reading the survey file
    const surveyData = await fs.readFile("data/survey.json", "utf-8");
    const surveys = JSON.parse(surveyData);

    //checks if there is any survey already with same name
    const isExists = surveys.reduce(
      (result, obj) => result || obj.survey_name === survey_name,
      false
    );

    if (isExists) {
      return next(new ErrorHandler("The name is already exists", 400));
    }

    //creating the survey object and pushing into the existing array
    const survey = new Survey(survey_name, questions);
    surveys.push(survey);

    //writing the updated survey list
    await fs.writeFile("data/survey.json", JSON.stringify(surveys));

    res.status(200).json({
      success: true,
      message: "successfully created",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
