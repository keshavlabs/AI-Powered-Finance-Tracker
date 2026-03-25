import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../services/authService";

import {
  FiHome,
  FiDollarSign,
  FiPieChart,
  FiCpu,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col p-6">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600 mb-10">Finance AI</h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 flex-grow">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition
            ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`
          }
        >
          <FiHome size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition
            ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`
          }
        >
          <FiDollarSign size={18} />
          Expenses
        </NavLink>

        <NavLink
          to="/budgets"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition
            ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`
          }
        >
          <FiPieChart size={18} />
          Budgets
        </NavLink>

        <NavLink
          to="/ai-chat"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition
            ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`
          }
        >
          <FiCpu size={18} />
          AI Insights
        </NavLink>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 mt-6 text-red-500 hover:bg-red-50 rounded-lg"
      >
        <FiLogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
