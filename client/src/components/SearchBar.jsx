import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();

  const [purpose, setPurpose] = useState("Buy");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("All");
  const [bedrooms, setBedrooms] = useState("All");
  const [budget, setBudget] = useState("All");

  const handleSearch = () => {
  const params = new URLSearchParams();

  // Backend expects "Sale" / "Rent"
  params.set("purpose", purpose === "Buy" ? "Sale" : "Rent");

  if (location.trim()) {
    params.set("location", location.trim());
  }

  if (type !== "All") {
    params.set("type", type);
  }

  if (bedrooms !== "All") {
    params.set("minBedrooms", bedrooms);
  }

  if (budget !== "All") {
    params.set("maxPrice", budget);
  }

  navigate(`/properties?${params.toString()}`);
};

  return (
    <section
      id="property-search"
      className="relative z-10 -mt-10 px-5 pb-10"
    >
      <div className="mx-auto max-w-7xl">

        <div className="rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">

          {/* BUY / RENT */}
          <div className="mb-6 flex gap-2">

            <button
              type="button"
              onClick={() => {
                setPurpose("Buy");
                setBudget("All");
              }}
              className={`rounded-xl px-7 py-3 font-bold transition ${
                purpose === "Buy"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              🏠 Buy
            </button>

            <button
              type="button"
              onClick={() => {
                setPurpose("Rent");
                setBudget("All");
              }}
              className={`rounded-xl px-7 py-3 font-bold transition ${
                purpose === "Rent"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              🏢 Rent
            </button>

          </div>

          {/* SEARCH FIELDS */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">

            {/* LOCATION */}
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="📍 Location"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />

            {/* PROPERTY TYPE */}
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="All">Property Type</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
            </select>

            {/* BEDROOMS */}
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="All">Bedrooms</option>
              <option value="1">1+ Bedroom</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </select>

            {/* BUDGET */}
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="All">Budget</option>

              {purpose === "Buy" ? (
                <>
                  <option value="1000000">Under 1M ETB</option>
                  <option value="5000000">Under 5M ETB</option>
                  <option value="10000000">Under 10M ETB</option>
                  <option value="20000000">Under 20M ETB</option>
                  <option value="30000000">Under 30M ETB</option>
                  <option value="50000000">Under 50M ETB</option>
                </>
              ) : (
                <>
                  <option value="20000">Under 20K ETB/month</option>
                  <option value="40000">Under 40K ETB/month</option>
                  <option value="60000">Under 60K ETB/month</option>
                  <option value="100000">Under 100K ETB/month</option>
                  <option value="150000">Under 150K ETB/month</option>
                  <option value="200000">Under 200K ETB/month</option>
                </>
              )}
            </select>

            {/* SEARCH */}
            <button
              type="button"
              onClick={handleSearch}
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              🔍 Search
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default SearchBar;