import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(`Error al obtener los usuarios, error: ${err}`);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (err) {
    console.log(`Error al obtener el usuario, error: ${err}`);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(updatedUser);
  } catch (err) {
    console.log(`Error al actualizar el usuario, error: ${err}`);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    console.log(`Error al eliminar el usuario, error: ${err}`);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

/*export const createUser = async (req, res) => {
  try {
    console.log(req.body);
    User.insertOne(req.body);
    res.json({ message: "Usuario creado correctamente" });
  } catch (err) {
    console.log(`Error al crear el usuario, error: ${err}`);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};*/
