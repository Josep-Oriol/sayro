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

  const passwordRequirements = [
    {
      label: "Al menos 8 caracteres",
      test: (password) => password.length >= 8,
    },
    {
      label: "Una letra mayúscula",
      test: (password) => /[A-Z]/.test(password),
    },
    {
      label: "Una letra minúscula",
      test: (password) => /[a-z]/.test(password),
    },
    { label: "Un número", test: (password) => /\d/.test(password) },
    {
      label: "Un carácter especial",
      test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  const isFormValid = () => {
    const isUsernameValid = form.username.trim() !== "";
    const isEmailValid = /\S+@\S+\.\S+/.test(form.email);
    const isPasswordValid = passwordRequirements.every((req) =>
      req.test(form.password)
    );
    return isUsernameValid && isEmailValid && isPasswordValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //if (!isFormValid()) return;

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
