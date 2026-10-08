import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContent";

function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "font-bold text-blue-600"
        : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
    }`;

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl shadow-lg shadow-blue-600/20">
            🏠
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Estate<span className="text-blue-600">Hub</span>
            </h1>

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Find your place
            </p>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>

          <NavLink to="/properties" className={navClass}>
            Properties
          </NavLink>

          <NavLink to="/favorites" className={navClass}>
            Favorites
          </NavLink>

          {isAuthenticated && (
            <NavLink to="/dashboard" className={navClass}>
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={() => setDarkMode((previous) => !previous)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 transition hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900"
            aria-label="Toggle theme"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen((p) => !p)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-semibold text-slate-700 transition hover:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
                <span className="max-w-[120px] truncate">
                  {user?.name || "User"}
                </span>
                <span className="text-xs">▾</span>
              </button>

              {userMenuOpen && (
                <>
                  {/* Click-away overlay */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setUserMenuOpen(false)}
                  />

                  <div className="absolute right-0 z-20 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                    <Link
                      to="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="block rounded-xl px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/add-property"
                      onClick={() => setUserMenuOpen(false)}
                      className="block rounded-xl px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      Add Property
                    </Link>

                    <Link
                      to="/favorites"
                      onClick={() => setUserMenuOpen(false)}
                      className="block rounded-xl px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      My Favorites
                    </Link>

                    <hr className="my-2 border-slate-200 dark:border-slate-800" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full rounded-xl px-4 py-2.5 text-left font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl px-4 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setDarkMode((previous) => !previous)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          {isAuthenticated && (
            <div className="mb-4 flex items-center gap-3 rounded-2xl bg-blue-50 p-4 dark:bg-blue-950/30">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
              <div className="min-w-0">
                <p className="truncate font-bold text-slate-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {user?.email}
                </p>
              </div>
            </div>
          )}

          <nav className="flex flex-col gap-1">
            <NavLink
              to="/"
              end
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800"
            >
              Home
            </NavLink>

            <NavLink
              to="/properties"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800"
            >
              Properties
            </NavLink>

            <NavLink
              to="/favorites"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800"
            >
              Favorites
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800"
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/add-property"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800"
                >
                  Add Property
                </NavLink>
              </>
            )}
          </nav>

          <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-xl border border-red-300 py-3 text-center font-semibold text-red-600 dark:border-red-800 dark:text-red-400"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-3 text-center font-semibold dark:border-slate-700"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-xl bg-blue-600 py-3 text-center font-semibold text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;