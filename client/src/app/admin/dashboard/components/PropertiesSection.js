"use client";

import { useState } from "react";
import { useDashboard } from "../layout";
import { Badge } from "./ui";
import { PropertyModal, DeleteModal, ViewPropertyModal } from "./modals";

export default function PropertiesSection() {
  const { properties, setProperties, refreshData } = useDashboard();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewProperty, setViewProperty] = useState(null);

  const filtered = properties.filter((p) => {
    const matchSearch =
      !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const handleDelete = async () => {
    const token = localStorage.getItem("gg_token");
    try {
      const res = await fetch(
        "http://localhost/server/controllers/properties.php",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: deleteTarget.id }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setProperties((prev) => prev.filter((p) => p.id !== deleteTarget.id));
        setDeleteTarget(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (property) => {
    setViewProperty(null);
    setEditingProperty(property);
    setShowModal(true);
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex gap-3 flex-1">
          {/* Search */}
          <div className="flex-1 max-w-sm flex items-center gap-2 bg-primary-900/60 border border-primary-700/50 rounded-xl px-4 py-2.5">
            <svg
              className="w-4 h-4 text-primary-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search properties..."
              className="flex-1 bg-transparent text-white text-sm placeholder:text-primary-600 outline-none"
            />
          </div>
          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-primary-900/60 border border-primary-700/50 text-primary-300 text-sm rounded-xl px-3 py-2.5 outline-none focus:border-secondary-500/50"
          >
            <option value="all">All</option>
            <option value="ready">Ready</option>
            <option value="off-plan">Off Plan</option>
          </select>
        </div>

        {/* Add button */}
        <button
          onClick={() => {
            setEditingProperty(null);
            setShowModal(true);
          }}
          className="bg-secondary-500 hover:bg-secondary-600 text-white font-black text-sm px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-secondary-500/20 flex items-center gap-2 flex-shrink-0"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Property
        </button>
      </div>

      {/* Table */}
      <div className="bg-primary-900/60 border border-primary-700/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary-700/50">
                {[
                  "Title",
                  "Location",
                  "Category",
                  "Price",
                  "Status",
                  "Featured",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-4 text-xs font-bold text-primary-400 tracking-widest uppercase whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-800/40">
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-primary-800/30 transition-colors"
                >
                  <td className="px-4 py-4">
                    <p className="text-white text-sm font-semibold max-w-[200px] truncate">
                      {p.title}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-primary-400 text-sm whitespace-nowrap">
                    {p.location}
                  </td>
                  <td className="px-4 py-4">
                    <Badge status={p.category} />
                  </td>
                  <td className="px-4 py-4 text-white text-sm font-semibold whitespace-nowrap">
                    {p.price_display || `₦${Number(p.price).toLocaleString()}`}
                  </td>
                  <td className="px-4 py-4">
                    <Badge status={p.status} />
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-xs font-bold ${p.featured ? "text-secondary-400" : "text-primary-600"}`}
                    >
                      {p.featured ? "✦ Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewProperty(p)}
                        className="w-8 h-8 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 flex items-center justify-center transition-all"
                        title="View"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          setEditingProperty(p);
                          setShowModal(true);
                        }}
                        className="w-8 h-8 rounded-lg bg-primary-700/60 hover:bg-primary-600 text-primary-300 hover:text-white flex items-center justify-center transition-all"
                        title="Edit"
                      >
                        <svg
                          className="w-3.5 h-3.5"
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
                      </button>
                      <button
                        onClick={() => setDeleteTarget(p)}
                        className="w-8 h-8 rounded-lg bg-secondary-500/10 hover:bg-secondary-500/20 text-secondary-400 flex items-center justify-center transition-all"
                        title="Delete"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-primary-500 font-semibold">
              No properties found.
            </p>
            <button
              onClick={() => {
                setEditingProperty(null);
                setShowModal(true);
              }}
              className="mt-4 text-secondary-400 text-sm font-bold hover:text-secondary-300 transition-colors"
            >
              + Add your first property
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal && (
        <PropertyModal
          property={editingProperty}
          onClose={() => {
            setShowModal(false);
            setEditingProperty(null);
          }}
          onSave={refreshData}
        />
      )}
      {viewProperty && (
        <ViewPropertyModal
          property={viewProperty}
          onClose={() => setViewProperty(null)}
          onEdit={handleEdit}
        />
      )}
      {deleteTarget && (
        <DeleteModal
          label={deleteTarget.title}
          onConfirm={handleDelete}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
