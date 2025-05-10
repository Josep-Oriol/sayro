import User from "../models/User.js";
import Post from "../models/Post.js";

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

export const getSavedPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("savedPosts");
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (err) {
    console.log(`Error al obtener los posts, error: ${err}`);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

export const getLikedPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("likedPosts");
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(user.likedPosts);
  } catch (err) {
    console.log(`Error al obtener los posts, error: ${err}`);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

export const toggleLikePost = async (req, res) => {
  try {
    const { userId, postId } = req.params;

    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user || !post) {
      return res.status(404).json({ error: "Usuario o post no encontrado" });
    }

    let liked = false;

    if (user.likedPosts.includes(postId)) {
      // Deslikear
      user.likedPosts.pull(postId);
      post.likes = Math.max((post.likes || 1) - 1, 0);
    } else {
      // Like
      user.likedPosts.push(postId);
      post.likes = (post.likes || 0) + 1;
      liked = true;
    }

    await user.save();
    await post.save();

    res.json({
      success: true,
      liked,
      likes: post.likes,
      message: liked
        ? "Post likeado correctamente"
        : "Post deslikeado correctamente",
    });
  } catch (err) {
    console.error(`Error al alternar like del post: ${err}`);
    res.status(500).json({ error: "Error al alternar like del post" });
  }
};

export const savePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    if (!user.savedPosts.includes(postId)) {
      user.savedPosts.push(postId);
      await user.save();
      res.json({ message: "Post guardado correctamente" });
    }
  } catch (err) {
    console.log(`Error al guardar el post, error: ${err}`);
    res.status(500).json({ error: "Error al guardar el post" });
  }
};

export const unsavePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    if (user.savedPosts.includes(postId)) {
      user.savedPosts.pull(postId);
      await user.save();
      res.json({ message: "Post eliminado de guardados correctamente" });
    }
  } catch (err) {
    console.log(`Error al guardar el post, error: ${err}`);
    res.status(500).json({ error: "Error al guardar el post" });
  }
};
