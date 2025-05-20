import { Link } from "react-router-dom";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { web } from "../../utils/routes.js";

function CardProfilePosts({ post }) {
  const { user } = useAuth();
  const userId = user?._id;

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);

  useEffect(() => {
    if (user?.likedPosts?.some((liked) => liked._id === post._id)) {
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
      .catch(console.error);
  };

  return (
    <Link
      to={`/view-post/${post._id}`}
      className="bg-[#1E1E1E] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      {post.thumbnail && (
        <img
          src={`${web}${post.thumbnail}`}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-[#4ADE80] line-clamp-2 mb-1">
          {post.title}
        </h2>
        <p className="text-sm text-[#A0A0A0] line-clamp-3 flex-grow">
          {post.description}
        </p>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-4 mb-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-[#1B3B2F] text-[#4ADE80] rounded-full"
              >
                {tag.name}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs px-2 py-1 bg-[#121212] text-[#A0A0A0] rounded-full">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-4 border-t pt-3 border-[#2D2D2D] mt-auto">
          <button
            onClick={handleLiked}
            className="flex items-center space-x-1 text-[#A0A0A0] hover:text-[#4ADE80]"
          >
            <ThumbsUp
              size={18}
              className={isLiked ? "text-[#4ADE80]" : ""}
              fill={isLiked ? "currentColor" : "none"}
            />
            <span className="text-sm">{likesCount}</span>
          </button>

          <div className="flex items-center space-x-1 text-[#A0A0A0]">
            <MessageCircle size={18} />
            <span className="text-sm">{post.comments?.length || 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CardProfilePosts;
