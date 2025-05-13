import express from "express";
import {
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/auth.controller.js";

import User from "../models/User.js";

const route = express.Router();

route.post("/login", login);

route.post("/register", register);

route.post("/logout", logout);

route.get("/user", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("_id username email");
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
});

export default route;
