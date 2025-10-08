import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function UserLeaves() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      if (!user?._id) return;

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/leaves/${user._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          setLeaves(res.data.data);
        } else {
          setError(res.data.message || "Failed to fetch leaves");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching leave requests");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [user]);

  if (loading) return <p className="text-center mt-6">Loading leaves...</p>;
  if (error) return <p className="text-center mt-6 text-red-600">{error}</p>;

  return (
    <div className="max-w-8xl mx-auto mt-10 bg-gradient-to-br from-white to-gray-400 shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        My Leave Requests
      </h2>

      {leaves.length === 0 ? (
        <p className="text-gray-500">No leave requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">From</th>
                <th className="px-4 py-2 text-left">To</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Requested On</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr
                  key={leave._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 capitalize">{leave.leaveType}</td>
                  <td className="px-4 py-2">
                    {new Date(leave.fromDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(leave.toDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${
                        leave.status.toLowerCase() === "pending"
                          ? "bg-gray-300 text-gray-500"
                          : leave.status.toLowerCase() === "rejected"
                          ? "bg-red-500"
                          : leave.status.toLowerCase() === "approved"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {leave.status.charAt(0).toLowerCase() +
                        leave.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-2">{leave.description}</td>
                  <td className="px-4 py-2">
                    {new Date(leave.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
