import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

// Table columns
const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
    sortable: true,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "180px",
  },
  {
    name: "Department",
    selector: (row) => row.dep,
    sortable: true,
    width: "180px",
  },
  {
    name: "Employee ID",
    selector: (row) => row.empid,
    sortable: true,
    width: "180px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    sortable: false,
  },
];

// Attendance button component
const Atendancebutton = ({ status, data }) => {
  const navigate = useNavigate();

  const handleStatusChange = async (newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/attendance/${data._id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: `Marked ${newStatus}`,
          text: `Attendance updated successfully!`,
          timer: 1500,
          showConfirmButton: false,
        });
        // optional: reload after update
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Error updating attendance",
      });
    }
  };

  return (
    <div className="flex gap-2">
      {!status || status === "Pending" ? (
        <>
          <button
            onClick={() => handleStatusChange("Present", data.employeeId)}
            className="px-3 py-1 bg-green-600 rounded text-white hover:bg-green-700"
          >
            Present
          </button>
          <button
            onClick={() => handleStatusChange("Absent", data.employeeId)}
            className="px-3 py-1 bg-red-600 rounded text-white hover:bg-red-700"
          >
            Absent
          </button>
          <button
            onClick={() => handleStatusChange("Leave", data.employeeId)}
            className="px-3 py-1 bg-yellow-500 rounded text-white hover:bg-yellow-600"
          >
            Leave
          </button>
        </>
      ) : (
        <p
          className={`px-3 py-1 rounded text-center font-semibold ${
            status === "Present"
              ? "bg-green-100 text-green-700"
              : status === "Absent"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
};

export { Atendancebutton, columns };
