import Nav from "../components/Nav.jsx";
import Comments from "../components/Comments.jsx";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ThumbsUp, MessageCircle, Calendar, User, Tag } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "../context/AuthContext";
import { es } from "date-fns/locale";
import EditPostBtn from "../components/utils/EditPostBtn";
import { web } from "../utils/routes.js";
import { toast } from "react-toastify";

function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const { user } = useAuth();
  const [likesCount, setLikesCount] = useState(0);
  const commentsRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${web}/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el post");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLikesCount(data.likes || 0);
        setIsOwner(data.author._id === user?._id);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  const handleLike = () => {
    if (!user) {
      toast.error("Debes iniciar sesión para dar like");
      return;
    }

    setIsLiked(!isLiked);

    fetch(`${web}/api/users/${user._id}/like/${post._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo alternar like");
        return res.json();
      })
      .then((data) => {
        setIsLiked(data.liked);
        setLikesCount(data.likes);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  };

  const handleScrollToComments = () => {
    if (commentsRef.current) {
      commentsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (isLoading) {
    return (
      <>
        <Nav />
        <div className="container mx-auto py-8 px-4">
          <div className="bg-dark-surface p-8 rounded-lg shadow-lg animate-pulse">
            <div className="h-64 bg-dark-background rounded-lg mb-6"></div>
            <div className="h-8 bg-dark-background rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-dark-background rounded w-1/2 mb-6"></div>
            <div className="h-32 bg-dark-background rounded mb-6"></div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Nav />
        <div className="container mx-auto py-8 px-4">
          <div className="bg-dark-surface p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
            <p className="text-dark-light mb-6">{error}</p>
            <Link
              to="/"
              className="bg-dark-forest text-dark-gold px-6 py-2 rounded-lg hover:bg-dark-forest/80 transition"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Nav />
        <div className="container mx-auto py-8 px-4">
          <div className="bg-dark-surface p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-dark-gold mb-4">
              Post no encontrado
            </h2>
            <p className="text-dark-light mb-6">
              El post que buscas no existe o ha sido eliminado.
            </p>
            <Link
              to="/"
              className="bg-dark-forest text-dark-gold px-6 py-2 rounded-lg hover:bg-dark-forest/80 transition"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </>
    );
  }

  const formattedDate = post.createdAt
    ? format(new Date(post.createdAt), "d 'de' MMMM 'de' yyyy", { locale: es })
    : "Fecha desconocida";

  return (
    <>
      <Nav />
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <div className="bg-dark-surface rounded-lg shadow-lg overflow-hidden mb-8">
          {post.thumbnail && (
            <div className="relative w-full h-80 overflow-hidden">
              <img
                src={`${web}${post.thumbnail}`}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent" />
            </div>
          )}

          <div className="p-6 md:p-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-dark-gold mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm mb-6">
              <span className="flex items-center bg-dark-background px-3 py-1 rounded-full text-dark-light/70">
                <Calendar size={16} className="mr-1" /> {formattedDate}
              </span>
              <span className="flex items-center bg-dark-background px-3 py-1 rounded-full text-dark-light/70">
                <User size={16} className="mr-1" /> {post.author.username}
              </span>
              <span className="flex items-center bg-dark-background px-3 py-1 rounded-full text-dark-light/70">
                <ThumbsUp size={16} className="mr-1" /> {likesCount} likes
              </span>
              <span className="flex items-center bg-dark-background px-3 py-1 rounded-full text-dark-light/70">
                <MessageCircle size={16} className="mr-1" />{" "}
                {post.comments?.length || 0} comentarios
              </span>
            </div>

            <p className="text-lg text-dark-light/90 italic border-l-4 border-dark-gold pl-4 mb-6">
              {post.description}
            </p>

            {post.tags && post.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-dark-light/70 mb-2 flex items-center">
                  <Tag size={16} className="mr-1" />
                  Etiquetas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-dark-forest text-dark-gold text-sm rounded-full"
                    >
                      {tag.name || tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4 border-t border-dark-border mt-6">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-5 py-2 rounded-full border transition${
                  isLiked
                    ? "bg-dark-gold/10 text-dark-gold border-dark-gold"
                    : "text-dark-light hover:bg-dark-background border-dark-border"
                }`}
              >
                <ThumbsUp size={20} fill={isLiked ? "currentColor" : "none"} />
                <span>{likesCount} Me gusta</span>
              </button>

              <button
                onClick={handleScrollToComments}
                className="flex items-center gap-2 px-5 py-2 rounded-full border text-dark-light hover:bg-dark-background transition border-dark-border"
              >
                <MessageCircle size={20} />
                <span>{post.comments?.length || 0} Comentarios</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-dark-surface rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-gold">Contenido</h2>
          <div className="prose prose-invert prose-lg prose-dark max-w-none text-dark-light whitespace-pre-line">
            {post.content}
          </div>
        </div>

        <div ref={commentsRef}>
          <Comments comments={post.comments} postId={post._id} user={user} />
        </div>

        {isOwner && <EditPostBtn postId={post._id} />}
      </div>
    </>
  );
}

export default ViewPost;
