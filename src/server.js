import "dotenv/config";
import express from "express";
import { dbConnect } from "./db/dbConnection.js";

const app = express();
const port = process.env.PORT || 3000;

dbConnect().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

app.use(express.json());

app.get("/", (req, res) => res.send("hello"));
