import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

export const getAllComments = async (req, res) => {
  try {
    const { q, sortBy } = req.query;

    const query = {};

    if (q) {
      query.content = { $regex: q, $options: "i" };
    }

    let sort = {};
    if (sortBy === "recent") {
      sort = { createdAt: -1 };
    } else if (sortBy === "old") {
      sort = { createdAt: 1 };
    }

    const comments = await Comment.find(query)
      .sort(sort)
      .populate("author", "username")
      .populate("post", "title");

    res.json(comments);
  } catch (err) {
    console.error(`Error al obtener los comentarios, error: ${err}`);
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
};

export const createComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const username = req.user.username;
    const { postId, content } = req.body;

    const comment = new Comment({
      content,
      author: userId,
      post: postId,
      authorName: username,
    });

    await comment.save();

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment._id },
    });

    res.status(201).json({
      success: true,
      message: "Comentario creado exitosamente",
      commentario: comment,
    });
  } catch (err) {
    console.log(`Error al crear el comentario, error: ${err}`);
    res.status(500).json({ error: "Error al crear el comentario" });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId, content } = req.body;
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      { content, edited: true },
      { new: true }
    );
    if (!comment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }
    res.json({
      success: true,
      message: "Comentario actualizado exitosamente",
      commentario: comment,
    });
  } catch (err) {
    console.log(`Error al actualizar el comentario, error: ${err}`);
    res.status(500).json({ error: "Error al actualizar el comentario" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }
    res.json({
      success: true,
      message: "Comentario eliminado exitosamente",
    });
  } catch (err) {
    console.log(`Error al eliminar el comentario, error: ${err}`);
    res.status(500).json({ error: "Error al eliminar el comentario" });
  }
};

export const isOwner = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { commentId } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    if (comment.author.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para editar este comentario" });
    }

    next();
  } catch (err) {
    console.log(`Error al verificar el autor del comentario, error: ${err}`);
    res
      .status(500)
      .json({ error: "Error al verificar el autor del comentario" });
  }
};
