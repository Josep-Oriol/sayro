import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  recentPosts,
} from "../controllers/posts.controller.js";

const route = express.Router();

route.get("/", getAllPosts);

route.get("/recent", recentPosts);

route.get("/:id", getPostById);

route.post("/", createPost);

route.patch("/:id", updatePost);

route.delete("/:id", deletePost);

route.patch("/:id/like", likePost);

route.patch("/:id/unlike", unlikePost);

export default route;
