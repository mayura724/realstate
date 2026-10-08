import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import { useProperties } from "../contexts/PropertyContext";

function Properties() {
  const { properties = [], loading, fetchProperties } = useProperties();
  const [searchParams] = useSearchParams();

  // Read current filters from URL
  const purpose = searchParams.get("purpose") || "";
  const location = searchParams.get("location") || "";
  const type = searchParams.get("type") || "";
  const minBedrooms = searchParams.get("minBedrooms") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  // Re-fetch whenever URL changes
  useEffect(() => {
    fetchProperties({
      purpose,
      location,
      type,
      minBedrooms,
      maxPrice,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  const hasFilters =
    purpose || location || type || minBedrooms || maxPrice;

  return (
    <section className="min-h-screen bg-slate-50 px-5 py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div>
          <p className="font-bold uppercase tracking-wider text-blue-600">
            EstateHub listings
          </p>

          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Find your next property
          </h1>

          <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
            Browse properties available for sale or rent.
          </p>
        </div>

        {hasFilters && (
          <div className="mt-8 rounded-3xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/30">
            <p className="font-semibold text-slate-900 dark:text-white">
              Your search
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {purpose && (
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm dark:bg-slate-900">
                  {purpose === "Rent" ? "For Rent" : "For Sale"}
                </span>
              )}

              {location && (
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm dark:bg-slate-900">
                  📍 {location}
                </span>
              )}

              {type && (
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm dark:bg-slate-900">
                  🏠 {type}
                </span>
              )}

              {minBedrooms && (
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm dark:bg-slate-900">
                  🛏️ {minBedrooms}+ Bedrooms
                </span>
              )}

              {maxPrice && (
                <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm dark:bg-slate-900">
                  💰 Under {Number(maxPrice).toLocaleString()} ETB
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-12">
          {loading ? (
            <p className="text-center text-slate-500">Loading properties...</p>
          ) : properties.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-lg dark:bg-slate-900">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                No properties found
              </p>
              <p className="mt-2 text-slate-500">
                Try adjusting your filters.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Properties;