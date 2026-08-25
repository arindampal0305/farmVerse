import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { MapPin, Sprout, Ruler, Globe, Wheat } from "lucide-react";
import { getAllFarms, deleteFarm } from "../../services/farm";

const DEFAULT_FARM_IMAGE = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1000";

function Farm() {
  const navigate = useNavigate();
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = async () => {
    try {
      setLoading(true);
      const response = await getAllFarms();
      setFarms(response.farms || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load farms.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this farm?")) return;

    try {
      await deleteFarm(id);

      loadFarms();
    } catch (error) {
      console.error(error);
      alert("Unable to delete farm.");
    }
  };

  return (
    <DashboardLayout>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 ">
            Farm Management
          </h1>
          <p className="text-gray-500 mt-1 md:mt-2 text-sm md:text-lg">
            Manage all your farms.
          </p>
        </div>

        <button onClick={() => navigate("/farm/add")} className="w-full sm:w-auto justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 py-3.5 md:py-3 rounded-xl flex items-center gap-3 shadow-lg shadow-green-600/30 transition-all hover:-translate-y-1" >
          <FaPlus />
          Add Farm
        </button>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 p-5 md:p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <p className="text-gray-500 text-sm md:text-base font-medium">Total Farms</p>
          <h1 className="text-3xl md:text-4xl font-bold text-green-600 mt-2 md:mt-3">
            {farms.length}
          </h1>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 p-5 md:p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <p className="text-gray-500 text-sm md:text-base font-medium">Total Area</p>
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-600 mt-2 md:mt-3"> {farms.reduce((sum, farm) => sum + parseFloat(farm.areaSqMt || 0), 0)} sq.m
          </h1>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 p-5 md:p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
          <p className="text-gray-500 text-sm md:text-base font-medium">Total Crops</p>
          <h1 className="text-3xl md:text-4xl font-bold text-amber-500 mt-2 md:mt-3"> {farms.reduce((sum, farm) => sum + farm.cropCount, 0)}
          </h1>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500 text-xl font-medium">
          Loading farms...
        </div>
      ) : farms.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-3xl p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 ">
            No farms added yet
          </h2>
          <button onClick={() => navigate("/farm/add")} className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 font-semibold rounded-xl shadow-lg shadow-green-600/30 transition-all hover:-translate-y-1" >
            Add First Farm
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8"> {farms.map((farm) => (
            <div key={farm.farmId} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group" >
              <div className="overflow-hidden">
                <img src={DEFAULT_FARM_IMAGE} alt={farm.farmName} className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                  {farm.farmName}
                </h2>

                <div className="space-y-4 mt-6 text-gray-600 text-sm font-medium">
                  <p className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-emerald-600" /> {farm.location}
                  </p>
                  <p className="flex items-center gap-3">
                    <Sprout className="w-4 h-4 text-emerald-600" /> {farm.farmType}
                  </p>
                  <p className="flex items-center gap-3">
                    <Ruler className="w-4 h-4 text-emerald-600" /> {farm.areaSqMt} sq.m
                  </p>
                  <p className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-emerald-600" /> {farm.soilType}
                  </p>
                  <p className="flex items-center gap-3">
                    <Wheat className="w-4 h-4 text-emerald-600" /> {farm.cropCount} Crops
                  </p>
                  {farm.cropNames && farm.cropNames.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1 pl-7">
                      {farm.cropNames.map((name, idx) => (
                        <span key={idx} className="bg-emerald-100/50 text-emerald-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                          {name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8">
                  <button onClick={() => navigate(`/farm/${farm.farmId}`)} className="bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white py-3 rounded-xl flex justify-center items-center gap-2 font-semibold transition-colors" >
                    <FaEye /> View
                  </button>

                  <button onClick={() => navigate(`/farm/edit/${farm.farmId}`)} className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white py-3 rounded-xl flex justify-center items-center gap-2 font-semibold transition-colors" >
                    <FaEdit /> Edit
                  </button>

                  <button onClick={() => handleDelete(farm.farmId)} className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white py-3 rounded-xl flex justify-center items-center gap-2 font-semibold transition-colors" >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </DashboardLayout>
  );
}

export default Farm;