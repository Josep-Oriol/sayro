import express from "express";

const route = express.Router();

route.get("/", (req, res) => {
  res.send("router get comments");
});

route.get("/:id", (req, res) => {
  res.send(`router get comment ${req.id}`);
});

route.post("/", (req, res) => {
  res.send("router post comment");
});

route.patch("/:id", (req, res) => {
  res.send(`router patch comment ${req.id}`);
});

route.put("/:id", (req, res) => {
  res.send(`router put comment ${req.id}`);
});

route.delete("/:id", (req, res) => {
  res.send(`router delete comment ${req.id}`);
});

export default route;
