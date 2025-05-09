import Post from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.log(`Error al obtener los posts, error: ${err}`);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author");
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.json(post);
  } catch (err) {
    console.log(`Error al obtener el post, error: ${err}`);
    res.status(500).json({ error: "Error al obtener el post" });
  }
};

export const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.json({ message: "Post creado correctamente" });
  } catch (err) {
    console.log(`Error al crear el post, error: ${err}`);
    res.status(500).json({ error: "Error al crear el post" });
  }
};

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

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.json(post);
  } catch (err) {
    console.log(`Error al dar like al post, error: ${err}`);
    res.status(500).json({ error: "Error al dar like al post" });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { likes: -1 } },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post no encontrado" });
    }
    res.json(post);
  } catch (err) {
    console.log(`Error al quitar like al post, error: ${err}`);
    res.status(500).json({ error: "Error al quitar like al post" });
  }
};

export const recentPosts = async (req, res) => {
  try {
    const posts = await Post.find({ published: true })
      .populate("author")
      .sort({ createdAt: -1 })
      .limit(8);
    res.json(posts);
  } catch (err) {
    console.log(`Error al obtener los posts, error: ${err}`);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};
