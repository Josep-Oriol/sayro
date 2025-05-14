import Nav from "../components/Nav.jsx";
import Comments from "../components/Comments.jsx";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Heart,
  ThumbsUp,
  MessageCircle,
  Calendar,
  Clock,
  User,
  Tag,
} from "lucide-react";
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

  useEffect(() => {
    setIsLoading(true);
    fetch(`${web}/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo cargar el post");
        }
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

    fetch(`${web}/${user._id}/like/${post._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo alternar like");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setIsLiked(data.liked);
        setLikesCount(data.likes);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
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
        {/* Cabecera del post */}
        <div className="bg-dark-surface rounded-lg shadow-lg overflow-hidden mb-8">
          {post.thumbnail && (
            <div className="relative w-full h-80">
              <img
                src={`${web}${post.thumbnail}`}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Título y metadatos */}
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-dark-gold">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-dark-light/70 text-sm mb-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>{formattedDate}</span>
                </div>

                {post.author && (
                  <div className="flex items-center">
                    <User size={16} className="mr-1" />
                    <span>{post.author.username}</span>
                  </div>
                )}

                <div className="flex items-center">
                  <ThumbsUp size={16} className="mr-1" />
                  <span>{likesCount} likes</span>
                </div>

                {post.comments && (
                  <div className="flex items-center">
                    <MessageCircle size={16} className="mr-1" />
                    <span>{post.comments.length} comentarios</span>
                  </div>
                )}
              </div>

              <p className="text-xl text-dark-light font-medium">
                {post.description}
              </p>
            </div>

            {/* Etiquetas */}
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

            {/* Acciones */}
            <div className="flex items-center space-x-4 border-t border-dark-border pt-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                  isLiked
                    ? "bg-dark-forest/20 text-dark-gold"
                    : "hover:bg-dark-background text-dark-light"
                }`}
              >
                <ThumbsUp
                  size={20}
                  className={isLiked ? "text-dark-gold" : ""}
                  fill={isLiked ? "currentColor" : "none"}
                />
                <span>{post.likes || 0} Me gusta</span>
              </button>

              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-dark-background text-dark-light transition">
                <MessageCircle size={20} />
                <span>{post.comments?.length || 0} Comentarios</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contenido del post */}
        <div className="bg-dark-surface rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold mb-4 text-dark-gold">Contenido</h2>
          <div className="prose prose-invert prose-dark-gold max-w-none">
            <p className="text-dark-light whitespace-pre-line">
              {post.content}
            </p>
          </div>
        </div>

        {/* Sección de comentarios */}
        <Comments comments={post.comments} postId={post._id} />
        {isOwner && <EditPostBtn postId={post._id} />}
      </div>
    </>
  );
}

export default ViewPost;
