import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

// Attractive, responsive Settings component with Tailwind CSS, subtle motion and UX niceties.
// Requirements: Tailwind CSS, framer-motion, lucide-react. Install with:
// npm i framer-motion lucide-react

export default function Setting() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [setting, setSetting] = useState({
    userId: user?._id || "",
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    // populate userId when user loads/changes
    if (user && user._id) {
      setSetting((prev) => ({ ...prev, userId: user._id }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(""); // clear errors as user types
    setSetting((prev) => ({ ...prev, [name]: value }));
  };

  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score; // 0..4
  };

  const strengthLabels = ["", "Weak", "Okay", "Good", "Strong"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (setting.newpassword !== setting.confirmpassword) {
      setError("Passwords do not match");
      return;
    }
    if (getPasswordStrength(setting.newpassword) < 2) {
      setError(
        "Choose a stronger password (at least 8 chars + letters/numbers)"
      );
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/api/setting/cp",
        {
          userId: setting.userId,
          oldpassword: setting.oldpassword,
          newpassword: setting.newpassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data && res.data.success) {
        // Navigate based on role (use local user role) — fallback to /employee
        if (user?.role === "admin") navigate("/admin-dashboard");
        else navigate("/employee");
      } else {
        setError(res.data?.message || "Failed to change password");
      }
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Server error while changing password"
      );
    } finally {
      setLoading(false);
    }
  };

  const strength = getPasswordStrength(setting.newpassword);

  return (
    <div className=" flex items-center justify-center  p-6">
      <div className="">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-lg rounded-2xl bg-gradient-to-br from-white to-gray-400  shadow-2xl p-6 md:p-10 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                Account Settings
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Change your account password securely
              </p>
            </div>
            <div className="text-sm text-gray-600">
              Signed in as{" "}
              <span className="font-medium">
                {user?.name || user?.email || "Guest"}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 p-2 rounded">
                {error}
              </div>
            )}

            {/* Old password */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Old Password
              </label>
              <input
                name="oldpassword"
                value={setting.oldpassword}
                onChange={handleChange}
                type={showOld ? "text" : "password"}
                placeholder="Enter current password"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
              <button
                type="button"
                onClick={() => setShowOld((s) => !s)}
                className="absolute right-3 top-9 p-1"
                aria-label={showOld ? "Hide old password" : "Show old password"}
              >
                {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* New password */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                New Password
              </label>
              <input
                name="newpassword"
                value={setting.newpassword}
                onChange={handleChange}
                type={showNew ? "text" : "password"}
                placeholder="Choose a strong password"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
              <button
                type="button"
                onClick={() => setShowNew((s) => !s)}
                className="absolute right-3 top-9 p-1"
                aria-label={showNew ? "Hide new password" : "Show new password"}
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>

              {/* Strength bar */}
              <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
                <div className="flex-1 mr-3">
                  <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                    <div
                      style={{ width: `${(strength / 4) * 100}%` }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        strength <= 1
                          ? "bg-rose-500"
                          : strength === 2
                          ? "bg-orange-400"
                          : strength === 3
                          ? "bg-amber-400"
                          : "bg-emerald-500"
                      }`}
                    />
                  </div>
                </div>
                <div className="w-20 text-right">
                  {strengthLabels[strength]}
                </div>
              </div>
            </div>

            {/* Confirm password */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Confirm Password
              </label>
              <input
                name="confirmpassword"
                value={setting.confirmpassword}
                onChange={handleChange}
                type={showConfirm ? "text" : "password"}
                placeholder="Re-type the new password"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-9 p-1"
                aria-label={
                  showConfirm
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-teal-600"
                />
                <span className="ml-2">Remember this device</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  /* TODO: implement forgot password flow */
                }}
                className="text-sm text-teal-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className={`w-full py-2 rounded-xl text-white font-semibold shadow-md transform transition-colors ${
                loading
                  ? "bg-teal-300 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Change Password"}
            </motion.button>
          </form>

          <p className="text-xs text-gray-500 mt-4">
            Tip: use at least 8 characters, a mix of uppercase, numbers and
            symbols for best security.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
