import React, { useEffect, useState } from "react";
import Summurycard from "./Summurycard";
import axios from "axios";
import {
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUser,
} from "react-icons/fa";

function Adminsummery() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchSummary = async () => {
      try {
        // ✅ FIXED URL (use colon, not slash)
        const res = await axios.get("http://localhost:5000/api/dashbord/summ", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSummary(res.data);
      } catch (error) {
        console.error("Error fetching summary:", error);

        // ✅ FIXED: use error.response instead of error.res
        if (error.response) {
          alert(error.response.data.error || "Server error occurred");
        } else {
          alert(
            "Connection refused. Make sure your backend is running on port 5000."
          );
        }
      }
    };

    fetchSummary();
  }, []);

  if (!summary) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>

      {/* 🟢 Employee, Department, and Salary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 bg-gradient-to-br from-white to-gray-400 p-4 rounded-2xl shadow">
        <Summurycard
          icon={<FaUser />}
          text="Total Employees"
          number={summary.totalemp}
          color="bg-teal-600"
        />
        <Summurycard
          icon={<FaUser />}
          text="Total Departments"
          number={summary.totaldep}
          color="bg-yellow-600"
        />
        <Summurycard
          icon={<FaMoneyBillWave />}
          text="Total Salary"
          number={summary.totasalary}
          color="bg-blue-600"
        />
      </div>

      {/* 🟣 Leave Summary */}
      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Summurycard
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={summary.leavesummry?.applidfor || 0}
            color="bg-purple-600"
          />
          <Summurycard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={summary.leavesummry?.approved || 0}
            color="bg-green-600"
          />
          <Summurycard
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={summary.leavesummry?.pending || 0}
            color="bg-yellow-600"
          />
          <Summurycard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={summary.leavesummry?.rejected || 0}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
}

export default Adminsummery;
