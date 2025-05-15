import { Link } from "react-router-dom";
import { Heart, ThumbsUp, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { web } from "../utils/routes";

function CardPost({ post }) {
  const { user } = useAuth();
  const userId = user?._id;

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);

  useEffect(() => {
    if (user?.likedPosts?.some((likedPostId) => likedPostId === post._id)) {
      setIsLiked(true);
    }
  }, [user?.likedPosts, post._id]);

  const handleLiked = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      toast.error("Debes iniciar sesión para dar like");
      return;
    }

    fetch(`${web}/api/users/${userId}/like/${post._id}`, {
      method: "PATCH",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsLiked(data.liked);
          setLikesCount(data.likes);
          toast.success(data.message);
        }
      })
      .catch((err) => {
        console.error("Error al alternar like:", err);
      });
  };

  return (
    <div className="bg-dark-surface rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
      <Link
        to={`/view-post/${post._id}`}
        className="block flex-grow flex flex-col"
      >
        {/* Imagen del post */}
        <div className="relative">
          {post.thumbnail && (
            <img
              src={`${web}${post.thumbnail}`}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
          )}
        </div>

        <div className="p-5 flex-grow flex flex-col">
          {/* Autor */}
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-dark-accent rounded-full flex items-center justify-center mr-2">
              {post.author?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <p className="text-dark-light text-sm font-medium">
              {post.author?.username || "Usuario"}
            </p>
          </div>

          {/* Contenido */}
          <h2 className="text-xl font-bold mb-2 text-dark-gold line-clamp-2">
            {post.title}
          </h2>
          <p className="text-dark-light/80 mb-4 line-clamp-3 flex-grow">
            {post.description}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-dark-forest text-dark-gold rounded-full"
                >
                  {tag.name}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs px-2 py-1 bg-dark-background text-dark-light/70 rounded-full">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Interacciones */}
          <div className="flex items-center pt-3 border-t border-dark-border">
            <div className="flex items-center space-x-4">
              {/* Like */}
              <button
                onClick={handleLiked}
                className="flex items-center space-x-1 text-dark-light/80 hover:text-dark-gold"
              >
                <ThumbsUp
                  size={18}
                  className={isLiked ? "text-dark-gold" : ""}
                  fill={isLiked ? "currentColor" : "none"}
                />
                <span className="text-sm">{likesCount}</span>
              </button>

              {/* Comentarios (opcional) */}
              <div className="flex items-center space-x-1 text-dark-light/80">
                <MessageCircle size={18} />
                <span className="text-sm">{post.comments?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardPost;
