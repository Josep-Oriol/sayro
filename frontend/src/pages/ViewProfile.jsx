import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { web } from "../utils/routes";
import { toast } from "react-toastify";
import CardProfilePosts from "../components/profile/CardProfilePost";
import { Copy } from "lucide-react";

function ViewProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    document.title = `Sayro - Perfil de ${username}`;
  }, [username]);

  useEffect(() => {
    fetch(`${web}/api/users/profile/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setPosts(data.posts);
      })
      .catch((err) => {
        console.error("Error al obtener el perfil:", err);
      });
  }, [username]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("¡Enlace del perfil copiado!");
  };

  if (!user) {
    return (
      <div className="text-center py-20 text-[#A0A0A0]">Cargando perfil...</div>
    );
  }

  return (
    <>
      <Nav />

      <div className="min-h-screen bg-[#121212] mx-auto px-4 md:px-8 py-10 text-[#F5F5F5]">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#4ADE80] mb-2">
            Perfil de usuario
          </h1>
          <div
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 text-[#4ADE80] font-semibold cursor-pointer hover:underline"
            title="Haz clic para copiar el enlace del perfil"
          >
            @{user.username}
            <Copy size={16} />
          </div>
          <p className="text-[#A0A0A0] mt-1">
            Miembro desde {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-6 py-2 rounded-full transition ${
              activeTab === "posts"
                ? "bg-[#4ADE80] text-[#121212]"
                : "bg-[#121212] text-[#A0A0A0] border border-[#2D2D2D]"
            }`}
          >
            Publicaciones
          </button>
          <button
            onClick={() => setActiveTab("liked")}
            className={`px-6 py-2 rounded-full transition ${
              activeTab === "liked"
                ? "bg-[#4ADE80] text-[#121212]"
                : "bg-[#121212] text-[#A0A0A0] border border-[#2D2D2D]"
            }`}
          >
            Me gusta
          </button>
        </div>

        {activeTab === "posts" ? (
          posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <CardProfilePosts key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-[#A0A0A0]">
              No tiene publicaciones aún.
            </p>
          )
        ) : user.likedPosts && user.likedPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {user.likedPosts.map((post) => (
              <CardProfilePosts key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-[#A0A0A0]">
            No ha dado me gusta a ninguna publicación.
          </p>
        )}
      </div>

      <Footer />
    </>
  );
}

export default ViewProfile;
