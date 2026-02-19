"use client";

import { useDashboard } from "../layout";
import { Badge } from "./ui";

// ─── Inquiries Section ────────────────────────────────────────────────────────
export function InquiriesSection() {
  const { inquiries } = useDashboard();

  return (
    <div className="bg-primary-900/60 border border-primary-700/50 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary-700/50">
              {[
                "Name",
                "Email",
                "Phone",
                "Type",
                "Location Pref",
                "Budget",
                "Status",
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
            {inquiries.map((inq) => (
              <tr
                key={inq.id}
                className="hover:bg-primary-800/30 transition-colors"
              >
                <td className="px-4 py-4">
                  <p className="text-white text-sm font-semibold">
                    {inq.first_name} {inq.last_name}
                  </p>
                </td>
                <td className="px-4 py-4 text-primary-400 text-sm">
                  {inq.email}
                </td>
                <td className="px-4 py-4 text-primary-400 text-sm whitespace-nowrap">
                  {inq.phone}
                </td>
                <td className="px-4 py-4 text-primary-300 text-sm capitalize">
                  {inq.inquiry_type}
                </td>
                <td className="px-4 py-4 text-primary-300 text-sm">
                  {inq.location}
                </td>
                <td className="px-4 py-4 text-primary-300 text-sm">
                  {inq.max_budget}
                </td>
                <td className="px-4 py-4">
                  <Badge status={inq.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {inquiries.length === 0 && (
        <div className="py-16 text-center text-primary-500 font-semibold">
          No inquiries yet.
        </div>
      )}
    </div>
  );
}

// ─── Contacts Section ─────────────────────────────────────────────────────────
export function ContactsSection() {
  const { contacts } = useDashboard();

  return (
    <div className="bg-primary-900/60 border border-primary-700/50 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary-700/50">
              {["Name", "Email", "Phone", "Type", "Message", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-4 text-xs font-bold text-primary-400 tracking-widest uppercase"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-800/40">
            {contacts.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-primary-800/30 transition-colors"
              >
                <td className="px-4 py-4">
                  <p className="text-white text-sm font-semibold">
                    {c.first_name} {c.last_name}
                  </p>
                </td>
                <td className="px-4 py-4 text-primary-400 text-sm">
                  {c.email}
                </td>
                <td className="px-4 py-4 text-primary-400 text-sm">
                  {c.phone}
                </td>
                <td className="px-4 py-4 text-primary-300 text-sm capitalize">
                  {c.inquiry_type}
                </td>
                <td className="px-4 py-4">
                  <p className="text-primary-300 text-sm max-w-[200px] truncate">
                    {c.message}
                  </p>
                </td>
                <td className="px-4 py-4">
                  <Badge status={c.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {contacts.length === 0 && (
        <div className="py-16 text-center text-primary-500 font-semibold">
          No messages yet.
        </div>
      )}
    </div>
  );
}

// ─── Newsletter Section ───────────────────────────────────────────────────────
export function NewsletterSection() {
  const { subscribers } = useDashboard();

  const active = subscribers.filter((s) => s.status === "active").length;
  const unsubscribed = subscribers.filter(
    (s) => s.status === "unsubscribed",
  ).length;

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-primary-900/60 border border-primary-700/50 rounded-2xl p-5">
          <p className="text-3xl font-black text-white">{subscribers.length}</p>
          <p className="text-primary-400 text-sm mt-1">Total Subscribers</p>
        </div>
        <div className="bg-primary-900/60 border border-primary-700/50 rounded-2xl p-5">
          <p className="text-3xl font-black text-green-400">{active}</p>
          <p className="text-primary-400 text-sm mt-1">Active</p>
        </div>
        <div className="bg-primary-900/60 border border-primary-700/50 rounded-2xl p-5">
          <p className="text-3xl font-black text-primary-400">{unsubscribed}</p>
          <p className="text-primary-400 text-sm mt-1">Unsubscribed</p>
        </div>
      </div>

      {/* Subscriber table */}
      <div className="bg-primary-900/60 border border-primary-700/50 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary-700/50">
              {["Email", "Status", "Subscribed On"].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-4 text-xs font-bold text-primary-400 tracking-widest uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-primary-800/40">
            {subscribers.map((s) => (
              <tr
                key={s.id}
                className="hover:bg-primary-800/30 transition-colors"
              >
                <td className="px-4 py-4 text-white text-sm font-medium">
                  {s.email}
                </td>
                <td className="px-4 py-4">
                  <Badge status={s.status} />
                </td>
                <td className="px-4 py-4 text-primary-400 text-sm">
                  {new Date(s.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {subscribers.length === 0 && (
          <div className="py-16 text-center text-primary-500 font-semibold">
            No subscribers yet.
          </div>
        )}
      </div>
    </div>
  );
}
