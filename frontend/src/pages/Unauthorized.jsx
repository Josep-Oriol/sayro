import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { useEffect } from "react";

export default function Unauthorized() {
  useEffect(() => {
    document.title = "Sayro - Sin autorización";
  }, []);

  return (
    <>
      <Nav />
      <div className="container mx-auto px-4 md:px-8 py-24 text-center">
        <div className="flex flex-col items-center">
          <div className="bg-[#121212] p-6 rounded-full shadow-lg mb-6">
            <Lock className="text-[#4ADE80]" size={48} />
          </div>
          <h1 className="text-4xl font-extrabold text-[#4ADE80] mb-4">
            Acceso Denegado
          </h1>
          <p className="text-[#A0A0A0] text-lg mb-6">
            No tienes permiso para acceder a esta página.
            <br />
            Si crees que esto es un error, contacta al administrador.
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-[#1B3B2F] text-[#4ADE80] rounded-lg hover:bg-[#1B3B2F]/80 transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
