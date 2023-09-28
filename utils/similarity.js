exports.findSimilarity = (surveydata) => {
  const response = [];

  for (let i = 0; i < surveydata.length; i++) {
    let result = {};
    result[surveydata[i].user_name] = {};

    for (let j = 0; j < surveydata.length; j++) {
      if (i !== j) {
        const similarity = calculateSimilarity(
          surveydata[i].options,
          surveydata[j].options
        );
        result[surveydata[i].user_name][surveydata[j].user_name] = similarity;
      }
    }

    response.push(result);
  }

  return response;

}

const calculateSimilarity = (data1, data2) => {
  const totalQuestions = data1.length;
  let counter = 0;
  let similarity = 0;
  for (let i = 0; i < totalQuestions; i++) {

    if(data1[i].opt_no === "" || data2[i].opt_no === "")
      continue;

    similarity += (Math.abs(data1[i].opt_no - data2[i].opt_no))*10; 
    counter++;

  }

  const percentage = similarity / counter;

  if (percentage === 0) {
    return "100% similar";
  } else if (percentage < 25) {
    return "similarity is very high";
  } else if (percentage < 50) {
    return "not very similar";
  } else {
    return "dissimilar";
  }
}