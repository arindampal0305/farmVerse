import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";
import { FaUsers, FaTractor, FaLeaf, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

function AdminDashboard() {
  const [stats, setStats] = useState({ totalFarmers: 0, totalFarms: 0, totalCrops: 0 });
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add User Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ fullName: "", username: "", email: "", password: "", role: "FARMER" });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [dashRes, farmersRes] = await Promise.all([
        api.get("/farmverse/admin/dashboard"),
        api.get("/farmverse/admin/viewFarmers")
      ]);
      setStats({
        totalFarmers: dashRes.data.totalFarmers,
        totalFarms: dashRes.data.totalFarms,
        totalCrops: dashRes.data.totalCrops,
      });
      setFarmers(farmersRes.data || []);
    } catch (err) {
      console.error("Failed to fetch admin data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (username) => {
    if (!window.confirm(`Are you sure you want to delete the farmer: ${username}?`)) return;
    try {
      await api.delete(`/farmverse/admin/deleteFarmer/${username}`);
      fetchData();
    } catch (err) {
      console.error("Failed to delete farmer", err);
      alert("Failed to delete farmer.");
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setAddError("");
    setAddLoading(true);
    try {
      const endpoint = addForm.role === "ADMIN" ? "/farmverse/admin/addAdmin" : "/farmverse/admin/addFarmer";
      const payload = { ...addForm };
      delete payload.role; // Remove role from payload since it's determined by endpoint

      const res = await api.post(endpoint, payload);
      if (res.data.status === "error") {
        setAddError(res.data.message);
        return;
      }
      setShowAddModal(false);
      setAddForm({ fullName: "", username: "", email: "", password: "", role: "FARMER" });
      fetchData();
    } catch (err) {
      console.error("Failed to add user", err);
      setAddError(err.response?.data?.message || "An error occurred.");
    } finally {
      setAddLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-full pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-10 gap-4 md:gap-0">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              Admin Command Center
            </h1>
            <p className="mt-1 md:mt-2 text-gray-500 text-base md:text-lg">
              Manage the entire FarmVerse ecosystem.
            </p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="w-full md:w-auto justify-center bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center gap-2 font-semibold transition-all hover:-translate-y-1" >
            <FaPlus /> Add User
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white h-40 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-8 flex items-center gap-6 group hover:-translate-y-1 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 text-3xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <FaUsers />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Farmers</p>
              <h2 className="text-4xl font-extrabold text-slate-800 mt-1">{stats.totalFarmers}</h2>
            </div>
          </div>
          
          <div className="bg-white h-40 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-8 flex items-center gap-6 group hover:-translate-y-1 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 text-3xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
              <FaTractor />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Farms</p>
              <h2 className="text-4xl font-extrabold text-slate-800 mt-1">{stats.totalFarms}</h2>
            </div>
          </div>

          <div className="bg-white h-40 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-8 flex items-center gap-6 group hover:-translate-y-1 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 text-3xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <FaLeaf />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Crops</p>
              <h2 className="text-4xl font-extrabold text-slate-800 mt-1">{stats.totalCrops}</h2>
            </div>
          </div>
        </div>

        {/* Farmers Table */}
        <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 overflow-hidden">
          <div className="p-8 border-b border-emerald-50 flex justify-between items-center bg-gradient-to-r from-emerald-50/50 to-transparent">
            <h2 className="text-2xl font-bold text-slate-800 ">Registered Farmers</h2>
          </div>
          <div className="overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="hidden md:table-header-group">
                <tr className="bg-gray-50/50">
                  <th className="py-5 px-6 md:px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Full Name</th>
                  <th className="py-5 px-6 md:px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Username</th>
                  <th className="py-5 px-6 md:px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Farms Owned</th>
                  <th className="py-5 px-6 md:px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 flex flex-col md:table-row-group">
                {farmers.map((farmer, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors flex flex-col md:table-row p-4 md:p-0">
                    <td className="py-4 md:py-5 px-3 md:px-8 flex justify-between items-center md:table-cell border-b border-gray-100 md:border-none bg-emerald-50/30 md:bg-transparent rounded-t-xl md:rounded-none">
                      <div className="md:hidden flex items-center gap-2">
                        <span className="bg-emerald-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">{idx + 1}</span>
                        <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Full Name</span>
                      </div>
                      <div className="font-semibold text-slate-800 text-right md:text-left flex items-center gap-3">
                        <div className="flex w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 items-center justify-center shrink-0">
                          <FaUsers />
                        </div>
                        {farmer.fullName}
                      </div>
                    </td>
                    <td className="py-3 md:py-5 px-2 md:px-8 text-gray-500 flex justify-between items-center md:table-cell border-b border-gray-50 md:border-none">
                      <span className="md:hidden text-xs font-semibold text-gray-500 uppercase tracking-wider">Username</span>
                      <span className="text-right md:text-left">@{farmer.username}</span>
                    </td>
                    <td className="py-3 md:py-5 px-2 md:px-8 flex justify-between items-center md:table-cell border-b border-gray-50 md:border-none">
                      <span className="md:hidden text-xs font-semibold text-gray-500 uppercase tracking-wider">Farms Owned</span>
                      <span className="bg-emerald-100 text-emerald-700 py-1 px-3 rounded-full text-sm font-bold text-right md:text-left">
                        {farmer.farmCount} Farms
                      </span>
                    </td>
                    <td className="py-3 md:py-5 px-2 md:px-8 flex justify-between items-center md:table-cell text-right">
                      <span className="md:hidden text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</span>
                      <button onClick={() => handleDelete(farmer.username)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete Farmer" >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                {farmers.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-10 text-center text-gray-500">
                      No farmers registered yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-emerald-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-emerald-50 bg-emerald-50/30">
              <h2 className="text-2xl font-bold text-slate-800 ">Add New User</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-emerald-600 transition-colors">
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <form onSubmit={handleAddUser} className="p-6 space-y-5">
              {addError && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{addError}</div>}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select value={addForm.role} onChange={(e) => setAddForm({...addForm, role: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" >
                  <option value="FARMER">Farmer</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" required value={addForm.fullName} onChange={(e) => setAddForm({...addForm, fullName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="John Doe" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input type="text" required value={addForm.username} onChange={(e) => setAddForm({...addForm, username: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="johndoe123" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" required value={addForm.email} onChange={(e) => setAddForm({...addForm, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="john@example.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input type="password" required minLength={6} value={addForm.password} onChange={(e) => setAddForm({...addForm, password: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="••••••••" />
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors" >
                  Cancel
                </button>
                <button type="submit" disabled={addLoading} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50" >
                  {addLoading ? "Saving..." : `Add ${addForm.role === 'ADMIN' ? 'Admin' : 'Farmer'}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}

export default AdminDashboard;