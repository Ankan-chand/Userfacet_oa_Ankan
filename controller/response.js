const fs = require("fs").promises;
const Response = require("../utils/responseClass");
const { findSimilarity } = require("../utils/similarity");
const ErrorHandler = require("../utils/ErrorHandler");

exports.submitResponse = async (req, res, next) => {
  try {
    const { survey_name, user_name, options } = req.body;

    if (!survey_name || !user_name || !options) {
      return next(new ErrorHandler("Unexpected format", 400));
    }

    //creating the response object
    const data = new Response(survey_name, user_name, options);

    let newResponse = [];
    //reading the response file
    let responseData = await fs.readFile("data/response.json", "utf-8");
    
    if(!responseData.length){
      newResponse.push(data);
      console.log("newResponse");

      //writing the updated array of response
      await fs.writeFile("data/response.json", JSON.stringify(newResponse));
      
      return res.status(200).json({
        success: true,
        message: "Successfully submitted",
      });
      
    }
    
    let responses = JSON.parse(responseData);

    //pushing the response object into existing array of responses
    responses.push(data);

    //writing the updated array of response
    await fs.writeFile("data/response.json", JSON.stringify(responses));

    res.status(200).json({
      success: true,
      message: "Successfully submitted",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

exports.getSimilarity = async (req, res, next) => {
  try {
    let name = req.query.name || null;
    let search = req.query.search || null;
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    search = search ? search.toLowerCase() : null;

    //reading the response file
    let responseData = await fs.readFile("data/response.json", "utf-8");
    responseData = JSON.parse(responseData);

    let similarity = findSimilarity(responseData);

    //if both page and limit are passed create pagination
    if (page && limit) {
      similarity = similarity.slice(startIndex, endIndex);
    }

    //if there is any search text then find the similar users and calculate similarity
    if (search) {
      const candidates = responseData.filter((obj) =>
        search.includes(obj.user_name.toLowerCase())
      );
      const candidates_similarity = findSimilarity(candidates);
      if (candidates_similarity.length) {
        return res.status(200).json({
          success: true,
          candidates_similarity,
        });
      }
      return next(new ErrorHandler("Nothing matched", 404));
    }

    //if there is any name passed calculate the similarity of the candidate with others candidates
    else if (name) {
      const filtered_list = similarity.filter((obj) =>
        Object.keys(obj).includes(name.toLowerCase())
      );
      console.log(filtered_list);

      if (!filtered_list.length) {
        return next(new ErrorHandler("No response found with this name", 404));
      }

      return res.status(200).json({
        success: true,
        filtered_list,
      });
    }

    res.status(200).json({
      success: true,
      similarity,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
