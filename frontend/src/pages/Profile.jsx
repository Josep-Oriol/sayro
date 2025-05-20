import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import ProfileInfo from "../components/profile/ProfileInfo";
import LikedPosts from "../components/profile/LikedPosts";
import MisPosts from "../components/profile/MisPosts";

function Profile() {
  const { user } = useAuth();
  const [section, setSection] = useState("profile");

  useEffect(() => {
    document.title = "Sayro - Perfil";
  }, []);

  if (!user) return null;

  return (
    <>
      <Nav />
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto py-10 px-4 gap-8 text-[#F5F5F5]">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4">
          <div className="bg-[#1E1E1E] rounded-lg shadow-lg p-4 space-y-3">
            {[
              { id: "profile", label: "Mi Perfil" },
              { id: "likes", label: "Likes" },
              { id: "saved", label: "Mis posts" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setSection(id)}
                className={`block w-full text-left px-4 py-2 rounded transition ${
                  section === id
                    ? "bg-[#1B3B2F] text-[#4ADE80]"
                    : "hover:bg-[#121212] text-[#A0A0A0]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <section className="flex-1">
          {section === "profile" && <ProfileInfo user={user} />}
          {section === "likes" && <LikedPosts user={user} />}
          {section === "saved" && <MisPosts />}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
