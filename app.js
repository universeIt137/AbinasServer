const express = require('express');
let json = require("express").json;
let cors = require("cors");
let mongoose = require("mongoose");
let rootRouter = require("./routes/index.js"); //working on this
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
const globalErrorHandler = require("./middleware/globalErrorHandler.js"); // done
const httpStatus = require('http-status');
const errorResponse = require("./utils/errorResnponse.js"); //done



// Middlewares 
let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use(cookieParser());
app.use(express.static('images'));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:3000/api/v1",
      "http://localhost:5000",
    ],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use("/api/v1", rootRouter);

app.get("/", function (req, res) {
  res.send("Server is working");
});



app.all("*", function (req, res) {
  res
    .status(httpStatus.NOT_FOUND)
    .json(errorResponse(httpStatus.NOT_FOUND, "failed", "api not found"));
});

app.use(globalErrorHandler);

module.exports = app;
