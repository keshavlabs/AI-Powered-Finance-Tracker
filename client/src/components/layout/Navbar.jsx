import { Menu } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-white px-4 py-3 shadow-sm lg:hidden">
      <div>
        <h1 className="text-lg font-semibold text-gray-800">Finance AI</h1>
        <p className="text-xs text-gray-500">Track money with clarity</p>
      </div>

      <button
        type="button"
        onClick={onMenuClick}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-100"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>
    </header>
  );
};

export default Navbar;
