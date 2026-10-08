import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProperties } from "../contexts/PropertyContext";

function AddProperty() {
  const navigate = useNavigate();
  
  const { isAuthenticated, loading: authLoading } = useAuth();

useEffect(() => {
  if (!authLoading && !isAuthenticated) {
    navigate("/login", { state: { from: "/add-property" } });
  }
}, [isAuthenticated, authLoading, navigate]);

  const { addProperty } = useProperties();

  const [form, setForm] = useState({
    title: "",
    location: "",
    type: "House",
    purpose: "Sale",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

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

      await addProperty({
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

      alert("Property listed successfully!");
      navigate("/properties");
    } catch (err) {
      console.error("Failed to add property:", err);
      setError(
        err?.response?.data?.error ||
          "Failed to add property. Is the backend running?"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
        List Your Property
      </h1>

      <p className="mt-3 text-slate-500">
        Add your property details below.
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

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Publishing..." : "Publish Property"}
        </button>
      </form>
    </div>
  );
}

export default AddProperty;