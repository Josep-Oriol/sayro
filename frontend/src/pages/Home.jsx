import Nav from "../components/Nav";
import { useState, useEffect } from "react";
import Post from "../components/CardPost";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handlePlusClick = () => {
    if (isAuthenticated) {
      navigate("/create-post");
    } else {
      toast.error("Debes estar logeado para poder crear un post", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/posts/recent")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Nav />
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Recent Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
      {isAuthenticated && (
        <div className="fixed right-10 bottom-10 flex items-center justify-center z-50">
          <button
            onClick={handlePlusClick}
            className="bg-white text-black p-4 rounded-full shadow-lg hover:bg-gray-200 transition"
            aria-label="Ir a registro"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
}

export default Home;
