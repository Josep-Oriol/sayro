import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import ProfileInfo from "../components/profile/ProfileInfo";
import LikedPosts from "../components/profile/LikedPosts";
import SavedPosts from "../components/profile/SavedPosts";

function Profile() {
  const { user } = useAuth();
  const [section, setSection] = useState("profile");

  if (!user) return null;

  return (
    <>
      <Nav />
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto py-10 px-4 gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4">
          <div className="bg-dark-surface rounded-lg shadow-lg p-4 space-y-3">
            <button
              onClick={() => setSection("profile")}
              className={`block w-full text-left px-4 py-2 rounded ${
                section === "profile"
                  ? "bg-dark-forest text-dark-gold"
                  : "hover:bg-dark-background"
              }`}
            >
              Mi Perfil
            </button>
            <button
              onClick={() => setSection("likes")}
              className={`block w-full text-left px-4 py-2 rounded ${
                section === "likes"
                  ? "bg-dark-forest text-dark-gold"
                  : "hover:bg-dark-background"
              }`}
            >
              Likes
            </button>
            <button
              onClick={() => setSection("saved")}
              className={`block w-full text-left px-4 py-2 rounded ${
                section === "saved"
                  ? "bg-dark-forest text-dark-gold"
                  : "hover:bg-dark-background"
              }`}
            >
              Guardados
            </button>
          </div>
        </aside>

        {/* Gesiton de secciones */}
        <section className="flex-1">
          {section === "profile" && <ProfileInfo user={user} />}
          {section === "likes" && <LikedPosts user={user} />}
          {section === "saved" && <SavedPosts user={user} />}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
