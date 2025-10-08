import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const columns = [
  {
    name: "s no",
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
    name: " Department Name",
    selector: (row) => row.dep,
    sortable: true,
    width: "180px",
  },
  {
    name: "image",
    selector: (row) => row.profile,
    width: "190px",
  },
  {
    name: "Date of Birth",
    selector: (row) => <span>{new Date(row.dob).toLocaleDateString()}</span>,
    sortable: false,
    width: "150px",
  },

  {
    name: "Action",
    selector: (row) => row.action,
    sortable: true,
  },
];

const Empbutton = ({ id }) => {
  const navigate = useNavigate();

  return (
    <div className=" flex gap-2 ">
      <button
        className="px-4 py-1 bg-teal-600 rounded text-white"
        onClick={() => navigate(`/admin-dashboard/employees/View/${id}`)}
      >
        viwe
      </button>
      <button
        className="px-4 py-1 bg-blue-600 rounded text-white"
        onClick={() => navigate(`/admin-dashboard/employees/Edit/${id}`)}
      >
        Edit
      </button>
      <button
        className="px-4 py-1 bg-yellow-600 rounded text-white"
        onClick={() => navigate(`/admin-dashboard/salary/view/${id}`)}
      >
        Salary
      </button>
      <button
        className="px-4 py-1 bg-red-600 rounded text-white"
        onClick={() => navigate(`/admin-dashboard/leaves/${id}`)}
      >
        Leave
      </button>
    </div>
  );
};
export { Empbutton, columns };
