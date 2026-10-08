import PropertyCard from "../components/PropertyCard";
import { useProperties } from "../contexts/PropertyContext";

function Favorites() {
  const { favorites } = useProperties();

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-16 dark:bg-slate-950 lg:px-8">

      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <p className="mb-3 font-bold uppercase tracking-[0.2em] text-blue-600">
            Your collection
          </p>

          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
            Favorite Properties
          </h1>

          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Properties you've saved for later.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center dark:border-slate-700 dark:bg-slate-900">

            <div className="mb-4 text-5xl">
              ♡
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              No favorites yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-slate-500 dark:text-slate-400">
              Browse properties and click the heart icon to save
              properties you like.
            </p>

          </div>
        ) : (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>

        )}

      </div>

    </main>
  );
}

export default Favorites;