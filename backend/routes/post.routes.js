import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  recentPosts,
  popularPosts,
} from "../controllers/posts.controller.js";

const route = express.Router();

route.get("/", getAllPosts);

route.get("/recent", recentPosts);

route.get("/popular", popularPosts);

route.get("/:id", getPostById);

route.post("/", createPost);

route.patch("/:id", updatePost);

route.delete("/:id", deletePost);

export default route;
