import Nav from "../components/Nav";
import { useState, useEffect } from "react";
import CardPost from "../components/CardPost";
import { useAuth } from "../context/AuthContext";
import { Plus, Search, TrendingUp, Clock, X } from "lucide-react";
import Footer from "../components/Footer";
import CreatePostBtn from "../components/utils/CreatePostBtn";
import { web } from "../utils/routes";
import NoPosts from "../components/NoPosts";

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [categories, setCategories] = useState([]);
  const { isAuthenticated } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPosts(sortBy, searchTerm);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    fetchPosts(value, searchTerm);
  };

  const fetchPosts = (sort = sortBy, query = "") => {
    const baseUrl =
      sort === "popular"
        ? `${web}/api/posts/popular`
        : `${web}/api/posts/recent`;

    const url = query ? `${baseUrl}?q=${encodeURIComponent(query)}` : baseUrl;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));

    console.log(posts);
  };

  const fetchPopularTags = () => {
    fetch(`${web}/api/tags/popular`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  };

  const handleTagClick = (tag) => {
    setSearchTerm(tag);
    fetchPosts(sortBy, tag);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPopularTags();
  }, []);

  return (
    <>
      <Nav />
      <div className="container mx-auto py-8 px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-dark-gold">
            Descubre los mejores diseños
          </h1>
          <p className="text-lg text-dark-light mb-8">
            Explora trabajos de los diseñadores más talentosos y experimentados
            <br />
            listos para colaborar en tu próximo proyecto
          </p>

          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Selector de ordenamiento */}
              <div className="flex md:w-1/4">
                <div className="relative w-full">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="w-full py-3 px-4 rounded-lg border border-dark-border bg-dark-background text-dark-light focus:outline-none focus:ring-2 focus:ring-dark-accent focus:border-dark-accent appearance-none"
                  >
                    <option value="recent">Más recientes</option>
                    <option value="popular">Más gustados</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    {sortBy === "popular" ? (
                      <TrendingUp className="h-5 w-5 text-dark-gold" />
                    ) : (
                      <Clock className="h-5 w-5 text-dark-gold" />
                    )}
                  </div>
                </div>
              </div>

              {/* Buscador */}
              <form
                onSubmit={handleSearch}
                className="flex items-center md:w-3/4"
              >
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="¿Qué estás buscando?"
                    className="w-full py-3 px-4 pr-10 rounded-l-lg border border-dark-border bg-dark-background text-dark-light focus:outline-none focus:ring-2 focus:ring-dark-accent focus:border-dark-accent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-dark-forest text-dark-gold py-3 px-4 rounded-r-lg hover:bg-dark-forest/80 transition"
                    >
                      <X className="w-5 h-5" onClick={handleClearSearch} />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-dark-forest text-dark-gold py-3 px-6 rounded-r-lg hover:bg-dark-forest/80 transition"
                >
                  <Search className="w-5 h-5" onClick={handleSearch} />
                </button>
              </form>
            </div>
          </div>

          {/* Tags populares */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className="bg-dark-background hover:bg-dark-accent/30 text-dark-light px-4 py-2 rounded-full text-sm transition"
                onClick={() => {
                  handleTagClick(category.name);
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <CardPost key={post._id} post={post} />
            ))}
          </div>
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
