import { Link } from "react-router-dom";
import { useProperties } from "../contexts/PropertyContext";

function PropertyCard({ property }) {
  // If no property is provided, don't render the card
  if (!property) {
    return null;
  }

  const { toggleFavorite, isFavorite } = useProperties();


  const bedrooms = Number(property.bedrooms ?? property.beds ?? 0);
  const bathrooms = Number(property.bathrooms ?? property.baths ?? 0);
  const area = property.area ?? 0;

  // Convert price safely
  const rawPrice = property.price;

  let price = 0;

  if (typeof rawPrice === "number") {
    price = rawPrice;
  } else if (typeof rawPrice === "string") {
    price = Number(rawPrice.replace(/[^0-9.]/g, ""));
  }

  const hasPrice = Number.isFinite(price) && price > 0;

  const isRent =
    property.purpose === "Rent" ||
    property.purpose === "For Rent";

  const displayPrice = hasPrice
    ? `${price.toLocaleString()} ETB`
    : "Price unavailable";

  const favorite = isFavorite(property.id);

  
  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-slate-900">

      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden">

<img
  src={
    property.image ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  }
  alt={property.title}
  onError={(e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
  }}
  className="h-52 w-full object-cover"
/>
       
        {/* Buy / Rent badge */}
        <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-lg">
          {isRent ? "For Rent" : "For Sale"}
        </span>

        {/* Favorite button */}
        <button
          type="button"
          aria-label={
            favorite ? "Remove from favorites" : "Add to favorites"
          }
          onClick={() => toggleFavorite(property)}
          className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-2xl shadow-lg transition hover:scale-110 ${
            favorite ? "text-red-500" : "text-slate-500"
          }`}
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-7">

        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          {property.title || "Untitled Property"}
        </h3>

        {/* Location */}
        <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
          📍 {property.location || "Location unavailable"}
        </p>

        {/* Price */}
        <div className="mt-6">
          <span className="text-3xl font-extrabold text-blue-600">
            {displayPrice}
          </span>

          {isRent && hasPrice && (
            <span className="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400">
              / month
            </span>
          )}
        </div>

        {/* PROPERTY INFORMATION */}
        <div className="mt-6 flex flex-wrap items-center gap-5 text-slate-500 dark:text-slate-400">

          {/* Bedrooms */}
          <span className="flex items-center gap-2">
            <span className="text-xl">🛏️</span>
            <span className="font-medium">
              {bedrooms} {bedrooms === 1 ? "Bed" : "Beds"}
            </span>
          </span>

          {/* Bathrooms */}
          <span className="flex items-center gap-2">
            <span className="text-xl">🛁</span>
            <span className="font-medium">
              {bathrooms} {bathrooms === 1 ? "Bath" : "Baths"}
            </span>
          </span>

          {/* Area */}
          <span className="flex items-center gap-2">
            <span className="text-xl">📐</span>
            <span className="font-medium">
              {area} m²
            </span>
          </span>

        </div>

        {/* VIEW PROPERTY */}
        <Link
          to={`/properties/${property.id}`}
          className="mt-7 block rounded-2xl bg-slate-100 py-4 text-center text-lg font-semibold text-slate-700 transition hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-blue-600"
        >
          View Property →
        </Link>

      </div>
    </article>
  );
}

export default PropertyCard;