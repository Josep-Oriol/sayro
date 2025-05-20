import Nav from "../components/Nav";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { web } from "../utils/routes.js";
import { toast } from "react-toastify";

function EditPost() {
  useEffect(() => {
    document.title = "Sayro - editar post";
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    published: false,
  });

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [availableTags, setAvailableTags] = useState([]);

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${web}/api/posts/${id}`);
        if (!response.ok) throw new Error("Error al obtener el post");
        const data = await response.json();

        setFormData({
          title: data.title,
          description: data.description,
          content: data.content,
          published: data.published,
        });

        setTags(data.tags || []);
        setThumbnailPreview(web + data.thumbnail || null);
      } catch (err) {
        console.error(err);
        alert("No se pudo cargar el post.");
      }
    };

    fetchPost();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleTagInputChange = (e) => setTagInput(e.target.value);
  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      addTag(tagInput.trim().toLowerCase());
    }
  };

  const addTag = (tag) => {
    const tagName = tag.toLowerCase();
    const exists = tags.some(
      (t) => (typeof t === "string" ? t : t.name) === tagName
    );
    if (!exists && tagName.trim() !== "") {
      setTags([...tags, tagName]);
      setTagInput("");
      if (!availableTags.includes(tagName)) {
        setAvailableTags([...availableTags, tagName]);
      }
    }
  };

  const removeTag = (tagToRemove) => {
    const toRemoveName =
      typeof tagToRemove === "string" ? tagToRemove : tagToRemove.name;
    setTags(
      tags.filter((tag) => {
        const tagName = typeof tag === "string" ? tag : tag.name;
        return tagName !== toRemoveName;
      })
    );
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => setThumbnailPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("content", formData.content);
    data.append("published", formData.published);

    const tagNames = tags.map((tag) =>
      typeof tag === "string" ? tag : tag.name
    );
    data.append("tags", JSON.stringify(tagNames));

    if (thumbnail) {
      data.append("thumbnail", thumbnail);
    }

    try {
      const response = await fetch(`${web}/api/posts/${id}`, {
        method: "PATCH",
        body: data,
        credentials: "include",
      });

      if (!response.ok) throw new Error("Error al actualizar el post");

      const result = await response.json();
      toast.success(result.message);
      navigate(`/view-post/${id}`);
    } catch (err) {
      console.error(err);
      toast.error("Error al actualizar el post");
    }
  };

  return (
    <>
      <Nav />
      <div className="bg-[#121212] mx-auto py-8 px-4 md:px-0 max-w-4xl">
        <div className="bg-[#1E1E1E] rounded-lg shadow-lg p-6 mb-8 text-[#F5F5F5]">
          <h1 className="text-3xl font-bold mb-6 text-center text-[#4ADE80]">
            Editar Post
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium mb-1"
                  >
                    Título
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded bg-[#121212] text-[#F5F5F5]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium mb-1"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    required
                    className="w-full px-4 py-2 rounded bg-[#121212] text-[#F5F5F5]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium mb-1"
                  >
                    Contenido
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows="6"
                    required
                    className="w-full px-4 py-2 rounded bg-[#121212] text-[#F5F5F5]"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium mb-1"
                  >
                    Imagen destacada
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    {thumbnailPreview ? (
                      <div className="relative">
                        <img
                          src={thumbnailPreview}
                          alt="Vista previa"
                          className="mx-auto h-48 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setThumbnail(null);
                            setThumbnailPreview(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <input
                          id="thumbnail"
                          name="thumbnail"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleThumbnailChange}
                        />
                        <label
                          htmlFor="thumbnail"
                          className="cursor-pointer text-[#4ADE80]"
                        >
                          Subir imagen
                        </label>
                        <p className="text-xs text-[#A0A0A0]">
                          PNG, JPG, GIF hasta 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Etiquetas
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-[#1E2A38] px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {typeof tag === "string" ? tag : tag.name}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-red-400 hover:text-red-300"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={handleTagInputChange}
                      onKeyDown={handleTagInputKeyDown}
                      placeholder="Añadir etiqueta"
                      className="flex-grow px-4 py-2 bg-[#121212] text-[#F5F5F5] rounded-l"
                    />
                    <button
                      type="button"
                      onClick={() => addTag(tagInput.trim().toLowerCase())}
                      className="px-4 py-2 bg-[#1B3B2F] text-[#4ADE80] rounded-r"
                    >
                      Añadir
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    name="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                    className="h-4 w-4"
                  />
                  <label htmlFor="published" className="ml-2 text-sm">
                    Publicar inmediatamente
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#1B3B2F] text-[#4ADE80] rounded-lg hover:bg-[#1B3B2F]/80 transition"
              >
                Actualizar Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditPost;
