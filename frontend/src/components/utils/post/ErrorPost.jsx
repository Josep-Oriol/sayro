import Nav from "../../Nav";
import { Link } from "react-router-dom";

function ErrorPost({ error }) {
  return (
    <>
      <Nav />
      <div className="container mx-auto py-8 px-4">
        <div className="bg-[#1E1E1E] p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-[#A0A0A0] mb-6">{error}</p>
          <Link
            to="/"
            className="bg-[#1B3B2F] text-[#4ADE80] px-6 py-2 rounded-lg hover:bg-[#1B3B2F]/80 transition"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
}

export default ErrorPost;
