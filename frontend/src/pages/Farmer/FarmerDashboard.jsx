import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSeedling, FaLeaf, FaCloudSun, FaPlus } from "react-icons/fa";
import { MapPin, Sprout, Wheat, Ruler, Droplets, Wind, AlertTriangle, CheckCircle, CloudRain } from "lucide-react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import { getAllFarms } from "../../services/farm";
import axios from "axios";

function FarmerDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user.username || "Farmer";
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Weather States
  const [farmWeather, setFarmWeather] = useState({});
  const [loadingWeather, setLoadingWeather] = useState({});

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const response = await getAllFarms();
      console.log("GET ALL FARMS RESPONSE:", response);
      setFarms(response.farms || []);
    } catch (err) {
      console.error("Error loading farms:", err);
      setFarms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllWeather = async () => {
      farms.forEach(async (farm) => {
        if (!farm.location) return;
        setLoadingWeather((prev) => ({ ...prev, [farm.farmId]: true }));
        try {
          const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "b2cf1d2569d8676de02b88f8e7b98ec2";
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
              farm.location.trim()
            )}&units=metric&appid=${API_KEY}`
          );
          setFarmWeather((prev) => ({ ...prev, [farm.farmId]: res.data }));
        } catch (err) {
          console.error(`Failed to fetch weather for farm ${farm.farmName} at ${farm.location}:`, err);
        } finally {
          setLoadingWeather((prev) => ({ ...prev, [farm.farmId]: false }));
        }
      });
    };

    if (farms.length > 0) {
      fetchAllWeather();
    }
  }, [farms]);

  const totalArea = farms.reduce( (sum, farm) => sum + Number(farm.areaSqMt ?? 0), 0 );
  const totalCrops = farms.reduce( (sum, farm) => sum + (farm.cropCount || 0), 0 );

  return (
    <DashboardLayout>
      {/* Heading */}
      <div className="mb-4 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 ">
          Farmer Dashboard
        </h1>

        <p className="text-gray-500 mt-2 text-sm md:text-lg">
          Welcome back, {username}! Here's an overview of your farm.
        </p>
      </div>

      {/* Grid Layout: Main Dashboard Content Left, Recommendations Sidebar Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        
        {/* Left Column (Main content) */}
        <div className="lg:col-span-2 xl:col-span-3 space-y-10">
          
          {/* Dashboard Cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            
            {/* Farms Card */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-4 md:p-6 flex flex-col justify-center hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
                <div className="order-2 md:order-1">
                  <p className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-wider">My Farms</p>
                  <h2 className="text-2xl md:text-4xl font-extrabold mt-0.5 md:mt-1 text-slate-800 ">
                    {loading ? "..." : farms.length}
                  </h2>
                </div>
                <div className="order-1 md:order-2 w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                  <FaSeedling className="text-lg md:text-3xl text-emerald-600 " />
                </div>
              </div>
            </div>

            {/* Crops Card */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-4 md:p-6 flex flex-col justify-center hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
                <div className="order-2 md:order-1">
                  <p className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-wider">My Crops</p>
                  <h2 className="text-2xl md:text-4xl font-extrabold mt-0.5 md:mt-1 text-slate-800 ">
                    {loading ? "..." : totalCrops}
                  </h2>
                </div>
                <div className="order-1 md:order-2 w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <FaLeaf className="text-lg md:text-3xl text-amber-500 " />
                </div>
              </div>
            </div>

            {/* Total Area Card */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-4 md:p-6 flex flex-col justify-center hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
                <div className="order-2 md:order-1">
                  <p className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-wider">Total Area</p>
                  <h2 className="text-lg md:text-2xl font-extrabold mt-0.5 md:mt-1 text-slate-800 break-all md:break-normal line-clamp-1">
                    {loading ? "..." : `${totalArea} sq.m`}
                  </h2>
                </div>
                <div className="order-1 md:order-2 w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                  <FaCloudSun className="text-lg md:text-3xl text-cyan-600 " />
                </div>
              </div>
            </div>

            {/* Quick Action Card */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-4 md:p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group">
              <p className="text-[10px] md:text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Quick Action</p>
              <button onClick={() => navigate("/farm/add")} className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-3 md:px-5 py-2 md:py-3 rounded-lg md:rounded-xl flex items-center justify-center gap-1.5 md:gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] text-xs md:text-base mt-auto" >
                <FaPlus />
                Add Farm
              </button>
            </div>
          </div>

          {/* Recent Farms Section */}
          <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-8">
            <div className="flex justify-between items-center mb-8 border-b border-emerald-50 pb-4 bg-gradient-to-r from-emerald-50/50 to-transparent">
              <h2 className="text-2xl font-bold text-slate-800 ">
                My Farms
              </h2>
              <button onClick={() => navigate("/farm")} className="text-emerald-600 hover:text-emerald-700 font-semibold" >
                View All →
              </button>
            </div>

            {loading ? (
              <p className="text-gray-500 ">Loading farms...</p>
            ) : farms.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 text-lg mb-5">
                  No farms added yet.
                </p>
                <button onClick={() => navigate("/farm/add")} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-1" >
                  Add Your First Farm
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {farms.slice(0, 6).map((farm) => (
                  <div key={farm.farmId} className="bg-emerald-50/30 border border-emerald-100 rounded-2xl p-6 hover:shadow-xl shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-300 group" >
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                      {farm.farmName}
                    </h3>
                    <div className="mt-4 space-y-2 text-sm text-gray-600 font-medium">
                      <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-600" /> {farm.location}</p>
                      <p className="flex items-center gap-2"><Sprout className="w-4 h-4 text-emerald-600" /> {farm.farmType}</p>
                      <p className="flex items-center gap-2"><Wheat className="w-4 h-4 text-emerald-600" /> {farm.cropCount} Crops</p>
                      {farm.cropNames && farm.cropNames.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1 pl-6">
                          {farm.cropNames.map((name, idx) => (
                            <span key={idx} className="bg-emerald-100/50 text-emerald-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200/50">
                              {name}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="flex items-center gap-2"><Ruler className="w-4 h-4 text-emerald-600" /> {farm.areaSqMt} sq.m</p>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <button onClick={() => navigate(`/farm/${farm.farmId}`)} className="flex-1 bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 font-bold px-3 py-3 rounded-xl transition-colors shadow-sm text-sm text-center" >
                        View Farm
                      </button>
                      <button onClick={() => navigate(`/farm/${farm.farmId}/crop/add`)} className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold px-3 py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] text-sm text-center" >
                        <FaPlus className="text-xs" />
                        Add Crop
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Smart Weather Recommendations Sidebar) */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">
              Smart Recommendations
            </h2>

            {loading ? (
              <div className="py-10 text-center text-gray-500 font-medium animate-pulse">
                Loading recommendations...
              </div>
            ) : farms.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-gray-500 text-sm font-medium">No farms registered yet.</p>
                <p className="text-xs text-gray-400 mt-1">Register a farm to see weather recommendations.</p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-1">
                {farms.map((farm) => (
                  <div key={farm.farmId} className="bg-emerald-50/10 rounded-2xl border border-emerald-100/60 p-4 hover:bg-emerald-50/20 transition-colors">
                    {/* Farm Title & Details */}
                    <div className="flex justify-between items-start mb-3 gap-2">
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                          <Sprout className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="truncate max-w-[120px] inline-block">{farm.farmName}</span>
                        </h3>
                        <p className="text-gray-500 text-[10px] flex items-center gap-1 mt-1 font-medium">
                          <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                          <span className="truncate max-w-[120px] inline-block">{farm.location}</span>
                        </p>
                      </div>
                      <span className="bg-emerald-100/70 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">
                        {farm.farmType}
                      </span>
                    </div>

                    {/* Weather Data */}
                    {loadingWeather[farm.farmId] ? (
                      <div className="py-4 flex justify-center items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-500"></div>
                        <span className="text-[10px] text-gray-400 ml-2">Loading weather...</span>
                      </div>
                    ) : farmWeather[farm.farmId] ? (
                      (() => {
                        const weather = farmWeather[farm.farmId];
                        const temp = Math.round(weather.main.temp);
                        const desc = weather.weather[0].description;
                        const humidity = weather.main.humidity;
                        const windSpeed = weather.wind.speed;
                        const condition = weather.weather[0].main;

                        return (
                          <div className="mt-3 pt-3 border-t border-emerald-100/60">
                            {/* Weather Status Row */}
                            <div className="flex justify-between items-center bg-blue-50/70 rounded-xl p-2.5 mb-3">
                              <div>
                                <span className="text-lg font-extrabold text-blue-900">{temp}°C</span>
                                <p className="text-[10px] capitalize text-blue-700 font-medium">{desc}</p>
                              </div>
                              <div className="text-right text-[10px] text-blue-800 font-medium space-y-0.5">
                                <p className="flex items-center gap-1 justify-end"><Droplets className="w-3 h-3 text-blue-500" /> Hum: {humidity}%</p>
                                <p className="flex items-center gap-1 justify-end"><Wind className="w-3 h-3 text-blue-500" /> Wind: {windSpeed}m/s</p>
                              </div>
                            </div>

                            {/* Recommendations */}
                            <div className="space-y-2">
                              <ul className="space-y-2 text-[11px] font-medium">
                                {/* Humidity checks */}
                                {humidity > 80 ? (
                                  <li className="flex items-start gap-1.5 text-amber-800 bg-amber-50/50 p-2 rounded-lg border border-amber-100">
                                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
                                    <span>High humidity. Monitor crops for fungal diseases.</span>
                                  </li>
                                ) : (
                                  <li className="flex items-start gap-1.5 text-emerald-800 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
                                    <span>Humidity is suitable for healthy crop growth.</span>
                                  </li>
                                )}

                                {/* Wind speed checks */}
                                {windSpeed > 8 ? (
                                  <li className="flex items-start gap-1.5 text-amber-800 bg-amber-50/50 p-2 rounded-lg border border-amber-100">
                                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
                                    <span>Avoid pesticide spraying due to strong winds.</span>
                                  </li>
                                ) : (
                                  <li className="flex items-start gap-1.5 text-emerald-800 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
                                    <span>Wind conditions are favorable for spraying.</span>
                                  </li>
                                )}

                                {/* Rain checks */}
                                {condition === "Rain" ? (
                                  <li className="flex items-start gap-1.5 text-blue-800 bg-blue-50/50 p-2 rounded-lg border border-blue-100">
                                    <CloudRain className="w-4 h-4 mt-0.5 shrink-0 text-blue-600" />
                                    <span>Rain expected today. Postpone scheduled irrigation.</span>
                                  </li>
                                ) : (
                                  <li className="flex items-start gap-1.5 text-emerald-800 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
                                    <span>No rain expected. Irrigation can continue if required.</span>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="mt-3 pt-3 border-t border-emerald-100/60 text-center py-2 text-xs text-red-500 font-semibold flex items-center justify-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" /> Weather unavailable for "{farm.location.trim()}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default FarmerDashboard;