import { Link } from "react-router-dom";
import { web } from "../../utils/routes.js"; // Asegúrate de que apunta bien

function CardMisPost({ post }) {
  return (
    <div className="flex bg-dark-background rounded-lg shadow border border-dark-border overflow-hidden">
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
        <h3 className="text-lg font-semibold text-dark-gold">{post.title}</h3>
        <p className="text-sm text-dark-light mt-1 line-clamp-2">
          {post.description}
        </p>
        <div className="flex justify-end mt-3 gap-2">
          <Link
            to={`/view-post/${post._id}`}
            className="text-sm text-dark-accent hover:underline"
          >
            Ver
          </Link>
          <Link
            to={`/edit-post/${post._id}`}
            className="text-sm text-dark-accent hover:underline"
          >
            Editar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardMisPost;
