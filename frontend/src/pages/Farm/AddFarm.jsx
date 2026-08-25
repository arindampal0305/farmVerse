import { useState } from "react"; import { useNavigate } from "react-router-dom"; import { addFarm } from "../../services/farm"; import DashboardLayout from "../../components/layout/DashboardLayout"; import { useNotifications } from "../../hooks/useNotifications"; function AddFarm() { const navigate = useNavigate(); const { addNotification } = useNotifications(); const [formData, setFormData] = useState({ farmName: "", farmType: "", areaSqMt: "", soilType: "", location: "", }); const [loading, setLoading] = useState(false); const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value, }); }; const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await addFarm({
        ...formData,
        areaSqMt: Number(formData.areaSqMt),
      });

      addNotification(`Successfully added your new farm: ${formData.farmName}.`, 'success');
      alert("Farm added successfully!");

      navigate("/farm");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to add farm."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto mt-2 md:mt-10 mb-10 bg-white shadow-xl border border-gray-100 rounded-2xl md:rounded-3xl overflow-hidden grid md:grid-cols-2">
        {/* Left Info Panel with Vector Foliage background */}
        <div className="relative p-8 md:p-12 text-white flex flex-col justify-center md:justify-between overflow-hidden bg-emerald-950 min-h-[250px] md:min-h-[400px]">
          <div className="absolute inset-0 bg-[url('/leafy_bg.jpg')] bg-cover bg-center z-0 opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-emerald-850/85 to-teal-950/95 z-0"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-center">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4 tracking-tight leading-tight">
              Expand Your Agriculture Network
            </h2>
            <p className="text-xs md:text-sm leading-relaxed text-emerald-100/90 max-w-sm">
              Register a new farm plot to start monitoring crops, tracking localized weather trends, fetching market wholesale rates, and generating artificial intelligence recommendations.
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-6 md:p-10 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-800">Add Farm</h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input type="text" name="farmName" placeholder="Farm Name" value={formData.farmName} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />

            <input type="text" name="farmType" placeholder="Farm Type" value={formData.farmType} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />

            <input type="number" name="areaSqMt" placeholder="Area (Sq. Mt.)" value={formData.areaSqMt} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />

            <input type="text" name="soilType" placeholder="Soil Type" value={formData.soilType} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />

            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />

            <button type="submit" disabled={loading} className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg shadow-green-600/30 transition-all hover:-translate-y-1" >
              {loading ? "Adding..." : "Add Farm"}
            </button>

          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddFarm;