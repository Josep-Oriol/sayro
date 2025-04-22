import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.get("/users", (req, res) => {
  res.send("Funciona /");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
