import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, user } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        toast.success("Sesión cerrada correctamente");
        setIsAuthenticated(false);
        navigate("/");
      }
    } catch (err) {
      toast.error("Error al cerrar sesión");
      console.error("Error al cerrar sesión:", err.message);
    }
  };

  const DesktopAuthLinks = () =>
    isAuthenticated ? (
      <div className="relative group">
        <button className="hover:text-dark-gold transition-colors flex gap-2 items-center">
          <User className="h-5 w-5" />
          {user?.username || "Usuario"}
          <span>⌄</span>
        </button>

        <div className="absolute right-0 top-8 bottom-full mb-2 w-44 bg-dark-background text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
          <Link to="/profile" className="block px-4 py-2 hover:bg-dark-surface">
            Perfil
          </Link>
          <Link to="/stats" className="block px-4 py-2 hover:bg-dark-surface">
            Estadísticas
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-red-600 text-red-400"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    ) : (
      <Link to="/login" className="hover:text-dark-gold transition-colors">
        Login
      </Link>
    );

  const MobileAuthLinks = () =>
    isAuthenticated ? (
      <div className="flex flex-col gap-1">
        <span className="text-dark-gold font-semibold">
          {user?.username || "Usuario"}
        </span>
        <Link
          to="/profile"
          className="hover:text-dark-gold"
          onClick={() => setIsOpen(false)}
        >
          Perfil
        </Link>
        <Link
          to="/stats"
          className="hover:text-dark-gold"
          onClick={() => setIsOpen(false)}
        >
          Estadísticas
        </Link>
        <button
          onClick={(e) => {
            handleLogout(e);
            setIsOpen(false);
          }}
          className="text-left hover:text-red-500"
        >
          Cerrar sesión
        </button>
      </div>
    ) : (
      <Link
        to="/login"
        className="hover:text-dark-gold transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Login
      </Link>
    );

  return (
    <nav className="bg-dark-surface text-dark-light px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-dark-gold">
          Sayro
        </Link>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex gap-6 font-semibold items-center">
          <Link to="/" className="hover:text-dark-gold transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-dark-gold transition-colors">
            About
          </Link>
          <DesktopAuthLinks />
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden font-semibold">
          <Link
            to="/"
            className="hover:text-dark-gold"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-dark-gold"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <MobileAuthLinks />
        </div>
      )}
    </nav>
  );
}

export default Nav;
