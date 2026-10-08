import { useAuth } from "../contexts/AuthContent";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useProperties } from "../contexts/PropertyContext";
import { propertyAPI } from "../services/api";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateProperty } = useProperties();

  const { user, isAuthenticated, loading: authLoading } = useAuth();

useEffect(() => {
  if (!authLoading && !isAuthenticated) {
    navigate("/login", { state: { from: `/properties/${id}/edit` } });
  }
}, [isAuthenticated, authLoading, navigate, id]);

  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "House",
    purpose: "Sale",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Load existing property on mount
  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true);
        const response = await propertyAPI.getOne(id);
        const p = response.data;

        setForm({
          title: p.title || "",
          location: p.location || "",
          type: p.type || "House",
          purpose: p.purpose || "Sale",
          price: p.price ?? "",
          bedrooms: p.bedrooms ?? "",
          bathrooms: p.bathrooms ?? "",
          area: p.area ?? "",
          image: p.image || "",
          description: p.description || "",
        });
      } catch (err) {
        console.error("Failed to load property:", err);
        setError(
          err?.response?.status === 404
            ? "Property not found."
            : "Failed to load property."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.title || !form.location || !form.price || !form.bedrooms) {
      setError("Please fill in the required fields.");
      return;
    }

    try {
      setSubmitting(true);

      await updateProperty(id, {
        title: form.title,
        location: form.location,
        type: form.type,
        purpose: form.purpose,
        price: Number(form.price),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        area: Number(form.area),
        image: form.image || null,
        description: form.description || null,
      });

      alert("Property updated successfully!");
      navigate(`/properties/${id}`);
    } catch (err) {
      console.error("Failed to update property:", err);
      setError(
        err?.response?.data?.error ||
          "Failed to update property. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-12 text-center">
        <p className="text-slate-500">Loading property...</p>
      </div>
    );
  }

  if (error && !form.title) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-12 text-center">
        <p className="mb-4 text-red-600">{error}</p>
        <Link
          to="/properties"
          className="text-blue-600 underline hover:text-blue-800"
        >
          ← Back to properties
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
        Edit Property
      </h1>

      <p className="mt-3 text-slate-500">
        Update the details below and save your changes.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Property title"
          required
          className="w-full rounded-xl border p-4 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full rounded-xl border p-4 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />

        <div className="grid gap-4 md:grid-cols-2">
          <select
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            className="rounded-xl border p-4 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            <option value="Sale">For Sale</option>
            <option value="Rent">For Rent</option>
          </select>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="rounded-xl border p-4 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price (ETB)"
            required
            className="rounded-xl border p-4 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />

          <input
            type="number"
            name="bedrooms"
            value={form.bedrooms}
            onChange={handleChange}
            placeholder="Bedrooms"
            required
            className="rounded-xl border p-4 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />

          <input
            type="number"
            name="bathrooms"
            value={form.bathrooms}
            onChange={handleChange}
            placeholder="Bathrooms"
            className="rounded-xl border p-4 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />

          <input
            type="number"
            name="area"
            value={form.area}
            onChange={handleChange}
            placeholder="Area (m²)"
            className="rounded-xl border p-4 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full rounded-xl border p-4 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description (optional)"
          rows={4}
          className="w-full rounded-xl border p-4 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />

        {error && (
          <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-xl bg-blue-600 py-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => navigate(`/properties/${id}`)}
            className="rounded-xl border border-slate-300 px-6 py-4 font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProperty;