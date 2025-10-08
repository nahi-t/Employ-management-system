import { useNavigate } from "react-router-dom";

const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    sortable: true,
    width: "70px",
  },
  {
    name: "Emp Id",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "180px",
  },
  {
    name: "Department Name",
    selector: (row) => row.dep,
    sortable: true,
    width: "180px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType, // ✅ fixed key
    sortable: true,
    width: "180px",
  },
  {
    name: "Date ask for leave",
    selector: (row) =>
      row.dob ? new Date(row.dob).toLocaleDateString() : "N/A",
    sortable: false,
    width: "150px",
  },
  {
    name: "Days",
    selector: (row) => row.days, // ✅ shows duration
    sortable: true,
    width: "100px",
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    width: "150px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    sortable: false,
  },
];

const Leavebutton = ({ id }) => {
  const navigate = useNavigate();
  const handleLeave = () => {
    navigate(`/admin-dashboard/leaves/${id}`);
  };

  return (
    <div className=" flex gap-2 ">
      <button
        className="px-4 py-1 bg-teal-600 rounded text-white"
        onClick={handleLeave}
      >
        view
      </button>
    </div>
  );
};
export { Leavebutton, columns };
