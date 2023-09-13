const express = require('express');
const app = express();
const dotenv = require("dotenv");
const responseRouter = require("./routes/response");
const surveyRouter = require("./routes/survey");
const errorMiddleware = require("./middlewares/Error");


if(process.env.NODE_ENV !== "production"){
    dotenv.config({path:"configs/config.env"});
}

let port = process.env.PORT || 4000

//middlewares to parse body and url
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//adding prefixes to the routes
app.use("/api/v1", responseRouter);
app.use("/api/v1", surveyRouter);

app.listen(port , () => {
    console.log(`server is running on port ${port}`);
})

app.use(errorMiddleware);