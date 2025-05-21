import Nav from "../components/Nav";
import Input from "../components/utils/Input";
import Button from "../components/utils/Button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { web } from "../utils/routes.js";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();

  useEffect(() => {
    document.title = "Sayro - Login";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${web}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al iniciar sesión");

      setIsAuthenticated(true);

      const userRes = await fetch(`${web}/api/auth/user`, {
        credentials: "include",
      });
      const userData = await userRes.json();
      setUser(userData.user);

      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (err) {
      toast.error("Error al iniciar sesión");
      console.error("Login error:", err.message);
    }
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-[#1E1E1E] p-8 rounded-xl shadow-lg w-full max-w-sm space-y-6 text-[#F5F5F5]"
        >
          <h1 className="text-2xl font-bold text-[#4ADE80] text-center">
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

          {/* Campo contraseña con icono */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 text-[#A0A0A0]"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-4 py-2 rounded bg-[#121212] text-[#F5F5F5] border border-[#2D2D2D]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-[#A0A0A0] hover:text-[#F5F5F5]"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <Button type="submit" className="w-full">
            Entrar
          </Button>

          <p className="text-center mt-4 text-sm text-[#A0A0A0]">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-[#4ADE80] font-semibold">
              Regístrate
            </Link>
          </p>
          <p className="text-center mt-4 text-sm text-[#A0A0A0]">
            ¿No recuerdas la constraseña?{" "}
            <Link to="/reset-password" className="text-[#4ADE80] font-semibold">
              Recuperar
            </Link>
          </p>
        </form>
      </main>
    </>
  );
}

export default Login;
