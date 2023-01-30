require('dotenv').config();
const express = require('express');
const indexRouter = require('./routes');

const app = express();
const port = parseInt(process.env.PORT) || 8000;

app.use(express.json());


app.get('/', (req, res, next) => {
  res.send('Hello');
});

app.use(indexRouter);

app.listen(port, () => {
  console.log(`Server is up and running at ${port}`);
});