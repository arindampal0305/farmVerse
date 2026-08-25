import { useEffect, useState } from "react"; import { useNavigate, useParams } from "react-router-dom"; import DashboardLayout from "../../components/layout/DashboardLayout"; import { getFarmById, updateFarm } from "../../services/farm"; function EditFarm() { const { id } = useParams(); const navigate = useNavigate(); const [loading, setLoading] = useState(true); const [formData, setFormData] = useState({ farmName: "", farmType: "", areaSqMt: "", soilType: "", location: "", }); useEffect(() => { loadFarm(); }, []); const loadFarm = async () => { try { const response = await getFarmById(id); const farm = response.farm; setFormData({ farmName: farm.farmName, farmType: farm.farmType, areaSqMt: farm.areaSqMt, soilType: farm.soilType, location: farm.location, }); } catch (error) { console.error(error); alert("Unable to load farm."); } finally { setLoading(false); } }; const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value, }); }; const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateFarm(id, {
        ...formData,
        areaSqMt: Number(formData.areaSqMt),
      });

      alert("Farm updated successfully!");

      navigate("/farm");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to update farm."
      );
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-sm border border-gray-100 rounded-3xl p-10">

        <h1 className="text-3xl font-bold mb-8 text-gray-800 ">
          Edit Farm
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input type="text" name="farmName" value={formData.farmName} onChange={handleChange} placeholder="Farm Name" className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" required />

          <input type="text" name="farmType" value={formData.farmType} onChange={handleChange} placeholder="Farm Type" className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" required />

          <input type="number" name="areaSqMt" value={formData.areaSqMt} onChange={handleChange} placeholder="Area" className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" required />

          <input type="text" name="soilType" value={formData.soilType} onChange={handleChange} placeholder="Soil Type" className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" required />

          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" required />

          <button type="submit" className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-1" >
            Update Farm
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}

export default EditFarm;