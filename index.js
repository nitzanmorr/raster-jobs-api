const express = require("express");
const { testDbConnection, sequelize } = require("./src/configs/db");
require("dotenv").config();
const router = require("./src/routes/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

const app = express();
const port = process.env.APP_PORT;
app.use(router);
app.use("/docs/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
