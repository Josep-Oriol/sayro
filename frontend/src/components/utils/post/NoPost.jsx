import { Link } from "react-router-dom";
import Nav from "../../Nav";

function NoPost() {
  return (
    <>
      <Nav />
      <div className="container mx-auto py-8 px-4">
        <div className="bg-dark-surface p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-dark-gold mb-4">
            Post no encontrado
          </h2>
          <p className="text-dark-light mb-6">
            El post que buscas no existe o ha sido eliminado.
          </p>
          <Link
            to="/"
            className="bg-dark-forest text-dark-gold px-6 py-2 rounded-lg hover:bg-dark-forest/80 transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
}

export default NoPost;
