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
  let matchingCount = 0;

  for (let i = 0; i < totalQuestions; i++) {
    if (data1[i].opt_no === data2[i].opt_no) {
      matchingCount++;
    }
  }

  const percentage = (matchingCount / totalQuestions) * 100;

  if (percentage === 100) {
    return "100% similar";
  } else if (percentage > 75) {
    return "similarity is very high";
  } else if (percentage > 50) {
    return "not very similar";
  } else {
    return "dissimilar";
  }
}



// const a = findSimilarity([{
//     "survey_name": "survey1",
//     "user_name": "john",
//     "options": [
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 5 },
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 2 },
//       { "ques_no": 1, "opt_no": 8 },
//       { "ques_no": 1, "opt_no": 3 },
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 1 },
//       { "ques_no": 1, "opt_no": 5 },
//       { "ques_no": 1, "opt_no": 4 },
//       { "ques_no": 1, "opt_no": 6 },
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 3 },
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 4 },
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 2 }
//     ]
//   },{
//     "survey_name": "survey1",
//     "user_name": "johns",
//     "options": [
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 5 },
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 3 },
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 8 },
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 10 },
//       { "ques_no": 1, "opt_no": 1 },
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 9},
//       { "ques_no": 1, "opt_no": 5 },
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 2 },
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 4 },
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 7 },
//       { "ques_no": 1, "opt_no": 2 }
//     ]
//   }
//   ])

//   console.log(a);