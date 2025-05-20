import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { web } from "../utils/routes";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = "Sayro - Contraseña olvidada";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${web}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error inesperado");

      setSent(true);
      toast.success("Enlace de recuperación enviado. Revisa tu correo.");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "No se pudo enviar el enlace");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="max-w-md mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold text-center text-[#4ADE80] mb-6">
          Recuperar contraseña
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1E1E1E] p-6 rounded-lg shadow space-y-6 text-[#F5F5F5]"
        >
          {sent ? (
            <p className="text-green-400 text-center">
              Si el correo está registrado, se ha enviado un enlace para
              restablecer la contraseña.
            </p>
          ) : (
            <>
              <div>
                <label className="block mb-1 text-sm text-[#A0A0A0]">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full px-4 py-2 rounded bg-[#121212] text-[#F5F5F5] border border-[#2D2D2D]"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#1B3B2F] text-[#4ADE80] rounded-lg hover:opacity-90 transition"
              >
                {loading ? "Enviando..." : "Enviar enlace"}
              </button>
            </>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
}

export default ForgotPassword;
