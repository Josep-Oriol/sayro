import Nav from "../components/Nav";
import { useState, useEffect } from "react";
import CardPost from "../components/CardPost";
import { useAuth } from "../context/AuthContext";
import { Search, TrendingUp, Clock, X, Tag } from "lucide-react";
import Footer from "../components/Footer";
import CreatePostBtn from "../components/utils/CreatePostBtn";
import { web } from "../utils/routes";
import NoPosts from "../components/NoPosts";

function Home() {
  const POSTS_PER_PAGE = 8;

  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [categories, setCategories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const { isAuthenticated } = useAuth();

  const fetchPosts = (sort = sortBy, query = "") => {
    const baseUrl =
      sort === "popular"
        ? `${web}/api/posts/popular`
        : `${web}/api/posts/recent`;
    const url = query ? `${baseUrl}?q=${encodeURIComponent(query)}` : baseUrl;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(console.error);
  };

  const fetchPopularTags = () => {
    fetch(`${web}/api/tags/popular`)
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPosts(sortBy, searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    fetchPosts();
  };

  const handleTagClick = (tag) => {
    setSearchTerm(tag);
    fetchPosts(sortBy, tag);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    fetchPosts(value, searchTerm);
  };

  useEffect(() => {
    fetchPosts();
    fetchPopularTags();
  }, []);

  useEffect(() => {
    // Resetea visibilidad al recibir nuevos posts
    setVisibleCount(POSTS_PER_PAGE);
  }, [posts]);

  return (
    <>
      <Nav />
      <div className="container mx-auto py-10 px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-dark-gold mb-4">
            Descubre los mejores diseños
          </h1>
          <p className="text-lg text-dark-light mb-8">
            Explora trabajos de los diseñadores más talentosos y experimentados
            <br />
            listos para colaborar en tu próximo proyecto.
          </p>

          <div className="max-w-4xl mx-auto space-y-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Selector de orden */}
              <div className="relative w-full md:w-1/3">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full py-3 pl-4 pr-10 rounded-lg border border-dark-border bg-dark-background text-dark-light focus:ring-2 focus:ring-dark-accent"
                >
                  <option value="recent">Más recientes</option>
                  <option value="popular">Más gustados</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-gold">
                  {sortBy === "popular" ? <TrendingUp /> : <Clock />}
                </div>
              </div>

              {/* Buscador */}
              <form onSubmit={handleSearch} className="flex flex-1">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="¿Qué estás buscando?"
                    className="w-full py-3 px-4 rounded-l-lg border border-dark-border bg-dark-background text-dark-light"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-0 top-1/2 -translate-y-1/2 px-3"
                    >
                      <X className="text-dark-gold" />
                    </button>
                  )}
                </div>
                <button className="bg-dark-forest text-dark-gold px-6 rounded-r-lg hover:bg-dark-forest/80 transition">
                  <Search />
                </button>
              </form>
            </div>
          </div>

          {/* Etiquetas populares */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleTagClick(category.name)}
                className="flex items-center gap-1 bg-dark-background hover:bg-dark-accent/30 text-dark-light px-4 py-2 rounded-full text-sm transition"
              >
                <Tag size={14} /> {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de posts */}
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {posts.slice(0, visibleCount).map((post) => (
                <CardPost key={post._id} post={post} />
              ))}
            </div>

            {visibleCount < posts.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() =>
                    setVisibleCount((prev) => prev + POSTS_PER_PAGE)
                  }
                  className="px-6 py-3 bg-dark-forest text-dark-gold rounded-lg hover:bg-dark-forest/80 transition"
                >
                  Ver más publicaciones
                </button>
              </div>
            )}
          </>
        ) : (
          <NoPosts />
        )}
      </div>

      {isAuthenticated && <CreatePostBtn isAuthenticated={isAuthenticated} />}
      <Footer />
    </>
  );
}

export default Home;
