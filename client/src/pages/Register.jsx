import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Register = () => {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const loading = useAuthStore((state) => state.loading);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register({ name, email, password });
      navigate("/login");
    } catch (error) {
      console.error("Register failed:", error);

      const msg = error.response?.data?.message || "Registration failed";

      alert(msg);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-linear-to-br from-green-100 to-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account 🚀
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={name}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-600">
          Already registered?{" "}
          <span
            className="text-blue-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
