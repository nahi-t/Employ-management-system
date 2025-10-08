import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function Viewsalary() {
  const { id } = useParams();
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const baseURL =
    import.meta?.env?.VITE_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost:5000";

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseURL}/api/salary/get/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res);
        if (res.data.success && Array.isArray(res.data.data)) {
          setSalaries(res.data.data);
        } else {
          setError("No salary records found for this employee");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load salary records");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSalaries();
  }, [baseURL, id]);

  if (loading) return <p className="text-center mt-8">Loading…</p>;
  if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-gradient-to-br from-white to-gray-400   shadow-lg rounded-2xl p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Salary Records for Employee&nbsp;
        {user.name}
      </h2>

      <table className="min-w-full text-sm divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left font-semibold">Basic</th>
            <th className="px-4 py-2 text-left font-semibold">Allowance</th>
            <th className="px-4 py-2 text-left font-semibold">Deduction</th>
            <th className="px-4 py-2 text-left font-semibold">Net Salary</th>
            <th className="px-4 py-2 text-left font-semibold">Pay Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {salaries.map((sal) => (
            <tr key={sal._id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{sal.basicSalary}</td>
              <td className="px-4 py-2">{sal.allowance}</td>
              <td className="px-4 py-2">{sal.deduction}</td>
              <td className="px-4 py-2 font-semibold text-green-700">
                {sal.netSalary}
              </td>
              <td className="px-4 py-2">
                {new Date(sal.payDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {salaries.length === 0 && (
        <p className="text-center mt-4 text-gray-500">
          No salary records for this employee.
        </p>
      )}
    </div>
  );
}
