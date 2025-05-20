import express from "express";
import { verifyToken } from "../controllers/auth.controller.js";
import {
  createComment,
  deleteComment,
  updateComment,
  isOwner,
  getAllComments,
} from "../controllers/comments.controller.js";

const route = express.Router();

route.get("/", getAllComments);

route.post("/", verifyToken, createComment);

route.patch("/:commentId", verifyToken, isOwner, updateComment);

route.delete("/:commentId", verifyToken, isOwner, deleteComment);

export default route;
