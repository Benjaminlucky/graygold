// ─── Badge ────────────────────────────────────────────────────────────────────
export function Badge({ status }) {
  const styles = {
    new: "bg-green-500/10 text-green-400 border-green-500/20",
    available: "bg-green-500/10 text-green-400 border-green-500/20",
    contacted: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    ready: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    in_progress: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    "off-plan": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    closed: "bg-primary-500/10 text-primary-400 border-primary-500/20",
    sold: "bg-secondary-500/10 text-secondary-400 border-secondary-500/20",
    reserved: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    active: "bg-green-500/10 text-green-400 border-green-500/20",
    unsubscribed: "bg-primary-700/50 text-primary-400 border-primary-600/30",
  };

  return (
    <span
      className={`text-xs font-bold px-2.5 py-1 rounded-lg border capitalize ${
        styles[status] ??
        "bg-primary-700/50 text-primary-300 border-primary-600/30"
      }`}
    >
      {status?.replace("_", " ")}
    </span>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
export function StatCard({ label, value, icon, trend, color }) {
  return (
    <div className="bg-primary-900/60 border border-primary-700/50 rounded-2xl p-5 hover:border-primary-600/60 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            {icon}
          </svg>
        </div>
        {trend !== undefined && (
          <span
            className={`text-xs font-bold px-2 py-1 rounded-lg ${
              trend > 0
                ? "bg-green-500/10 text-green-400"
                : "bg-secondary-500/10 text-secondary-400"
            }`}
          >
            {trend > 0 ? "+" : ""}
            {trend}%
          </span>
        )}
      </div>
      <p className="text-3xl font-black text-white mb-1">{value}</p>
      <p className="text-primary-400 text-sm font-medium">{label}</p>
    </div>
  );
}
