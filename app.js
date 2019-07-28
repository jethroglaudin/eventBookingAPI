const express = require("express");
const bodyParser = require("body-parser");
const chalk = require("chalk");

const app = express();

app.use(bodyParser.json());
app.get('/', (req, res, next) => {
    res.send('Hello World');
})

const PORT = process.env.Port || 3000;
app.listen(PORT, err => {
  if (err) throw err;
  console.log(chalk.blue.inverse(`App currently listening on port ${PORT})`));
});
