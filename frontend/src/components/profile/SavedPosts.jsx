import { Bookmark } from "lucide-react";

function SavedPosts({ user }) {
  return (
    <div className="bg-dark-surface p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-dark-gold mb-4 flex items-center gap-2">
        <Bookmark /> Guardados
      </h2>
      <p className="text-dark-light">
        Has guardado {user.savedPosts?.length || 0} publicaciones.
      </p>
    </div>
  );
}

export default SavedPosts;
