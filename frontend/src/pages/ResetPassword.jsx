import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { web } from "../utils/routes";
import { Eye, EyeOff } from "lucide-react";

function ResetPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = solicitar código, 2 = ingresar código y contraseña
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    document.title = "Sayro - Restablecer contraseña";
  }, []);

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Introduce tu correo");

    try {
      setLoading(true);
      const res = await fetch(`${web}/api/auth/request-reset-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Código enviado a tu correo");
      setStep(2);
    } catch (err) {
      toast.error(err.message || "Error al enviar el código");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${web}/api/auth/verify-reset-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Contraseña cambiada correctamente");
      navigate("/login");
    } catch (err) {
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
          {step === 1 ? "Solicitar código" : "Restablecer contraseña"}
        </h1>

        {step === 1 ? (
          <form
            onSubmit={handleSendCode}
            className="bg-[#1E1E1E] p-6 rounded-lg shadow space-y-6 text-[#F5F5F5]"
          >
            <div>
              <label className="block mb-1 text-sm text-[#A0A0A0]">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded bg-[#121212] text-[#F5F5F5] border border-[#2D2D2D]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#1B3B2F] text-[#4ADE80] rounded-lg hover:opacity-90 transition"
            >
              {loading ? "Enviando..." : "Enviar código"}
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleResetPassword}
            className="bg-[#1E1E1E] p-6 rounded-lg shadow space-y-6 text-[#F5F5F5]"
          >
            <div>
              <label className="block mb-1 text-sm text-[#A0A0A0]">
                Código recibido
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="w-full px-4 py-2 rounded bg-[#121212] text-[#F5F5F5] border border-[#2D2D2D]"
              />
            </div>

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
              {loading ? "Actualizando..." : "Cambiar contraseña"}
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ResetPassword;
