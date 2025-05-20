import { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { web } from "../utils/routes.js";
import { toast } from "react-toastify";
import { Pencil, Trash2, Save } from "lucide-react";

function Comments({ comments = [], postId, user }) {
  const MAX_COMMENT_LENGTH = 500;
  const COMMENTS_PER_PAGE = 5;

  const [commentText, setCommentText] = useState("");
  const [localComments, setLocalComments] = useState(comments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [visibleCount, setVisibleCount] = useState(COMMENTS_PER_PAGE);

  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const handleCommentChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_COMMENT_LENGTH) {
      setCommentText(text);
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);

    fetch(`${web}/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ postId, content: commentText }),
    })
      .then((res) => {
        if (!res.ok) {
          toast.error("Debes iniciar sesión para comentar");
          throw new Error("No se pudo crear el comentario");
        }
        return res.json();
      })
      .then((data) => {
        toast.success(data.message);
        const newComment = {
          content: commentText,
          createdAt: new Date().toISOString(),
          authorName: user.username,
          author: user._id,
          _id: data.commentId || Date.now(),
        };
        setLocalComments((prev) => [newComment, ...prev]);
        setCommentText("");
        setVisibleCount((prev) => prev + 1);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setIsSubmitting(false));
  };

  const handleEdit = (index, content) => {
    setEditingIndex(index);
    setEditedContent(content);
  };

  const handleSaveEdit = (commentId) => {
    if (!editedContent.trim()) return;

    fetch(`${web}/api/comments/${commentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ commentId, content: editedContent }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo editar el comentario");
        return res.json();
      })
      .then(() => {
        setLocalComments((prev) =>
          prev.map((c, i) =>
            i === editingIndex ? { ...c, content: editedContent } : c
          )
        );
        toast.success("Comentario actualizado");
        setEditingIndex(null);
        setEditedContent("");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleDelete = (commentId) => {
    if (!window.confirm("¿Eliminar este comentario?")) return;

    fetch(`${web}/api/comments/${commentId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo eliminar el comentario");
        return res.json();
      })
      .then(() => {
        setLocalComments((prev) => prev.filter((c) => c._id !== commentId));
        toast.success("Comentario eliminado");
        setVisibleCount((prev) => Math.max(prev - 1, COMMENTS_PER_PAGE));
      })
      .catch((err) => toast.error(err.message));
  };

  const remainingChars = MAX_COMMENT_LENGTH - commentText.length;

  return (
    <div className="bg-[#1E1E1E] rounded-2xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-[#4ADE80]">
        Comentarios ({localComments.length})
      </h2>

      {/* Formulario */}
      <div className="mb-10 border-b border-[#2D2D2D] pb-6">
        <h3 className="text-lg font-semibold mb-4 text-[#A0A0A0]">
          Deja tu opinión
        </h3>
        <form onSubmit={handleSubmitComment}>
          <textarea
            className="w-full px-4 py-3 border border-[#2D2D2D] rounded-xl bg-[#121212] text-[#F5F5F5] placeholder:text-[#A0A0A0]/50 focus:ring-2 focus:ring-[#4ADE80] focus:border-[#4ADE80] transition-all"
            rows="4"
            placeholder="Escribe tu comentario..."
            value={commentText}
            onChange={handleCommentChange}
            maxLength={MAX_COMMENT_LENGTH}
          ></textarea>
          <div className="flex justify-between items-center mt-2">
            <span
              className={`text-sm ${
                remainingChars < 50 ? "text-red-400" : "text-[#A0A0A0]"
              }`}
            >
              {remainingChars} caracteres restantes
            </span>
            <button
              type="submit"
              className={`px-6 py-2 rounded-xl transition font-medium flex items-center justify-center gap-2 ${
                commentText.trim()
                  ? "bg-[#1B3B2F] text-[#4ADE80] hover:bg-[#1B3B2F]/80"
                  : "bg-[#2D2D2D] text-[#A0A0A0] cursor-not-allowed"
              }`}
              disabled={!commentText.trim() || isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Comentar"}
            </button>
          </div>
        </form>
      </div>

      {/* Lista de comentarios */}
      {localComments.length > 0 ? (
        <>
          <div className="space-y-6">
            {localComments.slice(0, visibleCount).map((comment, index) => {
              const isOwn = user && comment.authorName === user.username;
              const isEditing = editingIndex === index;

              return (
                <div
                  key={comment._id || index}
                  className={`flex items-start gap-4 border-b border-[#2D2D2D] pb-6 last:border-0 ${
                    isOwn ? "bg-[#1B3B2F]/10 rounded-lg px-2 py-2" : ""
                  }`}
                >
                  <div className="flex-shrink-0 w-11 h-11 bg-[#1E2A38] text-[#1E1E1E] rounded-full flex items-center justify-center text-lg font-bold uppercase">
                    {comment.authorName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mb-1">
                      <h4 className="font-semibold text-[#4ADE80]">
                        {isOwn ? "Tú" : comment.authorName || "Usuario"}
                      </h4>
                      <span className="text-xs text-[#A0A0A0]/70">
                        {comment.createdAt
                          ? format(new Date(comment.createdAt), "d MMM yyyy", {
                              locale: es,
                            })
                          : ""}
                      </span>
                    </div>
                    {isEditing ? (
                      <>
                        <textarea
                          className="w-full px-4 py-2 mt-1 mb-2 rounded-lg bg-[#121212] border border-[#2D2D2D] text-[#F5F5F5]"
                          rows="3"
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <button
                          onClick={() => handleSaveEdit(comment._id)}
                          disabled={editedContent === comment.content}
                          className={`flex items-center gap-2 px-4 py-1 rounded-lg text-sm transition ${
                            editedContent !== comment.content
                              ? "bg-[#4ADE80] text-[#1E1E1E] hover:bg-[#4ADE80]/90"
                              : "bg-[#2D2D2D] text-[#A0A0A0] cursor-not-allowed"
                          }`}
                        >
                          <Save size={16} />
                          Guardar
                        </button>
                      </>
                    ) : (
                      <p className="text-[#A0A0A0] mt-1">{comment.content}</p>
                    )}
                  </div>

                  {isOwn && !isEditing && (
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => handleEdit(index, comment.content)}
                        className="text-[#A0A0A0] hover:text-[#4ADE80]"
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(comment._id)}
                        className="text-red-500 hover:text-red-400"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {visibleCount < localComments.length && (
            <div className="text-center mt-6">
              <button
                onClick={() =>
                  setVisibleCount((prev) => prev + COMMENTS_PER_PAGE)
                }
                className="px-4 py-2 bg-[#121212] text-[#4ADE80] border border-[#2D2D2D] rounded-lg hover:bg-[#121212]/80 transition"
              >
                Ver más comentarios
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-[#A0A0A0]/60 italic">
            No hay comentarios todavía. ¡Sé el primero en comentar!
          </p>
        </div>
      )}
    </div>
  );
}

export default Comments;
