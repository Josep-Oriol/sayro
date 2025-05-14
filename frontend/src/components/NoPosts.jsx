import { Ban } from "lucide-react";

function NoPosts() {
  return (
    <div className="flex flex-col items-center justify-center h-48 text-center text-muted-foreground space-y-4">
      <Ban className="w-10 h-10 text-gray-400" />
      <p className="text-lg font-medium">No hay publicaciones disponibles</p>
      <p className="text-sm text-gray-500">
        Intenta con otro término o vuelve más tarde.
      </p>
    </div>
  );
}

export default NoPosts;
