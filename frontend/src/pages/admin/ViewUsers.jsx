import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { FileDown, Search, X, Users, Clock } from "lucide-react";
import { Eye } from "lucide-react";
import { web } from "../../utils/routes";
import { useAuth } from "../../context/AuthContext";

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const { isAuthenticated } = useAuth();

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("q", searchTerm);
      if (sortBy === "recent" || sortBy === "old")
        params.append("sortBy", sortBy);

      const url = `${web}/api/users?${params.toString()}`;
      const res = await fetch(url);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, sortBy]);

  const recentUsers = users.filter((user) => {
    const created = new Date(user.createdAt);
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    return created > lastWeek;
  });

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleExportClick = () => {
    console.log(users);
  };

  return (
    <>
      <Nav />
      <div className="container mx-auto py-10 px-4 md:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark-gold mb-8 text-center">
          Panel de Usuarios
        </h1>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
          <div className="bg-dark-background border border-dark-border rounded-xl p-4 sm:p-6 flex items-center gap-4">
            <Users className="w-8 h-8 sm:w-10 sm:h-10 text-dark-gold" />
            <div>
              <p className="text-sm text-dark-muted">Total de usuarios</p>
              <p className="text-xl sm:text-2xl font-bold text-dark-light">
                {users.length}
              </p>
            </div>
          </div>
          <div className="bg-dark-background border border-dark-border rounded-xl p-4 sm:p-6 flex items-center gap-4">
            <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-dark-gold" />
            <div>
              <p className="text-sm text-dark-muted">Nuevos esta semana</p>
              <p className="text-xl sm:text-2xl font-bold text-dark-light">
                {recentUsers.length}
              </p>
            </div>
          </div>
          <div className="bg-dark-background border border-dark-border rounded-xl p-4 sm:p-6 flex items-center gap-4">
            <Search className="w-8 h-8 sm:w-10 sm:h-10 text-dark-gold" />
            <div>
              <p className="text-sm text-dark-muted">Usuarios visibles</p>
              <p className="text-xl sm:text-2xl font-bold text-dark-light">
                {users.length}
              </p>
            </div>
          </div>
        </div>

        {/* Filtros y botón de exportar */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-8">
          {/* Botón de exportar */}
          <button
            onClick={handleExportClick}
            className="flex items-center justify-center gap-2 bg-dark-forest text-dark-gold px-4 py-3 rounded-lg hover:bg-dark-forest/80 transition w-full lg:w-auto"
            title="Exportar usuarios"
          >
            <FileDown className="w-5 h-5" />
            <span className="text-sm">Exportar</span>
          </button>

          {/* Buscador */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-1 w-full"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
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

          {/* Selector de orden */}
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

        {/* Tabla de usuarios */}
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto border border-dark-border rounded-lg">
          <table className="min-w-full text-sm text-dark-light">
            <thead className="bg-dark-background sticky top-0 z-10 text-xs text-dark-muted uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Usuario</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Fecha</th>
                <th className="px-6 py-3 text-center">Likes</th>
                <th className="px-6 py-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-dark-border hover:bg-dark-background/40 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    {user.username || user.name}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center text-red-500 font-semibold">
                    {user.likedPosts?.length || 0} <span role="img">❤️</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => console.log("Ver usuario", user._id)}
                      className="p-2 rounded-full hover:bg-dark-accent/20"
                      title="Ver detalles"
                    >
                      <Eye className="w-5 h-5 text-dark-gold" />
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

export default ViewUsers;
