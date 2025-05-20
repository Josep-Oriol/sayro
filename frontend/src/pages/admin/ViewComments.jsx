import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import {
  FileDown,
  Search,
  X,
  MessageCircle,
  ThumbsUp,
  Eye,
} from "lucide-react";
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
    document.title = "Sayro - Ver Comentarios";
  }, []);

  useEffect(() => {
    fetchComments();
  }, [searchTerm, sortBy]);

  const recentComments = comments.filter((comment) => {
    const created = new Date(comment.createdAt);
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    return created > lastWeek;
  });

  const handleClearSearch = () => setSearchTerm("");
  const handleExportClick = () => console.log(comments);

  return (
    <>
      <Nav />
      <div className="container mx-auto py-10 px-4 md:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#4ADE80] mb-8 text-center">
          Panel de Comentarios
        </h1>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {[
            {
              icon: (
                <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#4ADE80]" />
              ),
              label: "Total de comentarios",
              value: comments.length,
            },
            {
              icon: (
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-[#4ADE80]" />
              ),
              label: "Recientes esta semana",
              value: recentComments.length,
            },
            {
              icon: (
                <ThumbsUp className="w-8 h-8 sm:w-10 sm:h-10 text-[#4ADE80]" />
              ),
              label: "Likes totales",
              value: comments.reduce((acc, c) => acc + (c.likes ?? 0), 0),
            },
          ].map(({ icon, label, value }, i) => (
            <div
              key={i}
              className="bg-[#121212] border border-[#2D2D2D] rounded-xl p-4 sm:p-6 flex items-center gap-4"
            >
              {icon}
              <div>
                <p className="text-sm text-[#A0A0A0]">{label}</p>
                <p className="text-xl sm:text-2xl font-bold text-[#F5F5F5]">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Filtros */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-8">
          <button
            onClick={handleExportClick}
            className="flex items-center justify-center gap-2 bg-[#1B3B2F] text-[#4ADE80] px-4 py-3 rounded-lg hover:bg-[#1B3B2F]/80 transition w-full lg:w-auto"
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
                className="w-full py-3 px-4 rounded-l-lg border border-[#2D2D2D] bg-[#121212] text-[#F5F5F5]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-0 top-1/2 -translate-y-1/2 px-3"
                >
                  <X className="text-[#4ADE80]" />
                </button>
              )}
            </div>
            <button className="bg-[#1B3B2F] text-[#4ADE80] px-6 rounded-r-lg hover:bg-[#1B3B2F]/80 transition">
              <Search />
            </button>
          </form>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-3 px-4 rounded-lg border border-[#2D2D2D] bg-[#121212] text-[#F5F5F5] w-full lg:w-auto"
          >
            <option value="all">Todos</option>
            <option value="recent">Más recientes</option>
            <option value="old">Más antiguos</option>
          </select>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto border border-[#2D2D2D] rounded-lg">
          <table className="min-w-full text-sm text-[#F5F5F5]">
            <thead className="bg-[#121212] sticky top-0 z-10 text-xs text-[#A0A0A0] uppercase tracking-wider">
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
                  className="border-t border-[#2D2D2D] hover:bg-[#121212]/40 transition"
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
                      className="text-[#4ADE80] underline hover:text-[#4ADE80]/80"
                    >
                      {comment.post.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center text-[#4ADE80] font-semibold">
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
