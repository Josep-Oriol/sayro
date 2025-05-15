import { ShieldAlert, Pencil, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

function ProfileInfo({ user }) {
  const { setUser, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    if (confirm("¿Seguro que quieres eliminar tu cuenta?")) {
      fetch(`/api/users/${user._id}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Error al eliminar cuenta");
          setUser(null);
          setIsAuthenticated(false);
          toast.success("Cuenta eliminada con éxito");
          navigate("/");
        })
        .catch(console.error);
    }
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handlePasswordReset = () => {
    navigate("/forgot-password");
  };

  const formattedDate = user?.createdAt
    ? format(new Date(user.createdAt), "d 'de' MMMM 'de' yyyy", { locale: es })
    : "Desconocida";

  return (
    <div className="bg-dark-surface p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-dark-gold mb-6">Mi Perfil</h2>

      <div className="flex flex-col gap-6 mb-8">
        <div>
          <label className="block text-sm text-dark-light mb-1">
            Nombre de usuario
          </label>
          <input
            type="text"
            value={user.username}
            readOnly
            className="w-full px-4 py-2 rounded bg-dark-background text-dark-light border border-dark-border"
          />
        </div>

        <div>
          <label className="block text-sm text-dark-light mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full px-4 py-2 rounded bg-dark-background text-dark-light border border-dark-border"
          />
        </div>

        <div>
          <label className="block text-sm text-dark-light mb-1">Rol</label>
          <input
            type="text"
            value={user.role}
            readOnly
            className="w-full px-4 py-2 rounded bg-dark-background text-dark-light border border-dark-border"
          />
        </div>

        <div>
          <label className="block text-sm text-dark-light mb-1">
            Fecha de creación
          </label>
          <input
            type="text"
            value={formattedDate}
            readOnly
            className="w-full px-4 py-2 rounded bg-dark-background text-dark-light border border-dark-border"
          />
        </div>
      </div>

      {/* Botones seguros */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleEditProfile}
            className="flex items-center gap-2 bg-dark-forest text-dark-gold px-4 py-2 rounded hover:bg-dark-forest/80 transition"
          >
            <Pencil size={18} />
            Editar perfil
          </button>

          <button
            onClick={handlePasswordReset}
            className="flex items-center gap-2 bg-dark-background text-dark-light px-4 py-2 rounded hover:bg-dark-accent/50 transition"
          >
            <KeyRound size={18} />
            Recuperar contraseña
          </button>
        </div>

        {/* Zona de peligro */}
        <div className="bg-red-500/10 border border-red-700 rounded-lg p-5 mt-6">
          <h3 className="text-lg font-semibold text-red-500 mb-3 flex items-center gap-2">
            <ShieldAlert size={20} />
            Zona de peligro
          </h3>
          <p className="text-sm text-red-300 mb-4">
            Esta acción eliminará tu cuenta permanentemente. No podrás
            recuperarla.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
          >
            <ShieldAlert size={18} />
            Eliminar cuenta definitivamente
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
