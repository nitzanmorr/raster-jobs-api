const express = require("express");
const { testDbConnection, sequelize } = require("./src/configs/db");
require("dotenv").config();
const router = require("./src/routes/routes");

const app = express();
const port = process.env.APP_PORT;
app.use(router);

app.get("/", (req, res) => {
  testDbConnection();
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
