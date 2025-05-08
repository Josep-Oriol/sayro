import express from "express";
import { getAllUsers } from "../controllers/users.controller.js";

const route = express.Router();

route.get("/", getAllUsers);

route.get("/:id", (req, res) => {
  res.send(`router get user ${req.id}`);
});

//route.post("/", createUser);

route.patch("/:id", (req, res) => {
  res.send(`router patch user ${req.id}`);
});

route.put("/:id", (req, res) => {
  res.send(`router put user ${req.id}`);
});

route.delete("/:id", (req, res) => {
  res.send(`router delete users ${req.id}`);
});

export default route;
