import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { web } from "../utils/routes.js";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, user } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${web}/api/auth/logout`, {
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

  return (
    <nav className="bg-[#1E1E1E] text-[#F5F5F5] px-6 py-4 shadow-md relative z-50">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-[#4ADE80]">
          Sayro
        </Link>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 font-semibold items-center">
          <Link to="/" className="hover:text-[#4ADE80] transition">
            Inicio
          </Link>
          <Link to="/about" className="hover:text-[#4ADE80] transition">
            Sobre nosotros
          </Link>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 hover:text-[#4ADE80] transition"
              >
                <User className="h-5 w-5" />
                {user?.username || "Usuario"}
                <ChevronDown size={16} />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#121212] rounded shadow-lg text-sm overflow-hidden z-50 border border-[#2D2D2D]">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-[#1E1E1E]"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={(e) => {
                      handleLogout(e);
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-600 hover:text-white"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hover:text-[#4ADE80] transition">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-4 font-semibold md:hidden">
          <Link
            to="/"
            className="hover:text-[#4ADE80]"
            onClick={() => setIsOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/about"
            className="hover:text-[#4ADE80]"
            onClick={() => setIsOpen(false)}
          >
            Sobre nosotros
          </Link>

          {isAuthenticated ? (
            <div className="border-t border-[#2D2D2D] pt-3 space-y-2">
              <div className="flex items-center gap-2 text-[#4ADE80]">
                <User className="h-5 w-5" />
                {user?.username || "Usuario"}
              </div>
              <Link
                to="/profile"
                className="hover:text-[#4ADE80] block"
                onClick={() => setIsOpen(false)}
              >
                Perfil
              </Link>
              <button
                onClick={(e) => {
                  handleLogout(e);
                  setIsOpen(false);
                }}
                className="text-left text-red-400 hover:text-red-500"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hover:text-[#4ADE80]"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Nav;
