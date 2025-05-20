import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { web } from "../utils/routes";

function EditProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sayro - Editar perfil";
  }, []);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${web}/api/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al actualizar el perfil");

      const result = await res.json();
      toast.success(result.message);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error("No se pudo actualizar el perfil");
    }
  };

  return (
    <>
      <Nav />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-dark-gold mb-6 text-center">
          Editar Perfil
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-dark-surface p-6 rounded-lg shadow-lg text-dark-light"
        >
          <div>
            <label className="block text-sm mb-1">Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 rounded bg-dark-background text-dark-light"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 rounded bg-dark-background text-dark-light"
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2.5 bg-dark-forest text-dark-gold rounded-lg"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default EditProfile;
