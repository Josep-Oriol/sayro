import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs/promises";

import {
  registerEmail,
  sendResetPasswordEmail,
} from "../controllers/email.controller.js";

export const register = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    email = email.toLowerCase();

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Python registerEmail
    try {
      await registerEmail(email, username);
    } catch (err) {
      console.warn("No se pudo enviar el correo de bienvenida:", err.message);
    }

    return res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.status(200).json({ message: "Login correcto" });
  } catch (err) {
    console.error("Error en login:", err);
    return res.status(500).json({ message: "Error del servidor" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout correcto" });
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No logeado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "No autorizado" });
  }
};

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email requerido" });

  try {
    await sendResetPasswordEmail(email);
    return res.status(200).json({ message: "Código de recuperación enviado" });
  } catch (err) {
    console.error("Error al enviar código:", err);
    return res.status(500).json({ message: "Error al enviar correo" });
  }
};

export const verifyResetCode = async (req, res) => {
  const { email, code, password } = req.body;
  if (!email || !code || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    const file = await fs.readFile("reset_codes.txt", "utf-8");
    const lines = file.split("\n").filter(Boolean);

    const normalizedCode = `${email}:${code}`.toLowerCase();

    const match = lines.find(
      (line) => line.trim().toLowerCase() === normalizedCode
    );

    if (!match) {
      return res.status(400).json({ message: "Código inválido" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const newLines = lines.filter((line) => line !== match).join("\n");
    await fs.writeFile("reset_codes.txt", newLines);

    res.status(200).json({ message: "Contraseña restablecida" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Error al verificar código" });
  }
};
