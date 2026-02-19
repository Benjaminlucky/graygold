"use client";

import { useDashboard } from "../layout";
import { StatCard, Badge } from "./ui";

export default function OverviewSection() {
  const { properties, inquiries, contacts, subscribers } = useDashboard();

  const stats = [
    {
      label: "Total Properties",
      value: properties.length,
      color: "bg-secondary-500",
      trend: 12,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      ),
    },
    {
      label: "New Inquiries",
      value: inquiries.filter((i) => i.status === "new").length,
      color: "bg-blue-500",
      trend: 8,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      ),
    },
    {
      label: "Messages",
      value: contacts.length,
      color: "bg-purple-500",
      trend: -3,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      ),
    },
    {
      label: "Subscribers",
      value: subscribers.length,
      color: "bg-green-500",
      trend: 21,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Recent activity panels */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent inquiries */}
        <div className="bg-primary-900/60 border border-primary-700/50 rounded-2xl p-6">
          <h3 className="text-white font-black mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary-500" />
            Recent Inquiries
          </h3>
          {inquiries.slice(0, 4).map((inq) => (
            <div
              key={inq.id}
              className="flex items-center gap-3 py-3 border-b border-primary-800/60 last:border-0"
            >
              <div className="w-8 h-8 rounded-lg bg-primary-800 flex items-center justify-center text-xs font-black text-primary-300 flex-shrink-0">
                {inq.first_name?.[0]}
                {inq.last_name?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">
                  {inq.first_name} {inq.last_name}
                </p>
                <p className="text-primary-500 text-xs truncate">{inq.email}</p>
              </div>
              <Badge status={inq.status} />
            </div>
          ))}
          {inquiries.length === 0 && (
            <p className="text-primary-500 text-sm">No inquiries yet.</p>
          )}
        </div>

        {/* Recent properties */}
        <div className="bg-primary-900/60 border border-primary-700/50 rounded-2xl p-6">
          <h3 className="text-white font-black mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Recent Properties
          </h3>
          {properties.slice(0, 4).map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 py-3 border-b border-primary-800/60 last:border-0"
            >
              <div className="w-8 h-8 rounded-lg bg-secondary-500/10 border border-secondary-500/20 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-secondary-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">
                  {p.title}
                </p>
                <p className="text-primary-500 text-xs">{p.location}</p>
              </div>
              <Badge status={p.status} />
            </div>
          ))}
          {properties.length === 0 && (
            <p className="text-primary-500 text-sm">No properties yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
