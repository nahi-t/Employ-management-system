import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        setSuccess("Login successful!");
        login(response.data);

        localStorage.setItem("token", response.data.token);
        if (response.data.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee");
        }
        // Optionally auto-hide success after 3 seconds:
        setTimeout(() => setSuccess(null), 2000);
      }
    } catch (err) {
      setSuccess(null);
      if (err.response && !err.response.data.success) {
        setError(err.response.data.message);
      } else {
        setError("Login failed ");
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center h-screen justify-items-center bg-gradient-to-b
      from-teal-600 from-50% to-gray-100 to-50% space-y-6"
    >
      <h2 className="font-Pacifico text-3xl text-white py-8">
        Employee management system
      </h2>

      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {/* Success / Error Messages */}
        {success ? (
          <p className="text-green-600 font-semibold mb-4 bg-green-100 p-2 rounded">
            {success}
          </p>
        ) : error ? (
          <p className="text-red-600 font-semibold mb-4 bg-red-100 p-2 rounded">
            {error}
          </p>
        ) : null}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full border px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full border px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <label htmlFor="rememberMe" className="inline-flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="form-checkbox"
              />
              <span className="ml-2 text-gray-700">Remember Me</span>
            </label>
            <a href="#" className="text-sm text-teal-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
