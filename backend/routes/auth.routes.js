import express from "express";

const route = express.Router();

route.post("/login", (req, res) => {
  res.send(`login data: ${req}`);
});

route.post("/register", (req, res) => {
  res.send(`register data data: ${req}`);
});

export default route;
