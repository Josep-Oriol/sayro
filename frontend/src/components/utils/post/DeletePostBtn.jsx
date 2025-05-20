import { Trash } from "lucide-react";
import { web } from "../../../utils/routes.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function DeletePostBtn({ postId }) {
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    fetch(`${web}/api/posts/${postId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          navigate("/");
        }
      })
      .catch(console.error);
  };

  return (
    <div
      title="Eliminar Post"
      className="fixed right-10 bottom-30 flex items-center justify-center z-50"
    >
      <button
        onClick={handleDeleteClick}
        className="bg-[#EF4444] text-[#F5F5F5] p-4 rounded-full shadow-lg hover:bg-[#DC2626] transition cursor-pointer"
        aria-label="Eliminar post"
      >
        <Trash className="w-6 h-6 stroke-white" />
      </button>
    </div>
  );
}

export default DeletePostBtn;
