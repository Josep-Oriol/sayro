import { Ban } from "lucide-react";

function NoPosts() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground space-y-3">
      <Ban className="w-12 h-12 text-red-500" />
      <p className="text-xl font-semibold text-dark-light">
        No hay publicaciones
      </p>
      <p className="text-sm text-dark-light/60 max-w-sm">
        No encontramos ningún resultado para tu búsqueda. Intenta con otra
        palabra clave o vuelve más tarde.
      </p>
    </div>
  );
}

export default NoPosts;
