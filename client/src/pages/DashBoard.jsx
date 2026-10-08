import { Link } from "react-router-dom";
import { useProperties } from "../contexts/PropertyContext";
import { useAuth } from "../contexts/AuthContent";

function Dashboard() {
  const { properties = [], favorites = [], deleteProperty } = useProperties();
  const { user } = useAuth();

  // Only MY properties
  const myProperties = properties.filter(
    (p) => user && Number(p.ownerId) === Number(user.id)
  );

  const forSale = myProperties.filter((p) => p.purpose === "Sale");
  const forRent = myProperties.filter((p) => p.purpose === "Rent");
  const totalValue = myProperties.reduce(
    (sum, p) => sum + (Number(p.price) || 0),
    0
  );

  const handleDelete = async (property) => {
    const confirmed = window.confirm(
      `Delete "${property.title}"? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await deleteProperty(property.id);
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err?.response?.data?.error || "Failed to delete property.");
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 px-5 py-12 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <p className="font-bold uppercase tracking-wider text-blue-600">
            EstateHub
          </p>

          <h1 className="mt-2 text-4xl font-extrabold text-slate-900 dark:text-white">
            Welcome back{user?.name ? `, ${user.name}` : ""}
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your listings, favorites, and account.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              My Listings
            </p>
            <p className="mt-3 text-4xl font-extrabold text-blue-600">
              {myProperties.length}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              For Sale
            </p>
            <p className="mt-3 text-4xl font-extrabold text-emerald-600">
              {forSale.length}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              For Rent
            </p>
            <p className="mt-3 text-4xl font-extrabold text-purple-600">
              {forRent.length}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Total Value
            </p>
            <p className="mt-3 text-2xl font-extrabold text-blue-600">
              {totalValue.toLocaleString()} ETB
            </p>
          </div>
        </div>

        {/* My Listings */}
        <div className="mt-12">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              My Listings
            </h2>

            <Link
              to="/add-property"
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              + Add Property
            </Link>
          </div>

          {myProperties.length === 0 ? (
            <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm dark:bg-slate-900">
              <div className="text-5xl">🏠</div>

              <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                You haven't listed any properties yet
              </h3>

              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Your listings will appear here.
              </p>

              <Link
                to="/add-property"
                className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                List Your First Property
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {myProperties.map((property) => (
                <div
                  key={property.id}
                  className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-lg dark:bg-slate-900"
                >
                  <Link to={`/properties/${property.id}`}>
                    <img
                      src={property.image}
                      alt={property.title}
                      className="h-52 w-full object-cover"
                    />
                  </Link>

                  <div className="p-6">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                      {property.purpose === "Rent" ? "For Rent" : "For Sale"}
                    </span>

                    <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
                      {property.title}
                    </h3>

                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                      📍 {property.location}
                    </p>

                    <p className="mt-4 text-2xl font-extrabold text-blue-600">
                      {Number(property.price).toLocaleString()} ETB
                    </p>

                    <div className="mt-4 flex gap-4 text-sm text-slate-500">
                      🛏️ {property.bedrooms} beds
                      <span>•</span>
                      🛁 {property.bathrooms} baths
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Link
                        to={`/properties/${property.id}/edit`}
                        className="flex-1 rounded-xl bg-blue-600 py-3 text-center font-semibold text-white hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(property)}
                        className="rounded-xl bg-red-100 px-4 py-3 font-semibold text-red-600 hover:bg-red-200 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Saved Favorites */}
        <div className="mt-12">
          <h2 className="mb-5 text-2xl font-bold text-slate-900 dark:text-white">
            Saved Favorites ({favorites.length})
          </h2>

          {favorites.length === 0 ? (
            <div className="rounded-3xl bg-white px-6 py-10 text-center shadow-sm dark:bg-slate-900">
              <p className="text-slate-500 dark:text-slate-400">
                You haven't saved any properties yet.
              </p>
              <Link
                to="/properties"
                className="mt-4 inline-block font-semibold text-blue-600 hover:underline"
              >
                Browse Properties →
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {favorites.slice(0, 3).map((property) => (
                <Link
                  key={property.id}
                  to={`/properties/${property.id}`}
                  className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-lg dark:bg-slate-900"
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {property.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {property.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {favorites.length > 3 && (
            <Link
              to="/favorites"
              className="mt-5 inline-block font-semibold text-blue-600 hover:underline"
            >
              View all favorites →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;