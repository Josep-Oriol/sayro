import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setIsAuthenticated(false);
        navigate("/");
      }
    } catch (err) {
      console.error("Error al cerrar sesión:", err.message);
    }
  };

  const AuthLinks = () =>
    isAuthenticated ? (
      <Link
        to="/logout"
        onClick={handleLogout}
        className="hover:text-dark-gold transition-colors"
      >
        Logout
      </Link>
    ) : (
      <Link to="/login" className="hover:text-dark-gold transition-colors">
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

        <div className="hidden md:flex gap-6 font-semibold">
          <Link to="/" className="hover:text-dark-gold transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-dark-gold transition-colors">
            About
          </Link>
          <AuthLinks />
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
          <div onClick={() => setIsOpen(false)}>
            <AuthLinks />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;
