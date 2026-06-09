import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold tracking-wide">Bank Ledger</h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "text-slate-300 hover:text-white"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/transfer"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "text-slate-300 hover:text-white"
            }
          >
            Transfer
          </NavLink>

          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "text-slate-300 hover:text-white"
            }
          >
            Transactions
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "text-slate-300 hover:text-white"
            }
          >
            Analytics
          </NavLink>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-400">Welcome</p>

              <p className="font-semibold">{user?.name}</p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="bg-slate-700 px-4 py-2 rounded-lg"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
