import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";
import { FaLeaf, FaTractor, FaCalendarAlt } from "react-icons/fa";

function Crops() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCrops = async () => {
    try {
      setLoading(true);

      const res = await api.get("/farmverse/admin/viewCrops");
      setCrops(res.data || []);
    } catch (err) {
      console.error("Failed to fetch crops", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

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
              Crops Management
            </h1>

            <p className="mt-1 md:mt-2 text-gray-500 text-base md:text-lg">
              View and oversee all registered crops across the platform.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 overflow-hidden">

          <div className="p-8 border-b border-emerald-50 flex justify-between items-center bg-gradient-to-r from-emerald-50/50 to-transparent">
            <h2 className="text-2xl font-bold text-slate-800">
              All Crops
            </h2>
          </div>

          <div className="overflow-hidden">
            <table className="w-full text-left border-collapse">

              <thead className="hidden md:table-header-group">
                <tr className="bg-gray-50/50">
                  <th className="py-5 px-6 md:px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Crop Details
                  </th>

                  <th className="py-5 px-6 md:px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Yield & Revenue
                  </th>

                  <th className="py-5 px-6 md:px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Farm & Owner
                  </th>

                  <th className="py-5 px-6 md:px-8 text-sm font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Dates
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 flex flex-col md:table-row-group">

                {crops.map((crop, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 transition-colors flex flex-col md:table-row p-4 md:p-0"
                  >

                    <td className="py-4 md:py-5 px-3 md:px-8 flex justify-between items-center md:table-cell border-b border-gray-100 md:border-none bg-emerald-50/30 md:bg-transparent rounded-t-xl md:rounded-none">
                      <div className="md:hidden flex items-center gap-2">
                        <span className="bg-emerald-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">{idx + 1}</span>
                        <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Crop Details</span>
                      </div>
                      <div className="flex items-center gap-3 text-right md:text-left">

                        <div className="flex w-10 h-10 rounded-full bg-amber-100 text-amber-600 items-center justify-center shrink-0">
                          <FaLeaf />
                        </div>

                        <div>
                          <div className="font-semibold text-slate-800">
                            {crop.cropName}
                          </div>

                          <div className="text-sm text-gray-500">
                            {crop.cropType}
                          </div>
                        </div>

                      </div>
                    </td>

                    <td className="py-3 md:py-5 px-2 md:px-8 flex justify-between items-center md:table-cell border-b border-gray-50 md:border-none">
                      <span className="md:hidden text-xs font-semibold text-gray-500 uppercase tracking-wider">Yield & Revenue</span>
                      <div className="flex flex-col gap-1 text-right md:text-left">

                        <span className="text-sm text-emerald-600 font-medium">
                          Quantity: {crop.quantity}
                        </span>

                        <span className="text-sm text-gray-500">
                          Rev: ${crop.revenue || 0}
                        </span>

                      </div>
                    </td>

                    <td className="py-3 md:py-5 px-2 md:px-8 flex justify-between items-center md:table-cell border-b border-gray-50 md:border-none">
                      <span className="md:hidden text-xs font-semibold text-gray-500 uppercase tracking-wider">Farm & Owner</span>
                      <div className="flex flex-col gap-1 text-right md:text-left">

                        <span className="flex items-center justify-end md:justify-start gap-2 text-sm text-gray-700">
                          <FaTractor className="text-gray-400 hidden md:block" />
                          {crop.farmName}
                        </span>

                        <span className="text-sm text-gray-500">
                          @{crop.farmerUsername}
                        </span>

                      </div>
                    </td>

                    <td className="py-3 md:py-5 px-2 md:px-8 text-gray-500 text-sm flex justify-between items-center md:table-cell">
                      <span className="md:hidden text-xs font-semibold text-gray-500 uppercase tracking-wider">Dates</span>
                      <div className="flex flex-col gap-1 text-right md:text-left">

                        <span className="flex items-center justify-end md:justify-start gap-2">
                          <FaCalendarAlt className="text-gray-400 hidden md:block" />
                          S: {new Date(crop.sowingDate).toLocaleDateString()}
                        </span>

                        <span className="flex items-center justify-end md:justify-start gap-2">
                          <FaCalendarAlt className="text-gray-400 hidden md:block" />
                          H: {new Date(crop.harvestDate).toLocaleDateString()}
                        </span>

                      </div>
                    </td>

                  </tr>
                ))}

                {crops.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-10 text-center text-gray-500"
                    >
                      No crops registered yet.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Crops;