import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { web } from "../utils/routes";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
        <h1 className="text-3xl font-bold text-center text-dark-gold mb-6">
          Restablecer contraseña
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-dark-surface p-6 rounded-lg shadow space-y-6 text-dark-light"
        >
          <div>
            <label className="block mb-1 text-sm">Nueva contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-dark-background text-dark-light"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Confirmar contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded bg-dark-background text-dark-light"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-dark-forest text-dark-gold rounded-lg hover:opacity-90 transition"
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
