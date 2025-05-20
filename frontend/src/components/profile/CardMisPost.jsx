import { Link } from "react-router-dom";
import { web } from "../../utils/routes.js";

function CardMisPost({ post }) {
  return (
    <div className="flex bg-[#121212] rounded-lg shadow border border-[#2D2D2D] overflow-hidden">
      {/* Imagen */}
      {post.thumbnail && (
        <img
          src={`${web}${post.thumbnail}`}
          alt={`Imagen de ${post.title}`}
          className="w-32 h-32 object-cover"
        />
      )}

      {/* Contenido */}
      <div className="flex-1 p-4">
        <h3 className="text-lg font-semibold text-[#4ADE80]">{post.title}</h3>
        <p className="text-sm text-[#A0A0A0] mt-1 line-clamp-2">
          {post.description}
        </p>
        <div className="flex justify-end mt-3 gap-2">
          <Link
            to={`/view-post/${post._id}`}
            className="text-sm text-[#1E2A38] hover:underline"
          >
            Ver
          </Link>
          <Link
            to={`/edit-post/${post._id}`}
            className="text-sm text-[#1E2A38] hover:underline"
          >
            Editar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardMisPost;
