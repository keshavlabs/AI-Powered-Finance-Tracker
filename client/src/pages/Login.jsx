import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Login = () => {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-linear-to-br from-blue-100 to-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-600">
          Don't have an Account?{" "}
          <span
            className="text-blue-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
