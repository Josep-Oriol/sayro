import Post from "../models/Post.js";
import fs from "fs";

// Obtener todos los posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
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
    const post = await Post.findById(id).populate("author").populate("tags");
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
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.json(post);
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
    const { authorId } = req.params;
    const posts = await Post.find({ author: authorId });
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
    const posts = await Post.find({ tags: tagId });
    res.json(posts);
  } catch (err) {
    console.log(`Error al obtener los posts, error: ${err}`);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

// Obtener los posts más recientes
export const recentPosts = async (req, res) => {
  try {
    const posts = await Post.find({ published: true })
      .populate("author")
      .populate("tags")
      .sort({ createdAt: -1 })
      .limit(8);
    res.json(posts);
  } catch (err) {
    console.log(`Error al obtener los posts, error: ${err}`);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

// Obtener los posts más populares
export const popularPosts = async (req, res) => {
  try {
    const posts = await Post.find({ published: true })
      .populate("author")
      .sort({ likes: -1 })
      .limit(8);
    res.json(posts);
  } catch (err) {
    console.log(`Error al obtener los posts, error: ${err}`);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};
