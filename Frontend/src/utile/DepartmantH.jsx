import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

const columns = [
  {
    name: "s no",
    selector: (row) => row.sno,
    sortable: true,
  },
  {
    name: "Department Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
    sortable: true,
  },
];

const Depbutton = ({ id, onDepDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    // ✅ Fancy confirmation popup
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:5000/api/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        onDepDelete(id);
        toast.success("✅ Department deleted successfully!");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("❌ Error deleting department");
    }
  };

  return (
    <div className="flex gap-2 bg-gradient-to-br from-white to-gray-400 ">
      <button
        className="px-4 py-1 bg-teal-600 rounded text-white"
        onClick={() => navigate(`/admin-dashboard/department/edit/${id}`)}
      >
        Edit
      </button>
      <button
        className="px-4 py-1 bg-red-600 rounded text-white"
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};

export { Depbutton, columns };
