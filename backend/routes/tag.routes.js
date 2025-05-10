import express from "express";
import {
  getAllTags,
  createTag,
  updateTag,
  deleteTag,
  getPopularTags,
} from "../controllers/tags.controller.js";

const route = express.Router();

route.get("/", getAllTags);

route.post("/", createTag);

route.put("/:id", updateTag);

route.delete("/:id", deleteTag);

route.get("/popular", getPopularTags);

export default route;
