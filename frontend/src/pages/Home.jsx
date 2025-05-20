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

  useEffect(() => {
    document.title = "Sayro - Inicio";
  }, []);

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
    setVisibleCount(POSTS_PER_PAGE);
  }, [posts]);

  return (
    <>
      <Nav />
      <div className="bg-[#121212] min-h-screen text-[#F5F5F5]">
        <div className="container mx-auto py-10 px-4 md:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-[#4ADE80]">
              Explora los mejores diseños
            </h1>
            <p className="text-lg text-[#A0A0A0] mb-8">
              Encuentra inspiración y conecta con diseñadores increíbles para tu
              próximo proyecto.
            </p>

            <div className="max-w-4xl mx-auto space-y-4 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Selector de orden */}
                <div className="relative w-full md:w-1/3">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="w-full py-3 pl-4 pr-10 rounded-lg border border-[#2D2D2D] bg-[#1E1E1E] text-[#F5F5F5] focus:ring-2 focus:ring-[#4ADE80]"
                  >
                    <option value="recent">Más recientes</option>
                    <option value="popular">Más gustados</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4ADE80]">
                    {sortBy === "popular" ? <TrendingUp /> : <Clock />}
                  </div>
                </div>

                {/* Buscador */}
                <form onSubmit={handleSearch} className="flex flex-1">
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Buscar diseños..."
                      className="w-full py-3 px-4 rounded-l-lg border border-[#2D2D2D] bg-[#1E1E1E] text-[#F5F5F5] placeholder-[#666]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={handleClearSearch}
                        className="absolute right-0 top-1/2 -translate-y-1/2 px-3"
                      >
                        <X className="text-[#4ADE80]" />
                      </button>
                    )}
                  </div>
                  <button className="bg-[#4ADE80] text-[#121212] px-6 rounded-r-lg hover:bg-[#22C55E] transition">
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
                  className="flex items-center gap-1 bg-[#1E1E1E] hover:bg-[#2D2D2D] text-[#F5F5F5] px-4 py-2 rounded-full text-sm transition"
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
                    className="px-6 py-3 bg-[#4ADE80] text-[#121212] rounded-lg hover:bg-[#22C55E] transition"
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
      </div>
    </>
  );
}

export default Home;
