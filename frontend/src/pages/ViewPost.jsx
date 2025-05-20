import Nav from "../components/Nav";
import Comments from "../components/Comments";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ThumbsUp, MessageCircle, Calendar, User, Tag } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "../context/AuthContext";
import { es } from "date-fns/locale";
import EditPostBtn from "../components/utils/post/EditPostBtn";
import DeletePostBtn from "../components/utils/post/DeletePostBtn";
import IsLoadingPost from "../components/utils/post/IsLoadingPost";
import ErrorPost from "../components/utils/post/ErrorPost";
import NoPost from "../components/utils/post/NoPost";
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
    document.title = "Sayro - Ver post";
  }, []);

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
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (post && user) {
      setIsOwner(post.author._id === user._id);
    }
  }, [post, user]);

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

  const formattedDate = post?.createdAt
    ? format(new Date(post.createdAt), "d 'de' MMMM 'de' yyyy", { locale: es })
    : "Fecha desconocida";

  if (isLoading) return <IsLoadingPost />;
  if (error) return <ErrorPost error={error} />;
  if (!post) return <NoPost />;

  return (
    <>
      <Nav />
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <div className="bg-[#1E1E1E] rounded-lg shadow-lg overflow-hidden mb-8">
          {post.thumbnail && (
            <div className="relative w-full h-80 overflow-hidden">
              <img
                src={`${web}${post.thumbnail}`}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-transparent" />
            </div>
          )}

          <div className="p-6 md:p-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#4ADE80] mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm mb-6">
              <span className="flex items-center bg-[#121212] px-3 py-1 rounded-full text-[#A0A0A0]">
                <Calendar size={16} className="mr-1" /> {formattedDate}
              </span>
              <span className="flex items-center bg-[#121212] px-3 py-1 rounded-full text-[#A0A0A0]">
                <User size={16} className="mr-1" /> {post.author.username}
              </span>
              <span className="flex items-center bg-[#121212] px-3 py-1 rounded-full text-[#A0A0A0]">
                <ThumbsUp size={16} className="mr-1" /> {likesCount} likes
              </span>
              <span className="flex items-center bg-[#121212] px-3 py-1 rounded-full text-[#A0A0A0]">
                <MessageCircle size={16} className="mr-1" />{" "}
                {post.comments?.length || 0} comentarios
              </span>
            </div>

            <p className="text-lg text-[#CCCCCC] italic border-l-4 border-[#4ADE80] pl-4 mb-6">
              {post.description}
            </p>

            {post.tags && post.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-[#A0A0A0] mb-2 flex items-center">
                  <Tag size={16} className="mr-1" />
                  Etiquetas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#1B3B2F] text-[#4ADE80] text-sm rounded-full"
                    >
                      {tag.name || tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4 border-t border-[#2D2D2D] mt-6">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-5 py-2 rounded-full border transition ${
                  isLiked
                    ? "bg-[#4ADE80]/10 text-[#4ADE80] border-[#4ADE80]"
                    : "text-[#A0A0A0] hover:bg-[#121212] border-[#2D2D2D]"
                }`}
              >
                <ThumbsUp size={20} fill={isLiked ? "currentColor" : "none"} />
                <span>{likesCount} Me gusta</span>
              </button>

              <button
                onClick={handleScrollToComments}
                className="flex items-center gap-2 px-5 py-2 rounded-full border text-[#A0A0A0] hover:bg-[#121212] transition border-[#2D2D2D]"
              >
                <MessageCircle size={20} />
                <span>{post.comments?.length || 0} Comentarios</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#1E1E1E] rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold mb-4 text-[#4ADE80]">Contenido</h2>
          <div className="prose prose-invert prose-lg max-w-none text-[#CCCCCC] whitespace-pre-line">
            {post.content}
          </div>
        </div>

        <div ref={commentsRef}>
          <Comments comments={post.comments} postId={post._id} user={user} />
        </div>

        {isOwner && (
          <>
            <DeletePostBtn postId={post._id} />
            <EditPostBtn user={user} id={post._id} />
          </>
        )}
      </div>
    </>
  );
}

export default ViewPost;
