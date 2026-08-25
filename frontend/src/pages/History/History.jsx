import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getAdminHistory, getFarmerHistory } from "../../services/history";
import { FaSearch, FaHistory, FaFilter, FaFileAlt } from "react-icons/fa";

export default function History() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("");
  const [entityFilter, setEntityFilter] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [logs, searchTerm, actionFilter, entityFilter]);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError("");
      const data = isAdmin ? await getAdminHistory() : await getFarmerHistory();
      setLogs(data || []);
    } catch (err) {
      console.error("Failed to load history:", err);
      setError("Unable to load activity logs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...logs];

    // Text Search (desciption, username, action)
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (log) =>
          log.description?.toLowerCase().includes(term) ||
          log.username?.toLowerCase().includes(term) ||
          log.action?.toLowerCase().includes(term)
      );
    }

    // Action filter
    if (actionFilter !== "") {
      result = result.filter((log) => log.action === actionFilter);
    }

    // Entity filter
    if (entityFilter !== "") {
      result = result.filter((log) => log.entityType === entityFilter);
    }

    setFilteredLogs(result);
  };

  const getActionBadgeColor = (action) => {
    if (!action) return "bg-gray-100 text-gray-800";
    const act = action.toUpperCase();
    if (act.includes("ADD") || act.includes("CREATE")) {
      return "bg-green-100 text-green-800 border-green-200";
    }
    if (act.includes("DELETE") || act.includes("REMOVE")) {
      return "bg-red-100 text-red-800 border-red-200";
    }
    if (act.includes("UPDATE") || act.includes("EDIT")) {
      return "bg-amber-100 text-amber-800 border-amber-200";
    }
    return "bg-blue-100 text-blue-800 border-blue-200";
  };

  const getEntityBadgeColor = (entityType) => {
    if (!entityType) return "bg-gray-100 text-gray-800";
    const type = entityType.toUpperCase();
    if (type.includes("CROP")) {
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
    if (type.includes("FARM")) {
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    }
    return "bg-purple-100 text-purple-800 border-purple-200";
  };

  // Get unique action types and entity types for dropdown filters
  const uniqueActions = [...new Set(logs.map((log) => log.action).filter(Boolean))];
  const uniqueEntities = [...new Set(logs.map((log) => log.entityType).filter(Boolean))];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
              <FaHistory className="text-green-700" />
              Activity History
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              {isAdmin 
                ? "Track and audit system-wide modifications across the platform." 
                : "Review your recent farm and crop modifications."
              }
            </p>
          </div>
          <button 
            onClick={loadHistory}
            className="w-full md:w-auto px-5 py-3 md:py-2.5 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-800 transition shadow-lg shadow-green-700/10 flex justify-center md:mt-1"
          >
            Refresh Logs
          </button>
        </div>

        {/* Filters Panel */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xl shadow-gray-100/40 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Text Search */}
          <div className="relative">
            <span className="absolute left-4 top-4 text-gray-400">
              <FaSearch size={16} />
            </span>
            <input 
              type="text" 
              placeholder="Search logs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all text-sm"
            />
          </div>

          {/* Action Filter */}
          <div className="relative">
            <span className="absolute left-4 top-4 text-gray-400">
              <FaFilter size={14} />
            </span>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all text-sm text-gray-700 appearance-none"
            >
              <option value="">All Actions</option>
              {uniqueActions.map((action) => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
          </div>

          {/* Entity Filter */}
          <div className="relative">
            <span className="absolute left-4 top-4 text-gray-400">
              <FaFilter size={14} />
            </span>
            <select
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all text-sm text-gray-700 appearance-none"
            >
              <option value="">All Entity Types</option>
              {uniqueEntities.map((entity) => (
                <option key={entity} value={entity}>{entity}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 text-red-700 p-5 rounded-2xl border border-red-100 font-medium">
            {error}
          </div>
        )}

        {/* Logs Table */}
        {!loading && !error && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/40 overflow-hidden">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <FaFileAlt size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium text-gray-500">No activity logs found</p>
                <p className="text-sm mt-1">Try adjusting your filters or check back later.</p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-500 text-xs font-bold uppercase bg-gray-50/50">
                        {isAdmin && <th className="px-6 py-4">User</th>}
                        <th className="px-6 py-4">Action</th>
                        <th className="px-6 py-4">Entity Type</th>
                        <th className="px-6 py-4">Entity ID</th>
                        <th className="px-6 py-4">Description</th>
                        <th className="px-6 py-4">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
                      {filteredLogs.map((log, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/30 transition-colors">
                          {isAdmin && (
                            <td className="px-6 py-4 font-bold text-gray-900">
                              {log.username}
                            </td>
                          )}
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${getActionBadgeColor(log.action)}`}>
                              {log.action}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${getEntityBadgeColor(log.entityType)}`}>
                              {log.entityType || "N/A"}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-mono text-xs text-gray-500">
                            {log.entityId || "N/A"}
                          </td>
                          <td className="px-6 py-4 font-medium max-w-xs truncate" title={log.description}>
                            {log.description}
                          </td>
                          <td className="px-6 py-4 text-gray-500 text-xs">
                            {log.timestamp ? new Date(log.timestamp).toLocaleString("en-IN") : "N/A"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-100">
                  {filteredLogs.map((log, idx) => (
                    <div key={idx} className="p-5 hover:bg-gray-50/50 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-wrap gap-2">
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${getActionBadgeColor(log.action)}`}>
                            {log.action}
                          </span>
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${getEntityBadgeColor(log.entityType)}`}>
                            {log.entityType || "N/A"}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                          {log.timestamp ? new Date(log.timestamp).toLocaleDateString("en-IN") : ""}
                        </span>
                      </div>
                      {isAdmin && (
                        <div className="text-sm font-semibold text-gray-900 mb-1">
                          User: {log.username}
                        </div>
                      )}
                      <p className="text-sm text-gray-700 leading-relaxed mb-2">
                        {log.description}
                      </p>
                      <p className="text-xs text-gray-400 font-mono">
                        ID: {log.entityId || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <svg className="animate-spin h-8 w-8 text-green-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
