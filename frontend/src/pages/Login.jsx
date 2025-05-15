import Nav from "../components/Nav";
import Input from "../components/utils/Input";
import Button from "../components/utils/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Error al iniciar sesión");
        throw new Error(data.message || "Error al iniciar sesión");
      }

      setIsAuthenticated(true);

      const userRes = await fetch("http://localhost:3000/api/auth/user", {
        credentials: "include",
      });

      if (!userRes.ok) {
        throw new Error("No se pudo obtener los datos del usuario");
      }

      const userData = await userRes.json();
      setUser(userData.user);

      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (err) {
      toast.error("Error al iniciar sesión");
      console.error("Error en login:", err.message);
    }
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-dark-background flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-dark-surface p-8 rounded-xl shadow-lg w-full max-w-sm space-y-6"
        >
          <h1 className="text-2xl font-bold text-dark-gold text-center">
            Iniciar sesión
          </h1>

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
            placeholder="********"
          />

          <Button type="submit" className="w-full">
            Entrar
          </Button>

          <p className="text-center mt-4 text-sm text-dark-light">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-dark-gold font-semibold">
              Regístrate
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}

export default Login;
