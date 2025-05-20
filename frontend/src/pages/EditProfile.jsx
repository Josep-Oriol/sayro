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
        <h1 className="text-3xl font-bold text-[#4ADE80] mb-6 text-center">
          Editar Perfil
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-[#1E1E1E] p-6 rounded-lg shadow-lg text-[#F5F5F5]"
        >
          <div>
            <label className="block text-sm mb-1 text-[#A0A0A0]">
              Nombre de usuario
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 rounded bg-[#121212] text-[#F5F5F5]"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-[#A0A0A0]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 rounded bg-[#121212] text-[#F5F5F5]"
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1B3B2F] text-[#4ADE80] rounded-lg hover:bg-[#1B3B2F]/80 transition"
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
