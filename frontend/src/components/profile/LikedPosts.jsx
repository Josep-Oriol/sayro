import { Heart, Search } from "lucide-react";
import { useState } from "react";
import CardLikedPosts from "./CardLikedPosts";

function LikedPosts({ user }) {
  const liked = user?.likedPosts || [];

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");

  const filtered = liked
    .filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "recent")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === "popular") return b.likes - a.likes;
      if (sort === "az") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="bg-dark-surface p-6 rounded-lg shadow-lg">
      {/* Título */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dark-gold flex items-center gap-2">
          <Heart /> Posts que te gustan
        </h2>
        <p className="text-dark-light mt-1 text-sm">Total: {liked.length}</p>
      </div>

      {/* Filtros */}
      {liked.length > 0 && (
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          {/* Búsqueda */}
          <div className="relative w-full lg:w-2/3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título..."
              className="w-full pl-4 pr-10 py-2 rounded-lg bg-dark-background text-dark-light border border-dark-border focus:ring-2 focus:ring-dark-accent transition"
            />
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-light/60"
              size={18}
            />
          </div>

          {/* Ordenar */}
          <div className="w-full lg:w-auto">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full lg:w-auto px-4 py-2 rounded-lg bg-dark-background text-dark-light border border-dark-border focus:ring-2 focus:ring-dark-accent transition"
            >
              <option value="recent">Más recientes</option>
              <option value="popular">Más populares</option>
              <option value="az">A - Z</option>
            </select>
          </div>
        </div>
      )}

      {/* Lista de posts */}
      {liked.length === 0 ? (
        <p className="text-dark-light italic">
          Aún no has dado like a ninguna publicación.
        </p>
      ) : filtered.length === 0 ? (
        <p className="text-dark-light italic">
          No se encontraron resultados para tu búsqueda.
        </p>
      ) : (
        <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4 scrollbar-thin">
          {filtered.map((post) => (
            <CardLikedPosts key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LikedPosts;
