import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { FileDown, Search, X, Tag as TagIcon, Clock, Eye } from "lucide-react";
import { web } from "../../utils/routes";
import { useAuth } from "../../context/AuthContext";

function ViewTags() {
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const { isAuthenticated } = useAuth();

  const fetchTags = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("q", searchTerm);
      if (sortBy === "recent" || sortBy === "old")
        params.append("sortBy", sortBy);

      const url = `${web}/api/tags?${params.toString()}`;
      const res = await fetch(url);
      const data = await res.json();
      setTags(data);
    } catch (error) {
      console.error("Error al obtener tags:", error);
    }
  };

  useEffect(() => {
    document.title = "Sayro - Ver Tags";
  }, []);

  useEffect(() => {
    fetchTags();
  }, [searchTerm, sortBy]);

  const recentTags = tags.filter((tag) => {
    const created = new Date(tag.createdAt);
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    return created > lastWeek;
  });

  const handleClearSearch = () => setSearchTerm("");
  const handleExportClick = () => console.log(tags);

  return (
    <>
      <Nav />
      <div className="container mx-auto py-10 px-4 md:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#4ADE80] mb-8 text-center">
          Panel de Etiquetas
        </h1>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
          <div className="bg-[#121212] border border-[#2D2D2D] rounded-xl p-4 sm:p-6 flex items-center gap-4">
            <TagIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#4ADE80]" />
            <div>
              <p className="text-sm text-[#A0A0A0]">Total de etiquetas</p>
              <p className="text-xl sm:text-2xl font-bold text-[#F5F5F5]">
                {tags.length}
              </p>
            </div>
          </div>
          <div className="bg-[#121212] border border-[#2D2D2D] rounded-xl p-4 sm:p-6 flex items-center gap-4">
            <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-[#4ADE80]" />
            <div>
              <p className="text-sm text-[#A0A0A0]">Etiquetas recientes</p>
              <p className="text-xl sm:text-2xl font-bold text-[#F5F5F5]">
                {recentTags.length}
              </p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-8">
          <button
            onClick={handleExportClick}
            className="flex items-center justify-center gap-2 bg-[#1B3B2F] text-[#4ADE80] px-4 py-3 rounded-lg hover:bg-[#1B3B2F]/80 transition w-full lg:w-auto"
            title="Exportar etiquetas"
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
                placeholder="Buscar por nombre..."
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
            <option value="all">Todas</option>
            <option value="recent">Más recientes</option>
            <option value="old">Más antiguas</option>
          </select>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto border border-[#2D2D2D] rounded-lg">
          <table className="min-w-full text-sm text-[#F5F5F5]">
            <thead className="bg-[#121212] sticky top-0 z-10 text-xs text-[#A0A0A0] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Nombre</th>
                <th className="px-6 py-3 text-left">Fecha de creación</th>
                <th className="px-6 py-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody>
              {tags.map((tag) => (
                <tr
                  key={tag._id}
                  className="border-t border-[#2D2D2D] hover:bg-[#121212]/40 transition"
                >
                  <td className="px-6 py-4 font-medium">{tag.name}</td>
                  <td className="px-6 py-4">
                    {new Date(tag.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => console.log("Ver etiqueta", tag._id)}
                      className="p-2 rounded-full hover:bg-[#1E2A38]/20"
                      title="Ver detalles"
                    >
                      <Eye className="w-5 h-5 text-[#4ADE80]" />
                    </button>
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

export default ViewTags;
