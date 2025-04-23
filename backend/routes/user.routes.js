import express from "express";

const route = express.Router();

route.get("/", (req, res) => {
  res.send("router get users");
});

route.get("/:id", (req, res) => {
  res.send(`router get user ${req.id}`);
});

route.post("/", (req, res) => {
  res.send("router post users");
});

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
