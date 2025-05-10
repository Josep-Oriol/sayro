import Tag from "../models/Tag.js";
import Post from "../models/Post.js";

// Obtener todos los tags
export const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });
    res.json(tags);
  } catch (err) {
    console.error("Error al obtener los tags:", err);
    res.status(500).json({ error: "Error al obtener los tags" });
  }
};

// Crear un nuevo tag
export const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ error: "El nombre del tag es obligatorio" });
    }

    const existing = await Tag.findOne({ name: name.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: "El tag ya existe" });
    }

    const newTag = new Tag({ name: name.toLowerCase() });
    await newTag.save();

    res.status(201).json({ message: "Tag creado correctamente", tag: newTag });
  } catch (err) {
    console.error("Error al crear el tag:", err);
    res.status(500).json({ error: "Error al crear el tag" });
  }
};

// Actualizar un tag existente
export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedTag = await Tag.findByIdAndUpdate(
      id,
      { name: name.toLowerCase() },
      { new: true }
    );

    if (!updatedTag) {
      return res.status(404).json({ error: "Tag no encontrado" });
    }

    res.json({ message: "Tag actualizado correctamente", tag: updatedTag });
  } catch (err) {
    console.error("Error al actualizar el tag:", err);
    res.status(500).json({ error: "Error al actualizar el tag" });
  }
};

// Eliminar un tag
export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTag = await Tag.findByIdAndDelete(id);

    if (!deletedTag) {
      return res.status(404).json({ error: "Tag no encontrado" });
    }

    res.json({ message: "Tag eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar el tag:", err);
    res.status(500).json({ error: "Error al eliminar el tag" });
  }
};

// Obtener tags populares
export const getPopularTags = async (req, res) => {
  try {
    const tags = await Post.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "tags",
          localField: "_id",
          foreignField: "_id",
          as: "tag",
        },
      },
      { $unwind: "$tag" },
      {
        $project: {
          _id: 0,
          name: "$tag.name",
        },
      },
    ]);

    res.json(tags);
  } catch (err) {
    console.error("Error al obtener los tags populares:", err);
    res.status(500).json({ error: "Error al obtener los tags populares" });
  }
};
