import { Ban } from "lucide-react";

function NoPosts() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
      <Ban className="w-12 h-12 text-red-500" />
      <p className="text-xl font-semibold text-[#F5F5F5]">
        No hay publicaciones
      </p>
      <p className="text-sm text-[#A0A0A0] max-w-sm">
        No encontramos ningún resultado para tu búsqueda. Intenta con otra
        palabra clave o vuelve más tarde.
      </p>
    </div>
  );
}

export default NoPosts;
