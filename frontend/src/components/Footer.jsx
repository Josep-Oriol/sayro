import { Link } from "react-router-dom";
import { Mail, Home, Info, Github, Twitter, Linkedin } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E1E1E] text-[#F5F5F5] mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Logo y descripción */}
          <div className="flex flex-col">
            <Link to="/" className="text-2xl font-bold text-[#4ADE80] mb-4">
              Sayro
            </Link>
            <p className="text-[#A0A0A0] mb-4">
              Plataforma para compartir y descubrir diseños creativos de los
              mejores profesionales.
            </p>
            <div className="flex items-center mt-2">
              <Mail className="h-5 w-5 mr-2 text-[#4ADE80]" />
              <a
                href="mailto:joseporiol.ferrufino@inslapineda.cat"
                className="hover:text-[#4ADE80] transition-colors text-sm"
              >
                joseporiol.ferrufino@inslapineda.cat
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-[#4ADE80]">
              Enlaces rápidos
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="flex items-center hover:text-[#4ADE80] transition-colors"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="flex items-center hover:text-[#4ADE80] transition-colors"
                >
                  <Info className="h-4 w-4 mr-2" />
                  Acerca de
                </Link>
              </li>
              <li>
                <Link
                  to="/stats"
                  className="flex items-center hover:text-[#4ADE80] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2"
                  >
                    <path d="M3 3v18h18"></path>
                    <path d="M18 9l-6-6-6 6"></path>
                    <path d="M6 12h12"></path>
                    <path d="M9 15h6"></path>
                    <path d="M12 18h3"></path>
                  </svg>
                  Estadísticas
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Redes sociales */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-[#4ADE80]">
              Síguenos
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Josep-Oriol/sayro"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#121212] p-2 rounded-full hover:bg-[#2D2D2D] transition-colors"
              >
                <Github className="h-5 w-5 text-[#F5F5F5]" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#121212] p-2 rounded-full hover:bg-[#2D2D2D] transition-colors"
              >
                <Twitter className="h-5 w-5 text-[#F5F5F5]" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#121212] p-2 rounded-full hover:bg-[#2D2D2D] transition-colors"
              >
                <Linkedin className="h-5 w-5 text-[#F5F5F5]" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#2D2D2D] mt-8 pt-6 text-center text-[#A0A0A0] text-sm">
          <p>© {currentYear} Sayro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
