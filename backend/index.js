import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

// Rutas
import usersRouter from "./routes/user.routes.js";
import commentRouter from "./routes/comment.routes.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Funciona /");
});

app.use("/users", usersRouter);
app.use("/comment", commentRouter);
app.use("/", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
