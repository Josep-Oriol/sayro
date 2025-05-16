import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { FileDown, Search, X, MessageCircle, ThumbsUp } from "lucide-react";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { web } from "../../utils/routes";
import { useAuth } from "../../context/AuthContext";

function ViewComments() {
  const [comments, setComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const { isAuthenticated } = useAuth();

  const fetchComments = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("q", searchTerm);
      if (sortBy === "recent" || sortBy === "old")
        params.append("sortBy", sortBy);

      const url = `${web}/api/comments?${params.toString()}`;
      const res = await fetch(url);
      const data = await res.json();
      setComments(data);
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [searchTerm, sortBy]);

  const recentComments = comments.filter((comment) => {
    const created = new Date(comment.createdAt);
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    return created > lastWeek;
  });

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleExportClick = () => {
    console.log(comments);
  };

  return (
    <>
      <Nav />
      <div className="container mx-auto py-10 px-4 md:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark-gold mb-8 text-center">
          Panel de Comentarios
        </h1>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
          <div className="bg-dark-background border border-dark-border rounded-xl p-4 sm:p-6 flex items-center gap-4">
            <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-dark-gold" />
            <div>
              <p className="text-sm text-dark-muted">Total de comentarios</p>
              <p className="text-xl sm:text-2xl font-bold text-dark-light">
                {comments.length}
              </p>
            </div>
          </div>
          <div className="bg-dark-background border border-dark-border rounded-xl p-4 sm:p-6 flex items-center gap-4">
            <Search className="w-8 h-8 sm:w-10 sm:h-10 text-dark-gold" />
            <div>
              <p className="text-sm text-dark-muted">Recientes esta semana</p>
              <p className="text-xl sm:text-2xl font-bold text-dark-light">
                {recentComments.length}
              </p>
            </div>
          </div>
          <div className="bg-dark-background border border-dark-border rounded-xl p-4 sm:p-6 flex items-center gap-4">
            <ThumbsUp className="w-8 h-8 sm:w-10 sm:h-10 text-dark-gold" />
            <div>
              <p className="text-sm text-dark-muted">Likes totales</p>
              <p className="text-xl sm:text-2xl font-bold text-dark-light">
                {comments.reduce((acc, c) => acc + (c.likes ?? 0), 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-8">
          <button
            onClick={handleExportClick}
            className="flex items-center justify-center gap-2 bg-dark-forest text-dark-gold px-4 py-3 rounded-lg hover:bg-dark-forest/80 transition w-full lg:w-auto"
            title="Exportar comentarios"
          >
            <FileDown className="w-5 h-5" />
            <span className="text-sm">Exportar</span>
          </button>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-1 w-full"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar por contenido..."
                className="w-full py-3 px-4 rounded-l-lg border border-dark-border bg-dark-background text-dark-light"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-0 top-1/2 -translate-y-1/2 px-3"
                >
                  <X className="text-dark-gold" />
                </button>
              )}
            </div>
            <button className="bg-dark-forest text-dark-gold px-6 rounded-r-lg hover:bg-dark-forest/80 transition">
              <Search />
            </button>
          </form>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-3 px-4 rounded-lg border border-dark-border bg-dark-background text-dark-light w-full lg:w-auto"
          >
            <option value="all">Todos</option>
            <option value="recent">Más recientes</option>
            <option value="old">Más antiguos</option>
          </select>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto border border-dark-border rounded-lg">
          <table className="min-w-full text-sm text-dark-light">
            <thead className="bg-dark-background sticky top-0 z-10 text-xs text-dark-muted uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Usuario</th>
                <th className="px-6 py-3 text-left">Contenido</th>
                <th className="px-6 py-3 text-left">Post</th>
                <th className="px-6 py-3 text-left">Fecha</th>
                <th className="px-6 py-3 text-center">Likes</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr
                  key={comment._id}
                  className="border-t border-dark-border hover:bg-dark-background/40 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    {comment.author?.username || "Anónimo"}
                  </td>
                  <td
                    className="px-6 py-4 max-w-xs truncate"
                    title={comment.content}
                  >
                    {comment.content}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/view-post/${comment.post._id}`}
                      className="text-dark-gold underline hover:text-dark-gold/80"
                    >
                      {comment.post.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center text-dark-gold font-semibold">
                    {comment.likes ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isAuthenticated && <></>}
      <Footer />
    </>
  );
}

export default ViewComments;
