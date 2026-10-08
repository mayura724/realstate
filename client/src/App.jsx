import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { PropertyProvider } from "./contexts/PropertyContext";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <PropertyProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">

        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <main>
          <AppRoutes />
        </main>

      </div>
    </PropertyProvider>
  );
}

export default App;