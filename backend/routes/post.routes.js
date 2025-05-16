import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  recentPosts,
  popularPosts,
  getPostsByAuthor,
  isAuthor,
} from "../controllers/posts.controller.js";

import { verifyToken } from "../controllers/auth.controller.js";

const route = express.Router();

// Conf imagenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Rutas de posts /api/posts
route.get("/", getAllPosts);
route.get("/recent", recentPosts);
route.get("/popular", popularPosts);
route.get("/:id", getPostById);

// Ruta para obtener los posts de un usuario
route.get("/profile/my-posts/", verifyToken, getPostsByAuthor);

// Ruta para crear un post con imagen
route.post("/", verifyToken, upload.single("thumbnail"), createPost);

route.patch("/:id", verifyToken, updatePost);
route.delete("/:id", verifyToken, isAuthor, deletePost);

export default route;
