import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api"; import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend,
} from "chart.js"; import { Line, Bar, Pie } from "react-chartjs-2"; ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend
); const colors = [ "#16A34A", "#3B82F6", "#FACC15", "#EF4444", "#F97316", "#8B5CF6", "#EC4899"
]; function Analytics() { const [analyticsData, setAnalyticsData] = useState(null); const [loading, setLoading] = useState(true); useEffect(() => { const fetchAnalytics = async () => {
      try {
        const response = await api.get("/farmverse/analytics");
        setAnalyticsData(response.data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-full pt-20">
          <h2 className="text-2xl font-semibold text-gray-500">Loading Analytics...</h2>
        </div>
      </DashboardLayout>
    );
  }

  if (!analyticsData) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-full pt-20">
          <h2 className="text-2xl font-semibold text-red-500">Failed to load analytics data.</h2>
        </div>
      </DashboardLayout>
    );
  }

  const {
    totalProduction,
    totalRevenue,
    cropProduction,
    monthlyProduction,
    monthlyReport,
    activeFarms,
    totalCrops
  } = analyticsData;

  const cropLabels = Object.keys(cropProduction || {});
  const cropData = Object.values(cropProduction || {});
  const monthLabels = Object.keys(monthlyProduction || {});
  const monthData = Object.values(monthlyProduction || {});

  const lineData = {
    labels: monthLabels.length > 0 ? monthLabels : ["No Data"],
    datasets: [
      {
        label: "Crop Yield (Tons)",
        data: monthData.length > 0 ? monthData : [0],
        borderColor: "#16A34A",
        backgroundColor: "#16A34A",
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: cropLabels.length > 0 ? cropLabels : ["No Data"],
    datasets: [
      {
        label: "Production (Tons)",
        data: cropData.length > 0 ? cropData : [0],
        backgroundColor: colors.slice(0, cropLabels.length || 1),
      },
    ],
  };

  const pieData = {
    labels: cropLabels.length > 0 ? cropLabels : ["No Data"],
    datasets: [
      {
        data: cropData.length > 0 ? cropData : [100],
        backgroundColor: cropLabels.length > 0 ? colors.slice(0, cropLabels.length) : ["#D1D5DB"],
      },
    ],
  };

  const handleExportReport = () => {
    if (!analyticsData) return;

    let csvContent = "";
    
    // Title & Metadata
    csvContent += "FarmVerse - Analytics Report\n";
    csvContent += `Generated on,${new Date().toLocaleDateString()}\n\n`;

    // Overview Stats
    csvContent += "--- OVERVIEW ---\n";
    csvContent += `Total Production,${totalProduction || 0} Tons\n`;
    csvContent += `Total Revenue,₹${totalRevenue || 0}\n`;
    csvContent += `Active Farms,${activeFarms || 0}\n`;
    csvContent += `Total Crops,${totalCrops || 0}\n\n`;

    // Crop Production Table
    csvContent += "--- CROP PRODUCTION ---\n";
    csvContent += "Crop Name,Production (Tons)\n";
    Object.entries(cropProduction || {}).forEach(([crop, qty]) => {
      csvContent += `"${crop}",${qty}\n`;
    });
    csvContent += "\n";

    // Monthly Report Table
    csvContent += "--- MONTHLY TRENDS ---\n";
    csvContent += "Month,Production (Tons),Revenue (INR),Status\n";
    (monthlyReport || []).forEach((entry) => {
      csvContent += `"${entry.month}",${entry.production},${entry.revenue},"${entry.status}"\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `farmverse_analytics_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 ">
            Analytics Dashboard
          </h1>
          <p className="text-gray-500 mt-1 md:mt-2 text-sm md:text-lg">
            Monitor farm productivity and business insights.
          </p>
        </div>
        <button
          onClick={handleExportReport}
          className="w-full sm:w-auto justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 py-3.5 md:py-3 rounded-xl shadow-lg shadow-green-600/30 transition-all hover:-translate-y-1"
        >
          Export Report
        </button>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-10">
        <div className="bg-white h-32 md:h-40 rounded-2xl md:rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-5 md:p-6 flex flex-col justify-center hover:-translate-y-1 transition-all duration-300">
          <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider">Total Production</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-green-600 ">
            {totalProduction || 0} Tons
          </h1>
        </div>
        <div className="bg-white h-32 md:h-40 rounded-2xl md:rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-5 md:p-6 flex flex-col justify-center hover:-translate-y-1 transition-all duration-300">
          <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider">Total Revenue</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-blue-600 ">
            ₹{totalRevenue ? (totalRevenue / 100000).toFixed(2) : 0}L
          </h1>
        </div>
        <div className="bg-white h-32 md:h-40 rounded-2xl md:rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-5 md:p-6 flex flex-col justify-center hover:-translate-y-1 transition-all duration-300">
          <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider">Active Farms</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-cyan-600 ">
            {activeFarms || 0}
          </h1>
        </div>
        <div className="bg-white h-32 md:h-40 rounded-2xl md:rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-5 md:p-6 flex flex-col justify-center hover:-translate-y-1 transition-all duration-300">
          <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider">Total Crops</p>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-2 text-purple-600 ">
            {totalCrops || 0}
          </h1>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-6 hover:-translate-y-1 transition-all duration-300">
          <h2 className="text-2xl font-bold mb-6 text-slate-800 ">Crop Yield Trend (By Harvest Month)</h2>
          <Line data={lineData} />
        </div>
        <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-6 hover:-translate-y-1 transition-all duration-300">
          <h2 className="text-2xl font-bold mb-6 text-slate-800 ">Total Crop Production</h2>
          <Bar data={barData} />
        </div>
      </div>

      {/* Bottom */}
      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-6 hover:-translate-y-1 transition-all duration-300">
          <h2 className="text-2xl font-bold mb-6 text-slate-800 ">Crop Distribution</h2>
          <Pie data={pieData} />
        </div>
        <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-6 lg:col-span-2 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
          <div className="border-b border-emerald-50 pb-4 mb-6 bg-gradient-to-r from-emerald-50/50 to-transparent">
            <h2 className="text-2xl font-bold text-slate-800 ">Monthly Report</h2>
          </div>
          {(!monthlyReport || monthlyReport.length === 0) ? (
            <div className="text-gray-500 text-center py-12 border border-dashed border-gray-200 rounded-2xl">
              No data yet - add crop harvests to see monthly trends.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 ">
                    <th className="text-left py-4 font-semibold">Month</th>
                    <th className="text-left py-4 font-semibold">Production</th>
                    <th className="text-left py-4 font-semibold">Revenue</th>
                    <th className="text-left py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 "> {monthlyReport.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 text-gray-800 font-medium">{entry.month}</td>
                      <td className="text-gray-600 ">{entry.production} Tons</td>
                      <td className="text-emerald-600 font-medium">₹{(entry.revenue / 100000).toFixed(2)}L</td>
                      <td className={`font-semibold ${ entry.status === "Excellent" ? "text-green-600 " : entry.status === "Good" ? "text-blue-600 " : "text-yellow-600 " }`}>
                        {entry.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Analytics;