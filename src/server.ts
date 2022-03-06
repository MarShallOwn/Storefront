import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import "dotenv/config";

const PORT = process.env.PORT;

const app: express.Application = express();

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});