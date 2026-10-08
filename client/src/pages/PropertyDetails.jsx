import { useAuth } from "../contexts/AuthContent";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProperties } from "../contexts/PropertyContext";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties = [], deleteProperty } = useProperties();
  const { user } = useAuth();


  const property = properties.find(
    (item) => String(item.id) === String(id)
  );

  const isOwner = user && property && Number(user.id) === Number(property.ownerId);
  
  if (!property) {
    return (
      <div className="mx-auto max-w-5xl px-5 py-20 text-center">
        <div className="text-6xl">🏠</div>

        <h1 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
          Property not found
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          This property could not be found.
        </p>

        <Link
          to="/properties"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
        >
          Browse Properties
        </Link>
      </div>
    );
  }

  const price = Number(property.price) || 0;

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete "${property.title}"? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await deleteProperty(property.id);
      alert("Property deleted successfully.");
      navigate("/properties");
    } catch (err) {
      console.error("Delete failed:", err);
      alert(
        err?.response?.data?.error ||
          "Failed to delete property. Please try again."
      );
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <Link
        to="/properties"
        className="font-semibold text-blue-600 hover:text-blue-700"
      >
        ← Back to Properties
      </Link>

      <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-slate-900">
        <img
          src={property.image}
          alt={property.title}
          className="h-[450px] w-full object-cover"
        />

        <div className="p-8">
          <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white">
            {property.purpose}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold text-slate-900 dark:text-white">
            {property.title}
          </h1>

          <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
            📍 {property.location}
          </p>

          <p className="mt-6 text-3xl font-extrabold text-blue-600">
            {price.toLocaleString()} ETB
            {property.purpose === "For Rent" && (
              <span className="ml-1 text-base font-medium text-slate-500">
                / month
              </span>
            )}
          </p>

          {property.description && (
            <p className="mt-6 text-slate-600 dark:text-slate-300">
              {property.description}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-6 text-slate-600 dark:text-slate-300">
            <span>🛏️ {property.bedrooms} Bedrooms</span>
            <span>🛁 {property.bathrooms} Bathrooms</span>
            <span>📐 {property.area} m²</span>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() =>
                alert("Viewing request submitted successfully!")
              }
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
            >
              Request Viewing
            </button>

            <button
              type="button"
              onClick={() =>
                alert("Contact agent feature coming soon!")
              }
              className="rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-700 dark:border-slate-700 dark:text-white"
            >
              Contact Agent
            </button>

           {isOwner && (
  <>
    <Link
      to={`/properties/${property.id}/edit`}
      className="rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
    >
      ✏️ Edit
    </Link>

    <button
      type="button"
      onClick={handleDelete}
      className="rounded-xl border border-red-300 px-6 py-3 font-bold text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
    >
      🗑️ Delete
    </button>
  </>
)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;