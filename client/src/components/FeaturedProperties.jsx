import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import { useProperties } from "../contexts/PropertyContext";

function FeaturedProperties() {
  const { properties } = useProperties();

  const featuredProperties = properties.slice(0, 3);

  return (
    <section className="bg-slate-50 py-20 dark:bg-slate-950">

      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Heading */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <p className="font-bold uppercase tracking-wider text-blue-600">
              Featured listings
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl dark:text-white">
              Properties you might love
            </h2>

            <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
              Explore some of our newest and most popular property listings.
            </p>
          </div>

          <Link
            to="/properties"
            className="w-fit rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            View all properties →
          </Link>

        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedProperties;