require("dotenv").config();
const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");

const indexRouter = require("./routes");

const app = express();
const port = parseInt(process.env.PORT) || 8000;

/* Middlewares */
app.use(express.json());
app.use(logger("dev"));

/* Routing */
app.use(indexRouter);

/* Invalid Route Error Handling */
app.use((req, res, next) => {
  next(createError.NotFound("Resource not found!"));
});

/* Main Error Handler */
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  return res.status(status).json({ message, status });
});

app.listen(port, () => {
  console.log(`Server is up and running at ${port}`);
});
