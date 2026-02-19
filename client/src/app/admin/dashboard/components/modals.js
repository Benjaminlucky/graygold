"use client";

import { useState, useRef, useEffect } from "react";

const inputClass =
  "w-full bg-primary-800/80 border border-primary-600/50 rounded-xl px-4 py-3 text-white text-sm placeholder:text-primary-600 outline-none focus:border-secondary-500/70 focus:ring-2 focus:ring-secondary-500/10 transition-all duration-200 font-medium";
const labelClass =
  "block text-xs font-bold text-primary-300 tracking-widest uppercase mb-2";

// ─── Image Upload Zone ────────────────────────────────────────────────────────
function ImageUploader({ images, onChange }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const processFiles = (files) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!valid.length) return;

    valid.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange((prev) => [
          ...prev,
          { file, preview: e.target.result, name: file.name },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    processFiles(e.dataTransfer.files);
  };

  const handleRemove = (index) => {
    onChange((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSetPrimary = (index) => {
    onChange((prev) => {
      const updated = [...prev];
      const [item] = updated.splice(index, 1);
      return [item, ...updated];
    });
  };

  return (
    <div className="space-y-3">
      {/* Drop Zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 ${
          dragOver
            ? "border-secondary-500 bg-secondary-500/10"
            : "border-primary-600/50 hover:border-secondary-500/50 hover:bg-primary-800/30"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => processFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary-700/60 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-primary-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="text-white text-sm font-semibold">
              Drop images here or{" "}
              <span className="text-secondary-400">browse</span>
            </p>
            <p className="text-primary-500 text-xs mt-0.5">
              PNG, JPG, WEBP — multiple allowed
            </p>
          </div>
        </div>
      </div>

      {/* Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative group rounded-xl overflow-hidden aspect-video border-2 transition-all duration-200 ${
                index === 0
                  ? "border-secondary-500 col-span-3 aspect-[16/7]"
                  : "border-primary-700/50 hover:border-primary-500"
              }`}
            >
              <img
                src={img.preview}
                alt={img.name}
                className="w-full h-full object-cover"
              />

              {/* Primary badge */}
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-secondary-500 text-white text-xs font-black px-2 py-0.5 rounded-lg">
                  Primary
                </div>
              )}

              {/* Hover actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(index)}
                    className="bg-white/20 hover:bg-secondary-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all backdrop-blur-sm flex items-center gap-1"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 3l14 9-14 9V3z"
                      />
                    </svg>
                    Set Primary
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="bg-white/20 hover:bg-red-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg transition-all backdrop-blur-sm flex items-center gap-1"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Remove
                </button>
              </div>

              {/* Image name */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                <p className="text-white text-xs truncate">{img.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <p className="text-primary-500 text-xs">
          {images.length} image{images.length > 1 ? "s" : ""} selected — first
          image is the primary display image. Hover to reorder or remove.
        </p>
      )}
    </div>
  );
}

// ─── Add / Edit Property Modal ────────────────────────────────────────────────
export function PropertyModal({ property, onClose, onSave }) {
  const isEdit = !!property?.id;

  // Parse tags properly for editing
  const parseTags = (tags) => {
    if (!tags) return "";
    if (typeof tags === "string") {
      try {
        const parsed = JSON.parse(tags);
        return Array.isArray(parsed) ? parsed.join(", ") : "";
      } catch {
        return tags;
      }
    }
    if (Array.isArray(tags)) return tags.join(", ");
    return "";
  };

  const [form, setForm] = useState({
    id: property?.id || "",
    title: property?.title || "",
    location: property?.location || "",
    city: property?.city || "",
    price: property?.price || "",
    price_display: property?.price_display || "",
    property_type: property?.property_type || "",
    category: property?.category || "ready",
    bedrooms: property?.bedrooms || "",
    bathrooms: property?.bathrooms || "",
    status: property?.status || "available",
    featured: property?.featured || false,
    tags: parseTags(property?.tags),
    description: property?.description || "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState("");

  // Update form when property changes
  useEffect(() => {
    if (property) {
      setForm({
        id: property.id || "",
        title: property.title || "",
        location: property.location || "",
        city: property.city || "",
        price: property.price || "",
        price_display: property.price_display || "",
        property_type: property.property_type || "",
        category: property.category || "ready",
        bedrooms: property.bedrooms || "",
        bathrooms: property.bathrooms || "",
        status: property.status || "available",
        featured: !!property.featured,
        tags: parseTags(property.tags),
        description: property.description || "",
      });
    }
  }, [property]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("gg_token");

      // Step 1: Upload images first if any are selected
      let uploadedImageNames = [];
      if (images.length > 0) {
        setUploadProgress("Uploading images...");
        const formData = new FormData();
        images.forEach((img) => formData.append("images[]", img.file));

        const uploadRes = await fetch(
          "http://localhost/server/controllers/upload.php",
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          },
        );
        const uploadData = await uploadRes.json();
        if (!uploadData.success) {
          setError(uploadData.message || "Image upload failed.");
          setLoading(false);
          setUploadProgress("");
          return;
        }
        uploadedImageNames = uploadData.files;
        setUploadProgress("Saving property...");
      }

      // Step 2: Prepare payload
      const payload = {
        ...form,
        // Only include new images if uploaded, otherwise backend keeps existing ones
        ...(uploadedImageNames.length > 0 && { images: uploadedImageNames }),
      };

      // Step 3: Save property
      const res = await fetch(
        "http://localhost/server/controllers/properties.php",
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();
      if (data.success) {
        onSave();
        onClose();
      } else {
        setError(data.message || "Failed to save property.");
      }
    } catch (err) {
      console.error("Full error:", err);
      setError("Server error: " + err.message);
    } finally {
      setLoading(false);
      setUploadProgress("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-primary-900 border border-primary-700/60 rounded-3xl w-full max-w-2xl my-8 shadow-2xl shadow-black/60">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary-700/50">
          <div>
            <h2 className="text-xl font-black text-white">
              {isEdit ? "Edit Property" : "Add New Property"}
            </h2>
            <p className="text-primary-400 text-sm mt-0.5">
              Fill in the property details below
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-primary-800 hover:bg-primary-700 flex items-center justify-center text-primary-400 hover:text-white transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-secondary-500/10 border border-secondary-500/30 rounded-xl p-4 text-secondary-300 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <label className={labelClass}>Property Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Ultra-Luxury 5-Bedroom Mansion in Ikoyi"
              required
              className={inputClass}
            />
          </div>

          {/* Location + City */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelClass}>Location / Area</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Ikoyi, Lagos"
                required
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Lagos"
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelClass}>Price (numeric)</label>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="450000000"
                type="number"
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Price Display</label>
              <input
                name="price_display"
                value={form.price_display}
                onChange={handleChange}
                placeholder="₦450,000,000 or Price On Request"
                className={inputClass}
              />
            </div>
          </div>

          {/* Property Type + Beds + Baths */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className={labelClass}>Property Type</label>
              <input
                name="property_type"
                value={form.property_type}
                onChange={handleChange}
                placeholder="Penthouse"
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Bedrooms</label>
              <input
                name="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                type="number"
                placeholder="4"
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Bathrooms</label>
              <input
                name="bathrooms"
                value={form.bathrooms}
                onChange={handleChange}
                type="number"
                placeholder="4"
                className={inputClass}
              />
            </div>
          </div>

          {/* Category + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelClass}>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="ready">Ready to Move In</option>
                <option value="off-plan">Off Plan</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className={labelClass}>Tags (comma-separated)</label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="Featured, New Listing, Hot Offer"
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe the property..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Images */}
          <div className="space-y-2">
            <label className={labelClass}>
              Property Images
              <span className="ml-2 text-primary-600 normal-case font-normal tracking-normal">
                (
                {isEdit
                  ? "upload new to replace existing"
                  : "optional — multiple allowed"}
                )
              </span>
            </label>
            <ImageUploader images={images} onChange={setImages} />
          </div>

          {/* Featured toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, featured: !p.featured }))}
              className={`w-11 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${form.featured ? "bg-secondary-500" : "bg-primary-700"}`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-300 ${form.featured ? "left-6" : "left-1"}`}
              />
            </button>
            <span
              className="text-sm font-semibold text-primary-300 cursor-pointer select-none"
              onClick={() => setForm((p) => ({ ...p, featured: !p.featured }))}
            >
              Mark as Featured
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-primary-700/50">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-primary-800 hover:bg-primary-700 text-primary-300 font-bold py-3.5 rounded-2xl transition-all border border-primary-700 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] bg-secondary-500 hover:bg-secondary-600 text-white font-black py-3.5 rounded-2xl transition-all shadow-lg shadow-secondary-500/20 disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  {uploadProgress || "Saving..."}
                </>
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Add Property"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── View Property Modal ──────────────────────────────────────────────────────
export function ViewPropertyModal({ property, onClose, onEdit }) {
  if (!property) return null;

  const images = Array.isArray(property.images)
    ? property.images
    : property.images
      ? JSON.parse(property.images)
      : [];

  const tags = Array.isArray(property.tags)
    ? property.tags
    : property.tags
      ? JSON.parse(property.tags)
      : [];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-primary-900 border border-primary-700/60 rounded-3xl w-full max-w-4xl my-8 shadow-2xl shadow-black/60">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary-700/50">
          <div className="flex-1">
            <h2 className="text-2xl font-black text-white">{property.title}</h2>
            <p className="text-primary-400 text-sm mt-1">
              {property.location}, {property.city}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(property)}
              className="px-4 py-2 rounded-xl bg-secondary-500/10 hover:bg-secondary-500/20 text-secondary-400 font-bold text-sm transition-all flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-primary-800 hover:bg-primary-700 flex items-center justify-center text-primary-400 hover:text-white transition-all"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden bg-primary-800 border border-primary-700/50">
                <img
                  src={`http://localhost/server/uploads/properties/${images[currentImageIndex]}`}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {images.length > 1 && (
                <>
                  {/* Navigation buttons */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all backdrop-blur-sm"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all backdrop-blur-sm"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Image indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Property Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-primary-800/60 border border-primary-700/50 rounded-xl p-4">
              <p className="text-primary-400 text-xs font-bold uppercase tracking-wider mb-1">
                Price
              </p>
              <p className="text-white text-lg font-black">
                {property.price_display ||
                  `₦${Number(property.price || 0).toLocaleString()}`}
              </p>
            </div>

            <div className="bg-primary-800/60 border border-primary-700/50 rounded-xl p-4">
              <p className="text-primary-400 text-xs font-bold uppercase tracking-wider mb-1">
                Type
              </p>
              <p className="text-white text-lg font-semibold">
                {property.property_type || "N/A"}
              </p>
            </div>

            <div className="bg-primary-800/60 border border-primary-700/50 rounded-xl p-4">
              <p className="text-primary-400 text-xs font-bold uppercase tracking-wider mb-1">
                Bedrooms
              </p>
              <p className="text-white text-lg font-semibold">
                {property.bedrooms || "N/A"}
              </p>
            </div>

            <div className="bg-primary-800/60 border border-primary-700/50 rounded-xl p-4">
              <p className="text-primary-400 text-xs font-bold uppercase tracking-wider mb-1">
                Bathrooms
              </p>
              <p className="text-white text-lg font-semibold">
                {property.bathrooms || "N/A"}
              </p>
            </div>
          </div>

          {/* Status badges */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                Category:
              </span>
              <Badge status={property.category} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">
                Status:
              </span>
              <Badge status={property.status} />
            </div>
            {property.featured && (
              <div className="px-3 py-1 bg-secondary-500/10 border border-secondary-500/30 rounded-lg">
                <span className="text-secondary-400 text-xs font-black">
                  ✦ FEATURED
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <p className="text-xs font-bold text-primary-400 uppercase tracking-wider mb-2">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary-800/60 border border-primary-700/50 rounded-lg text-primary-300 text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {property.description && (
            <div>
              <p className="text-xs font-bold text-primary-400 uppercase tracking-wider mb-2">
                Description
              </p>
              <p className="text-primary-300 text-sm leading-relaxed whitespace-pre-wrap">
                {property.description}
              </p>
            </div>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-primary-500 border-t border-primary-700/50 pt-4">
            <span>Property ID: #{property.id}</span>
            <span>•</span>
            <span>
              Created: {new Date(property.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-primary-700/50">
          <button
            onClick={onClose}
            className="w-full bg-primary-800 hover:bg-primary-700 text-primary-300 font-bold py-3 rounded-xl border border-primary-700 text-sm transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirmation Modal ────────────────────────────────────────────────
export function DeleteModal({ label, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-primary-900 border border-primary-700/60 rounded-3xl w-full max-w-sm p-8 text-center shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-secondary-500/10 border border-secondary-500/20 flex items-center justify-center mx-auto mb-5">
          <svg
            className="w-8 h-8 text-secondary-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        <h3 className="text-xl font-black text-white mb-2">Delete Property?</h3>
        <p className="text-primary-400 text-sm mb-8">
          Are you sure you want to delete{" "}
          <span className="text-white font-semibold">"{label}"</span>? This
          action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-primary-800 hover:bg-primary-700 text-primary-300 font-bold py-3 rounded-xl border border-primary-700 text-sm transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-secondary-500 hover:bg-secondary-600 text-white font-black py-3 rounded-xl text-sm transition-all shadow-lg shadow-secondary-500/20"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Badge component import - make sure you have this in your ui.jsx file
function Badge({ status }) {
  const styles = {
    ready: "bg-green-500/10 text-green-400 border-green-500/30",
    "off-plan": "bg-blue-500/10 text-blue-400 border-blue-500/30",
    available: "bg-green-500/10 text-green-400 border-green-500/30",
    reserved: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    sold: "bg-red-500/10 text-red-400 border-red-500/30",
  };

  const labels = {
    ready: "Ready",
    "off-plan": "Off Plan",
    available: "Available",
    reserved: "Reserved",
    sold: "Sold",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${styles[status] || styles.available}`}
    >
      {labels[status] || status}
    </span>
  );
}
