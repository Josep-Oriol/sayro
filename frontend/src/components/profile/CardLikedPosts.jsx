import { Link } from "react-router-dom";
import { web } from "../../utils/routes.js";

function CardLikedPosts({ post }) {
  return (
    <Link
      to={`/view-post/${post._id}`}
      className="flex bg-[#121212] rounded-lg overflow-hidden shadow hover:shadow-lg transition group"
    >
      {/* Imagen */}
      <div className="w-40 h-32 flex-shrink-0">
        <img
          src={`${web}${post.thumbnail}`}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col justify-center flex-grow">
        <h3 className="text-lg font-semibold text-[#4ADE80] group-hover:underline line-clamp-1">
          {post.title}
        </h3>
        <p className="text-sm text-[#A0A0A0] line-clamp-2">
          {post.description}
        </p>
      </div>
    </Link>
  );
}

export default CardLikedPosts;
