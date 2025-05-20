import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { web } from "../utils/routes";
import { Eye, EyeOff } from "lucide-react";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    document.title = "Sayro - Resetear contraseña";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${web}/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Error al cambiar la contraseña");

      toast.success("Contraseña actualizada correctamente");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error al restablecer la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="max-w-md mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold text-center text-[#4ADE80] mb-6">
          Restablecer contraseña
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1E1E1E] p-6 rounded-lg shadow space-y-6 text-[#F5F5F5]"
        >
          {/* Nueva contraseña */}
          <div className="relative">
            <label className="block mb-1 text-sm text-[#A0A0A0]">
              Nueva contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-[#121212] text-[#F5F5F5] border border-[#2D2D2D]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-[#A0A0A0]"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirmar contraseña */}
          <div className="relative">
            <label className="block mb-1 text-sm text-[#A0A0A0]">
              Confirmar contraseña
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-[#121212] text-[#F5F5F5] border border-[#2D2D2D]"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-9 text-[#A0A0A0]"
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Mensaje si no coinciden */}
          {password && confirmPassword && password !== confirmPassword && (
            <p className="text-sm text-red-500">
              Las contraseñas no coinciden.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#1B3B2F] text-[#4ADE80] rounded-lg hover:opacity-90 transition"
          >
            {loading ? "Cambiando..." : "Cambiar contraseña"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default ResetPassword;
