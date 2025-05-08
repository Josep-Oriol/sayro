import { useState } from "react";
import Input from "../components/utils/Input";
import Button from "../components/utils/Button";
import Nav from "../components/Nav";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al registrarse");
      }

      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      console.error("Error en registro:", err.message);
    }
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-dark-background flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-dark-surface p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
        >
          <h1 className="text-2xl font-bold text-dark-gold text-center">
            Crear cuenta
          </h1>

          <Input
            label="Nombre de usuario"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            placeholder="TuNombre"
          />

          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="tucorreo@example.com"
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />

          <Button type="submit" className="w-full">
            Registrarse
          </Button>

          <p className="text-center mt-4 text-sm text-dark-light">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-dark-gold font-semibold">
              Entra
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}

export default Register;
