import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";
import { FaTractor, FaTrash, FaPlus, FaTimes, FaEdit } from "react-icons/fa";

function Farms() {
  const [farms, setFarms] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Farm Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({ farmName: "", farmType: "", areaSqMt: "", location: "", soilType: "", farmerUsername: "" });
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");

  // Edit Farm Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFarmId, setEditFarmId] = useState(null);
  const [editForm, setEditForm] = useState({ farmName: "", farmType: "", areaSqMt: "", location: "", soilType: "", farmerUsername: "" });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [farmsRes, farmersRes] = await Promise.all([
        api.get("/farmverse/admin/viewFarms"),
        api.get("/farmverse/admin/viewFarmers")
      ]);
      setFarms(farmsRes.data || []);
      // Filter out admins so we only assign farms to actual farmers
      const onlyFarmers = (farmersRes.data || []).filter(f => !f.fullName.includes("(Admin)"));
      setFarmers(onlyFarmers);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the farm: ${name}?`)) return;
    try {
      await api.delete(`/farmverse/admin/deleteFarm/${id}`);
      fetchData();
    } catch (err) {
      console.error("Failed to delete farm", err);
      alert("Failed to delete farm.");
    }
  };

  const handleAddFarm = async (e) => {
    e.preventDefault();
    setAddError("");
    setAddLoading(true);
    try {
      const res = await api.post("/farmverse/admin/addFarm", addForm);
      if (res.data.status === "error") {
        setAddError(res.data.message);
        return;
      }
      setShowAddModal(false);
      setAddForm({ farmName: "", farmType: "", areaSqMt: "", location: "", soilType: "", farmerUsername: "" });
      fetchData();
    } catch (err) {
      console.error("Failed to add farm", err);
      setAddError(err.response?.data?.message || "An error occurred.");
    } finally {
      setAddLoading(false);
    }
  };

  const openEditModal = (farm) => {
    setEditError("");
    setEditFarmId(farm.id);
    setEditForm({
      farmName: farm.farmName,
      farmType: farm.farmType,
      areaSqMt: farm.areaSqMt,
      location: farm.location,
      soilType: farm.soilType,
      farmerUsername: farm.farmerUsername
    });
    setShowEditModal(true);
  };

  const handleEditFarm = async (e) => {
    e.preventDefault();
    setEditError("");
    setEditLoading(true);
    try {
      const res = await api.put(`/farmverse/admin/editFarm/${editFarmId}`, editForm);
      if (res.data.status === "error") {
        setEditError(res.data.message);
        return;
      }
      setShowEditModal(false);
      setEditFarmId(null);
      fetchData();
    } catch (err) {
      console.error("Failed to edit farm", err);
      setEditError(err.response?.data?.message || "An error occurred.");
    } finally {
      setEditLoading(false);
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
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
              Farms Management
            </h1>
            <p className="mt-2 text-gray-500 text-lg">
              Manage all farms and assign them to farmers.
            </p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="w-full md:w-auto justify-center bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center gap-2 font-semibold transition-all hover:-translate-y-1" >
            <FaPlus /> Add Farm
          </button>
        </div>

        {/* Farms Table */}
        <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 overflow-hidden">
          <div className="p-8 border-b border-emerald-50 flex justify-between items-center bg-gradient-to-r from-emerald-50/50 to-transparent">
            <h2 className="text-2xl font-bold text-slate-800 ">All Farms</h2>
          </div>
          <div className="overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="hidden md:table-header-group">
                <tr className="bg-gray-50/50">
                  <th className="py-5 px-6 md:px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Farm Info</th>
                  <th className="py-5 px-6 md:px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Details</th>
                  <th className="py-5 px-6 md:px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Location</th>
                  <th className="py-5 px-6 md:px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Owner</th>
                  <th className="py-5 px-6 md:px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 flex flex-col md:table-row-group">
                {farms.map((farm, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors flex flex-col md:table-row p-4 md:p-0">
                    <td className="py-4 md:py-5 px-3 md:px-8 flex justify-between items-center md:table-cell border-b border-gray-100 md:border-none bg-emerald-50/30 md:bg-transparent rounded-t-xl md:rounded-none">
                      <div className="md:hidden flex items-center gap-2">
                        <span className="bg-emerald-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">{idx + 1}</span>
                        <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Farm Info</span>
                      </div>
                      <div className="font-semibold text-slate-800 flex items-center gap-3 text-right md:text-left">
                        <div className="flex w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 items-center justify-center shrink-0">
                          <FaTractor />
                        </div>
                        <div>
                          <div className="text-gray-900">{farm.farmName}</div>
                          <div className="text-sm text-gray-500 font-normal">{farm.farmType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 md:py-5 px-2 md:px-8 flex justify-between items-center md:table-cell border-b border-gray-50 md:border-none">
                      <span className="md:hidden text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</span>
                      <div className="text-right md:text-left">
                        <div className="text-gray-900">{farm.areaSqMt} sq mt</div>
                        <div className="text-sm text-gray-500">{farm.soilType} Soil</div>
                      </div>
                    </td>
                    <td className="py-3 md:py-5 px-2 md:px-8 text-gray-500 flex justify-between items-center md:table-cell border-b border-gray-50 md:border-none">
                      <span className="md:hidden text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</span>
                      <span className="text-right md:text-left">{farm.location}</span>
                    </td>
                    <td className="py-3 md:py-5 px-2 md:px-8 text-gray-500 flex justify-between items-center md:table-cell border-b border-gray-50 md:border-none">
                      <span className="md:hidden text-xs font-semibold text-gray-500 uppercase tracking-wider">Owner</span>
                      <div className="text-right md:text-left">
                        <div className="text-gray-900 font-medium">{farm.farmerFullName}</div>
                        <div className="text-sm text-gray-500">@{farm.farmerUsername}</div>
                      </div>
                    </td>
                    <td className="py-3 md:py-5 px-2 md:px-8 flex justify-between items-center md:table-cell text-right">
                      <span className="md:hidden text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</span>
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEditModal(farm)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Farm" >
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(farm.id, farm.farmName)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete Farm" >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {farms.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-10 text-center text-gray-500">
                      No farms registered yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Farm Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-emerald-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-emerald-50 bg-emerald-50/30">
              <h2 className="text-2xl font-bold text-slate-800 ">Add New Farm</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-emerald-600 transition-colors">
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <form onSubmit={handleAddFarm} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {addError && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{addError}</div>}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Farmer</label>
                <select required value={addForm.farmerUsername} onChange={(e) => setAddForm({...addForm, farmerUsername: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" >
                  <option value="" disabled>Select a Farmer</option>
                  {farmers.map(f => (
                    <option key={f.username} value={f.username}>{f.fullName} (@{f.username})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Farm Name</label>
                <input type="text" required value={addForm.farmName} onChange={(e) => setAddForm({...addForm, farmName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Green Valley Farm" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Farm Type</label>
                <input type="text" required value={addForm.farmType} onChange={(e) => setAddForm({...addForm, farmType: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Organic" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area (Sq Meters)</label>
                <input type="number" step="0.01" required value={addForm.areaSqMt} onChange={(e) => setAddForm({...addForm, areaSqMt: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="1000.50" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input type="text" required value={addForm.location} onChange={(e) => setAddForm({...addForm, location: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="California, USA" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                <input type="text" required value={addForm.soilType} onChange={(e) => setAddForm({...addForm, soilType: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Loamy" />
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors" >
                  Cancel
                </button>
                <button type="submit" disabled={addLoading} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50" >
                  {addLoading ? "Saving..." : "Add Farm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Farm Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-emerald-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-emerald-50 bg-emerald-50/30">
              <h2 className="text-2xl font-bold text-slate-800 ">Edit Farm</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-emerald-600 transition-colors">
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <form onSubmit={handleEditFarm} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {editError && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{editError}</div>}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assign to Farmer</label>
                <select required value={editForm.farmerUsername} onChange={(e) => setEditForm({...editForm, farmerUsername: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" >
                  <option value="" disabled>Select a Farmer</option>
                  {farmers.map(f => (
                    <option key={f.username} value={f.username}>{f.fullName} (@{f.username})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Farm Name</label>
                <input type="text" required value={editForm.farmName} onChange={(e) => setEditForm({...editForm, farmName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Green Valley Farm" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Farm Type</label>
                <input type="text" required value={editForm.farmType} onChange={(e) => setEditForm({...editForm, farmType: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Organic" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area (Sq Meters)</label>
                <input type="number" step="0.01" required value={editForm.areaSqMt} onChange={(e) => setEditForm({...editForm, areaSqMt: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="1000.50" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input type="text" required value={editForm.location} onChange={(e) => setEditForm({...editForm, location: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="California, USA" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
                <input type="text" required value={editForm.soilType} onChange={(e) => setEditForm({...editForm, soilType: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Loamy" />
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors" >
                  Cancel
                </button>
                <button type="submit" disabled={editLoading} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50" >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}

export default Farms;
