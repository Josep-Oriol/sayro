import { useState, useEffect } from "react";
import Input from "../components/utils/Input";
import Button from "../components/utils/Button";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  useEffect(() => {
    document.title = "Sayro - Registro";
  }, []);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const passwordRequirements = [
    { label: "Al menos 8 caracteres", test: (p) => p.length >= 8 },
    { label: "Una letra mayúscula", test: (p) => /[A-Z]/.test(p) },
    { label: "Una letra minúscula", test: (p) => /[a-z]/.test(p) },
    { label: "Un número", test: (p) => /\d/.test(p) },
    {
      label: "Un carácter especial",
      test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p),
    },
  ];

  const isFormValid = () => {
    const { username, email, password, repeatPassword } = form;
    return (
      username.trim() !== "" &&
      /\S+@\S+\.\S+/.test(email) &&
      passwordRequirements.every((req) => req.test(password)) &&
      password === repeatPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.repeatPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (!isFormValid()) {
      toast.warning("Por favor, completa todos los campos correctamente.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al registrarse");

      toast.success("Cuenta creada con éxito");
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Error al registrarse");
    }
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-[#1E1E1E] p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 text-[#F5F5F5]"
        >
          <h1 className="text-2xl font-bold text-[#4ADE80] text-center">
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

          {/* Contraseña */}
          <div className="relative">
            <label className="block text-sm mb-1 text-[#A0A0A0]">
              Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded bg-[#121212] text-[#F5F5F5] border border-[#2D2D2D]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-[#A0A0A0]"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Repetir contraseña */}
          <div className="relative">
            <label className="block text-sm mb-1 text-[#A0A0A0]">
              Repetir contraseña
            </label>
            <input
              type={showRepeat ? "text" : "password"}
              name="repeatPassword"
              value={form.repeatPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded bg-[#121212] text-[#F5F5F5] border border-[#2D2D2D]"
            />
            <button
              type="button"
              onClick={() => setShowRepeat((prev) => !prev)}
              className="absolute right-3 top-9 text-[#A0A0A0]"
              tabIndex={-1}
            >
              {showRepeat ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Error visual si no coinciden */}
          {form.password &&
            form.repeatPassword &&
            form.password !== form.repeatPassword && (
              <p className="text-sm text-red-500">
                Las contraseñas no coinciden.
              </p>
            )}

          {/* Requisitos de contraseña */}
          <ul className="text-sm space-y-1 pl-1">
            {passwordRequirements.map((req, index) => {
              const isValid = req.test(form.password);
              return (
                <li key={index} className="flex items-center gap-2">
                  <span
                    className={isValid ? "text-green-500" : "text-gray-400"}
                  >
                    {isValid ? "✅" : "❌"}
                  </span>
                  <span
                    className={isValid ? "text-green-500" : "text-gray-400"}
                  >
                    {req.label}
                  </span>
                </li>
              );
            })}
          </ul>

          <Button
            type="submit"
            className={`w-full ${
              !isFormValid()
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={!isFormValid()}
          >
            Registrarse
          </Button>

          <p className="text-center mt-4 text-sm text-[#A0A0A0]">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-[#4ADE80] font-semibold">
              Entra
            </Link>
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Register;
