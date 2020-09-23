/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable quotes */
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const middlewares = require("./middlewares");
const logs = require("./api/logs");

const app = express();

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.options("*", cors());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.use("/api/logs", logs);

// "not found" middleware
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`listen at http://localhost:${port}`);
});
