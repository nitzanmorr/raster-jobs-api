import express from "express";
import { testDbConnection } from "./src/configs/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.APP_PORT;

app.get("/", (req, res) => {
  testDbConnection();
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app;
