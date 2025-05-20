import { useState } from "react";
import { toast } from "react-toastify";
import { web } from "../utils/routes";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

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
        <h1 className="text-3xl font-bold text-center text-dark-gold mb-6">
          Recuperar contraseña
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-dark-surface p-6 rounded-lg shadow space-y-6 text-dark-light"
        >
          {sent ? (
            <p className="text-green-400 text-center">
              Si el correo está registrado, se ha enviado un enlace para
              restablecer la contraseña.
            </p>
          ) : (
            <>
              <div>
                <label className="block mb-1 text-sm">Correo electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded bg-dark-background text-dark-light border border-dark-border"
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-dark-forest text-dark-gold rounded-lg hover:opacity-90 transition"
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
