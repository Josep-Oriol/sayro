import Post from "../models/Post.js";
import fs from "fs";

// Obtener todos los posts
export const getAllPosts = async (req, res) => {
  try {
    const { sortBy, q } = req.query;

    const query = {};
    if (q) {
      query.title = { $regex: q, $options: "i" };
    }

    let sort = {};
    if (sortBy === "recent") sort = { createdAt: -1 };
    else if (sortBy === "old") sort = { createdAt: 1 };

    const posts = await Post.find(query)
      .sort(sort)
      .populate("author", "username");
    res.json(posts);
  } catch (err) {
    console.log(`Error al obtener los posts, error: ${err}`);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

// Obtener post por ID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .populate("author")
      .populate("tags")
      .populate("comments");
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.json(post);
  } catch (err) {
    console.log(`Error al obtener el post, error: ${err}`);
    res.status(500).json({ error: "Error al obtener el post" });
  }
};

// Crear un nuevo post
export const createPost = async (req, res) => {
  try {
    const { title, description, content, published } = req.body;
    const tags = JSON.parse(req.body.tags || "[]");
    const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;
    const author = req.user.id;

    const post = new Post({
      title,
      description,
      content,
      published: published === "true",
      tags,
      thumbnail,
      author,
    });

    await post.save();
    res.status(201).json({ message: "Post creado correctamente", post });
  } catch (err) {
    console.log(`Error al crear el post, error: ${err}`);
    res.status(500).json({ error: "Error al crear el post" });
  }
};

// Actualizar un post existente
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, content, published } = req.body;
    const tags = JSON.parse(req.body.tags || "[]");
    const thumbnail = req.file ? `/uploads/${req.file.filename}` : null;
    const author = req.user.id;

    const post = await Post.findByIdAndUpdate(
      id,
      { title, description, content, published, tags, thumbnail, author },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.json({ message: "Post actualizado correctamente", post });
  } catch (err) {
    console.log(`Error al actualizar el post, error: ${err}`);
    res.status(500).json({ error: "Error al actualizar el post" });
  }
};

// Eliminar un post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.json({ message: "Post eliminado correctamente" });
  } catch (err) {
    console.log(`Error al eliminar el post, error: ${err}`);
    res.status(500).json({ error: "Error al eliminar el post" });
  }
};

// Obtener posts por autor
export const getPostsByAuthor = async (req, res) => {
  try {
    const authorId = req.user.id;
    const posts = await Post.find({ author: authorId })
      .populate("author")
      .populate("tags");
    res.json(posts);
  } catch (err) {
    console.log(`Error al obtener los posts, error: ${err}`);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

// Obtener posts por etiqueta
export const getPostsByTag = async (req, res) => {
  try {
    const { tagId } = req.params;
    const posts = await Post.find({ tags: tagId })
      .populate("author")
      .populate("tags");
    res.json(posts);
  } catch (err) {
    console.log(`Error al obtener los posts, error: ${err}`);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

// Obtener los posts más recientes
export const recentPosts = async (req, res) => {
  try {
    const query = req.query.q || "";
    const posts = await Post.find({
      published: true,
      title: { $regex: query, $options: "i" },
    })
      .populate("author")
      .populate("tags")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.log(`Error al obtener los posts, error: ${err}`);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

// Obtener los posts más populares
export const popularPosts = async (req, res) => {
  try {
    const query = req.query.q || "";
    const posts = await Post.find({
      published: true,
      title: { $regex: query, $options: "i" },
    })
      .populate("author")
      .populate("tags")
      .sort({ likes: -1 });
    res.json(posts);
  } catch (err) {
    console.log(`Error al obtener los posts, error: ${err}`);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

export const isAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await Post.findOne({ _id: id, author: userId });

    if (!post) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para editar este post" });
    }

    next();
  } catch (err) {
    console.error(`Error al verificar el autor del post: ${err}`);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
