import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

function Comments({ comments = [], postId }) {
  const [commentText, setCommentText] = useState("");
  const MAX_COMMENT_LENGTH = 500;

  const handleCommentChange = (e) => {
    const text = e.target.value;
    if (text.length <= MAX_COMMENT_LENGTH) {
      setCommentText(text);
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    // Aquí iría la lógica para enviar el comentario al servidor
    console.log("Enviando comentario:", { postId, content: commentText });
    
    // Limpiar el campo después de enviar
    setCommentText("");
  };

  const remainingChars = MAX_COMMENT_LENGTH - commentText.length;

  return (
    <div className="bg-dark-surface rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-xl font-bold mb-6 text-dark-gold">
        Comentarios ({comments?.length || 0})
      </h2>

      {/* Formulario de comentarios - Ahora está encima de la lista */}
      <div className="mb-8 border-b border-dark-border pb-6">
        <h3 className="text-lg font-medium mb-4 text-dark-gold">
          Deja un comentario
        </h3>
        <form onSubmit={handleSubmitComment}>
          <textarea
            className="w-full px-4 py-3 border border-dark-border rounded-lg bg-dark-background text-dark-light focus:ring-2 focus:ring-dark-accent focus:border-dark-accent transition-all"
            rows="4"
            placeholder="Escribe tu comentario..."
            value={commentText}
            onChange={handleCommentChange}
            maxLength={MAX_COMMENT_LENGTH}
          ></textarea>
          <div className="flex justify-between items-center mt-2">
            <span className={`text-sm ${remainingChars < 50 ? 'text-red-400' : 'text-dark-light/70'}`}>
              {remainingChars} caracteres restantes
            </span>
            <button 
              type="submit"
              className="bg-dark-forest text-dark-gold px-6 py-2 rounded-lg hover:bg-dark-forest/80 transition"
              disabled={!commentText.trim()}
            >
              Comentar
            </button>
          </div>
        </form>
      </div>

      {/* Lista de comentarios existentes */}
      {comments && comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="border-b border-dark-border pb-4 last:border-0"
            >
              <div className="flex items-start">
                <div className="w-10 h-10 bg-dark-accent rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  {comment.author?.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <div className="flex items-baseline">
                    <h4 className="font-medium text-dark-gold mr-2">
                      {comment.author?.username || "Usuario"}
                    </h4>
                    <span className="text-xs text-dark-light/50">
                      {comment.createdAt
                        ? format(
                            new Date(comment.createdAt),
                            "d MMM yyyy",
                            { locale: es }
                          )
                        : ""}
                    </span>
                  </div>
                  <p className="text-dark-light mt-1">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-dark-light/70">
            No hay comentarios todavía. ¡Sé el primero en comentar!
          </p>
        </div>
      )}
    </div>
  );
}

export default Comments;