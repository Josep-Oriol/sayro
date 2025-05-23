import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreatePostBtn({ isAuthenticated }) {
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

  return (
    <div className="fixed right-10 bottom-10 flex items-center justify-center z-50">
      <button
        onClick={handlePlusClick}
        className="bg-[#1B3B2F] text-[#4ADE80] p-4 rounded-full shadow-lg hover:bg-[#1B3B2F]/80 transition"
        aria-label="Crear post"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}

export default CreatePostBtn;
