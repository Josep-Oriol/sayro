import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditPostBtn({ user, id }) {
  const navigate = useNavigate();

  const handlePlusClick = () => {
    if (user) {
      navigate(`/edit-post/${id}`);
    } else {
      toast.error("Debes estar logeado para poder editar un post", {
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
    <div
      title="Editar Post"
      className="fixed right-10 bottom-10 flex items-center justify-center z-50"
    >
      <button
        onClick={handlePlusClick}
        className="bg-[#1B3B2F] text-[#4ADE80] p-4 rounded-full shadow-lg hover:bg-[#1B3B2F]/80 transition cursor-pointer"
        aria-label="Editar post"
      >
        <Pencil className="w-6 h-6" />
      </button>
    </div>
  );
}

export default EditPostBtn;
