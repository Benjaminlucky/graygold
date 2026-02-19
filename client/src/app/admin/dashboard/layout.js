"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ─── Context ──────────────────────────────────────────────────────────────────
export const DashboardContext = createContext(null);
export const useDashboard = () => useContext(DashboardContext);

// ─── Nav Config ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {
    key: "overview",
    label: "Overview",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    ),
  },
  {
    key: "properties",
    label: "Properties",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    ),
  },
  {
    key: "inquiries",
    label: "Inquiries",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    ),
  },
  {
    key: "contacts",
    label: "Contact Messages",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
  {
    key: "newsletter",
    label: "Newsletter",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    ),
  },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  admin,
  inquiries,
  onLogout,
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-primary-900/95 border-r border-primary-700/50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-primary-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-black text-lg">G</span>
          </div>
          <div>
            <p className="text-white font-black text-sm leading-none">
              GrayGold
            </p>
            <p className="text-primary-400 text-xs mt-0.5">Admin CMS</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setActiveTab(item.key);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === item.key
                ? "bg-secondary-500/15 text-secondary-400 border border-secondary-500/20"
                : "text-primary-400 hover:bg-primary-800 hover:text-white"
            }`}
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              {item.icon}
            </svg>
            {item.label}
            {item.key === "inquiries" &&
              inquiries.filter((i) => i.status === "new").length > 0 && (
                <span className="ml-auto bg-secondary-500 text-white text-xs font-black px-2 py-0.5 rounded-full">
                  {inquiries.filter((i) => i.status === "new").length}
                </span>
              )}
          </button>
        ))}
      </nav>

      {/* Admin info + logout */}
      <div className="p-4 border-t border-primary-700/50">
        <div className="flex items-center gap-3 px-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-secondary-500/20 border border-secondary-500/30 flex items-center justify-center flex-shrink-0">
            <span className="text-secondary-400 font-black text-sm">
              {admin?.firstName?.[0] ?? "A"}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-bold truncate">
              {admin?.firstName} {admin?.lastName}
            </p>
            <p className="text-primary-500 text-xs truncate">{admin?.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-primary-400 hover:bg-secondary-500/10 hover:text-secondary-400 transition-all"
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
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

// ─── Top Header ───────────────────────────────────────────────────────────────
function TopBar({ activeTab, loading, onMenuClick }) {
  return (
    <header className="sticky top-0 z-10 bg-primary-950/90 backdrop-blur-xl border-b border-primary-800/50 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden text-primary-400 hover:text-white transition-colors"
          onClick={onMenuClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div>
          <h1 className="text-white font-black text-xl capitalize">
            {activeTab === "overview"
              ? "Dashboard Overview"
              : activeTab.replace("-", " ")}
          </h1>
          <p className="text-primary-500 text-xs mt-0.5">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {loading && (
          <svg
            className="w-5 h-5 text-secondary-400 animate-spin"
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
        )}
        <Link
          href="/"
          target="_blank"
          className="text-xs font-semibold text-primary-400 hover:text-white flex items-center gap-1.5 transition-colors border border-primary-700 hover:border-primary-600 px-3 py-2 rounded-xl"
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
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          View Site
        </Link>
      </div>
    </header>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function AdminLayout({ children }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState(null);

  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("gg_token");
    const adminData = localStorage.getItem("gg_admin");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    setAdmin(JSON.parse(adminData || "{}"));
    fetchAll(token);
  }, []);

  const fetchAll = async (token) => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [propsRes, inqRes, conRes, subRes] = await Promise.all([
        fetch("http://localhost/server/controllers/properties.php", {
          headers,
        }),
        fetch("http://localhost/server/controllers/inquiries.php", { headers }),
        fetch("http://localhost/server/controllers/contact.php", { headers }),
        fetch("http://localhost/server/controllers/newsletter.php", {
          headers,
        }),
      ]);
      const [props, inq, con, sub] = await Promise.all([
        propsRes.json(),
        inqRes.json(),
        conRes.json(),
        subRes.json(),
      ]);
      if (props.success) setProperties(props.data || []);
      if (inq.success) setInquiries(inq.data || []);
      if (con.success) setContacts(con.data || []);
      if (sub.success) setSubscribers(sub.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("gg_token");
    localStorage.removeItem("gg_admin");
    router.push("/admin/login");
  };

  const refreshData = () => {
    const token = localStorage.getItem("gg_token");
    if (token) fetchAll(token);
  };

  return (
    <DashboardContext.Provider
      value={{
        activeTab,
        setActiveTab,
        properties,
        setProperties,
        inquiries,
        setInquiries,
        contacts,
        setContacts,
        subscribers,
        setSubscribers,
        loading,
        refreshData,
      }}
    >
      <div className="min-h-screen bg-primary-950 flex">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          admin={admin}
          inquiries={inquiries}
          onLogout={handleLogout}
        />

        <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
          <TopBar
            activeTab={activeTab}
            loading={loading}
            onMenuClick={() => setSidebarOpen(true)}
          />
          <div className="flex-1 p-6">{children}</div>
        </main>
      </div>
    </DashboardContext.Provider>
  );
}
