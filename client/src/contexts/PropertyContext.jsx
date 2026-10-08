import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { propertyAPI } from "../services/api";

const PropertyContext = createContext(null);

function normalizePurpose(purpose) {
  const value = String(purpose || "").toLowerCase().trim();
  if (value.includes("rent")) return "For Rent";
  if (value.includes("sale") || value.includes("buy")) return "For Sale";
  return "For Sale";
}

function normalizeProperty(property) {
  return {
    ...property,
    purpose: normalizePurpose(property.purpose),
    price: Number(property.price) || 0,
    bedrooms: Number(property.bedrooms ?? 0),
    bathrooms: Number(property.bathrooms ?? 0),
    area: Number(property.area) || 0,
  };
}

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
const fetchProperties = async (filters = {}) => {
  try {
    setLoading(true);
    setError(null);
    const response = await propertyAPI.getAll(filters);   // ← pass filters
    setProperties(response.data.map(normalizeProperty));
  } catch (err) {
    console.error("Failed to fetch properties:", err);
    setError("Could not load properties. Is the backend running?");
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchProperties();
  }, []);

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("estatehub-favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("estatehub-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (propertyId) =>
    favorites.some((p) => String(p.id) === String(propertyId));

  const toggleFavorite = (property) => {
    setFavorites((current) => {
      const exists = current.some(
        (item) => String(item.id) === String(property.id)
      );
      if (exists) {
        return current.filter(
          (item) => String(item.id) !== String(property.id)
        );
      }
      return [...current, property];
    });
  };

  const removeFavorite = (propertyId) =>
    setFavorites((current) =>
      current.filter((p) => String(p.id) !== String(propertyId))
    );

  const clearFavorites = () => setFavorites([]);

  const addProperty = async (newProperty) => {
    const response = await propertyAPI.create(newProperty);
    const created = normalizeProperty(response.data);
    setProperties((current) => [created, ...current]);
    return created;
  };

const updateProperty = async (propertyId, updatedData) => {
  const response = await propertyAPI.update(propertyId, updatedData);
  const updated = normalizeProperty(response.data);

  setProperties((current) =>
    current.map((p) => (String(p.id) === String(propertyId) ? updated : p))
  );


  setFavorites((current) =>
    current.map((p) => (String(p.id) === String(propertyId) ? updated : p))
  );

  return updated;
};


  const deleteProperty = async (propertyId) => {
    await propertyAPI.delete(propertyId);
    setProperties((current) =>
      current.filter((p) => String(p.id) !== String(propertyId))
    );
    setFavorites((current) =>
      current.filter((p) => String(p.id) !== String(propertyId))
    );
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        setProperties,
        loading,
        error,
        fetchProperties,
        refreshProperties: fetchProperties,

        favorites,
        toggleFavorite,
        isFavorite,
        removeFavorite,
        clearFavorites,

        addProperty,
        updateProperty,
        deleteProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperties must be used inside PropertyProvider");
  }
  return context;
}