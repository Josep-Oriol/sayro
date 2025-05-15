import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/db.js";

// Rutas
import usersRouter from "./routes/user.routes.js";
import commentRouter from "./routes/comment.routes.js";
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import tagRouter from "./routes/tag.routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Conectar a la base de datos
connectDB();

// Archivos estaticos
app.use("/uploads", express.static("uploads"));

// Ruta raíz simple
app.get("/", (req, res) => {
  res.send("Funciona /");
});

// Rutas de la app
app.use("/api/users", usersRouter);
app.use("/api/posts", postRouter);
app.use("/api/tags", tagRouter);
app.use("/api/comments", commentRouter);
app.use("/api/auth", authRouter);

// Server on port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
