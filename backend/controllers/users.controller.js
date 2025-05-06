import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = User.find();
    res.json(users);
  } catch (err) {
    console.log(`Error al obtener los usuario, error: ${err}`);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

export const createUser = async (req, res) => {
  try {
    console.log(req.body);
    User.insertOne(req.body);
    verifyUser(req.body);
  } catch (err) {
    console.log(`Error al crear el usuario, error: ${err}`);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};
