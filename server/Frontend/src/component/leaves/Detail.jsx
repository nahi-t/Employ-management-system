import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/leaves/Detail/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLeave(res.data.leave);
      } catch (err) {
        setError("Failed to fetch leave details");
      } finally {
        setLoading(false);
      }
    };
    fetchLeave();
  }, [id, token]);

  const changeStatus = async (leaveId, newStatus) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/leaves/update/${leaveId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        alert("Updated successfully");
        navigate("/admin-dashboard/leaves");
      } else {
        alert("Update failed");
      }
    } catch (err) {
      setError("Failed to update leave status");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!leave)
    return <p className="text-center text-gray-600">No leave details found</p>;

  const employee = leave.employeeId;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold text-teal-600 mb-4 text-center">
        Leave Detail
      </h2>

      {/* Employee Info */}
      <div className="flex items-center gap-4 border-b pb-4 mb-4">
        <img
          src={`http://localhost:5000/uploades/${employee.image}`}
          alt="Employee"
          className="w-24 h-24 rounded-full border object-cover"
        />
        <div>
          <p className="font-semibold text-lg">{employee.employeeId}</p>
          <p className="text-gray-600">{employee.designation}</p>
          <p className="text-gray-600">{employee.department?.name}</p>
        </div>
      </div>

      {/* Leave Details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Leave Type:</p>
          <p className="text-gray-700">{leave.leaveType}</p>
        </div>
        <div>
          <p className="font-semibold">Status:</p>
          {leave.status === "pending" ? (
            <div className="flex gap-2 mt-1">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={() => changeStatus(leave._id, "approved")}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => changeStatus(leave._id, "rejected")}
              >
                Reject
              </button>
            </div>
          ) : (
            <span
              className={`px-2 py-1 rounded-md text-white ${
                leave.status === "approved"
                  ? "bg-green-500"
                  : leave.status === "rejected"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            >
              {leave.status}
            </span>
          )}
        </div>
        <div>
          <p className="font-semibold">From Date:</p>
          <p className="text-gray-700">
            {new Date(leave.fromDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="font-semibold">To Date:</p>
          <p className="text-gray-700">
            {new Date(leave.toDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="font-semibold">Date of Birth:</p>
          <p className="text-gray-700">
            {new Date(employee.dateOfBirth).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="font-semibold">Marital Status:</p>
          <p className="text-gray-700">{employee.maritalStatus}</p>
        </div>
        <div className="col-span-2">
          <p className="font-semibold">Description:</p>
          <p className="text-gray-700">{leave.description}</p>
        </div>
      </div>
    </div>
  );
}
