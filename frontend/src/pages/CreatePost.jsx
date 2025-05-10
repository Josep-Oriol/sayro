import Nav from "../components/Nav.jsx";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    published: false,
  });
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [availableTags, setAvailableTags] = useState([
    "diseño", "desarrollo", "marketing", "tecnología", "arte", "negocios"
  ]);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      addTag(tagInput.trim().toLowerCase());
    }
  };

  const addTag = (tag) => {
    if (!tags.includes(tag) && tag.trim() !== "") {
      setTags([...tags, tag]);
      setTagInput("");
      
      // Si la etiqueta no existe en las disponibles, añadirla
      if (!availableTags.includes(tag)) {
        setAvailableTags([...availableTags, tag]);
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log({
      ...formData,
      tags,
      thumbnail,
    });
  };

  return (
    <>
      <Nav />
      <div className="container mx-auto py-8 px-4 md:px-0 max-w-4xl">
        <div className="bg-dark-surface rounded-lg shadow-lg p-6 mb-8 text-dark-light">
          <h1 className="text-3xl font-bold mb-6 text-center text-dark-gold">Crear Nuevo Post</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Columna izquierda */}
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-dark-light mb-1"
                  >
                    Título
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-dark-border rounded-lg bg-dark-background text-dark-light focus:ring-2 focus:ring-dark-accent focus:border-dark-accent transition-all"
                    placeholder="Escribe un título atractivo"
                    required
                  />
                </div>
                
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-dark-light mb-1"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-dark-border rounded-lg bg-dark-background text-dark-light focus:ring-2 focus:ring-dark-accent focus:border-dark-accent transition-all"
                    rows="3"
                    placeholder="Breve descripción de tu post"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-dark-light mb-1"
                  >
                    Contenido
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-dark-border rounded-lg bg-dark-background text-dark-light focus:ring-2 focus:ring-dark-accent focus:border-dark-accent transition-all"
                    rows="6"
                    placeholder="Escribe el contenido detallado de tu post"
                    required
                  ></textarea>
                </div>
              </div>
              
              {/* Columna derecha */}
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium text-dark-light mb-1"
                  >
                    Imagen destacada
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dark-border border-dashed rounded-lg hover:bg-dark-accent/20 transition-all cursor-pointer">
                    <div className="space-y-1 text-center">
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
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <>
                          <svg
                            className="mx-auto h-12 w-12 text-dark-light"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-dark-light">
                            <label
                              htmlFor="thumbnail"
                              className="relative cursor-pointer bg-transparent rounded-md font-medium text-dark-gold hover:text-dark-gold/80 focus-within:outline-none"
                            >
                              <span>Sube una imagen</span>
                              <input
                                id="thumbnail"
                                name="thumbnail"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleThumbnailChange}
                              />
                            </label>
                            <p className="pl-1">o arrastra y suelta</p>
                          </div>
                          <p className="text-xs text-dark-light/70">
                            PNG, JPG, GIF hasta 10MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-dark-light mb-1">
                    Etiquetas
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-dark-accent text-dark-light"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-dark-light hover:bg-dark-forest hover:text-dark-gold"
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
                      className="flex-grow px-4 py-2 border border-dark-border rounded-l-lg bg-dark-background text-dark-light focus:ring-2 focus:ring-dark-accent focus:border-dark-accent transition-all"
                      placeholder="Añadir etiqueta y presionar Enter"
                    />
                    <button
                      type="button"
                      onClick={() => addTag(tagInput.trim().toLowerCase())}
                      className="px-4 py-2 bg-dark-forest text-dark-gold rounded-r-lg hover:bg-dark-forest/80 transition-all"
                    >
                      Añadir
                    </button>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-sm text-dark-light mb-2">Etiquetas sugeridas:</p>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => addTag(tag)}
                          className={`px-2 py-1 text-xs rounded-full ${
                            tags.includes(tag)
                              ? "bg-dark-accent text-dark-light"
                              : "bg-dark-background text-dark-light hover:bg-dark-accent/50"
                          }`}
                          disabled={tags.includes(tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    name="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-dark-gold focus:ring-dark-accent border-dark-border rounded bg-dark-background"
                  />
                  <label
                    htmlFor="published"
                    className="ml-2 block text-sm text-dark-light"
                  >
                    Publicar inmediatamente
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button
                type="button"
                className="mr-4 px-6 py-2.5 border border-dark-border text-dark-light font-medium rounded-lg hover:bg-dark-accent/30 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-dark-forest text-dark-gold font-medium rounded-lg hover:bg-dark-forest/80 transition-all"
              >
                Crear Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
