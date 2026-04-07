import { NavLink, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { FiHome, FiDollarSign, FiPieChart, FiCpu, FiLogOut, FiX } from "react-icons/fi";

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    onClose();
    navigate("/login");
  };

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
      isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-gray-900/40 transition lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-white p-5 shadow-lg transition-transform duration-200 lg:static lg:z-auto lg:min-h-screen lg:w-64 lg:translate-x-0 lg:border-r lg:p-6 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Finance AI</h1>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 lg:hidden"
            aria-label="Close menu"
          >
            <FiX size={18} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          <NavLink to="/dashboard" className={navItemClass} onClick={onClose}>
            <FiHome size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/expenses" className={navItemClass} onClick={onClose}>
            <FiDollarSign size={18} />
            Expenses
          </NavLink>

          <NavLink to="/budgets" className={navItemClass} onClick={onClose}>
            <FiPieChart size={18} />
            Budgets
          </NavLink>

          <NavLink to="/ai-chat" className={navItemClass} onClick={onClose}>
            <FiCpu size={18} />
            AI Insights
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-3 rounded-lg px-3 py-3 text-left text-red-500 transition hover:bg-red-50"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
