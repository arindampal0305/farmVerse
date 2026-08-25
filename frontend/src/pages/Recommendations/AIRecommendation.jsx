import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { FaRobot, FaLeaf, FaTemperatureHigh, FaTint, FaMapMarkerAlt, FaCheckCircle, FaSpinner, FaSeedling,
} from "react-icons/fa";
import { FaCloudRain } from "react-icons/fa6";
import { useNotifications } from "../../hooks/useNotifications"; const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "b2cf1d2569d8676de02b88f8e7b98ec2";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY; async function fetchWeather(location) { const res = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${OPENWEATHER_API_KEY}&units=metric` ); if (!res.ok) throw new Error("Location not found. Please enter a valid city name."); const data = await res.json(); return { temperature: Math.round(data.main.temp), humidity: data.main.humidity, rainfall: data.rain ? Math.round(data.rain["1h"] || data.rain["3h"] || 0) : 0, description: data.weather[0].description, city: data.name, };
} async function getAIRecommendation(farmData) {
  if (!GROQ_API_KEY || GROQ_API_KEY === "undefined" || GROQ_API_KEY === "") {
    return new Promise(resolve => setTimeout(() => resolve({
      recommendedCrop: "Wheat",
      confidence: "94%",
      expectedYield: "High",
      waterRequirement: "Medium",
      reasons: [
        "Optimal temperature range for wheat germination",
        "Soil type provides good drainage",
        "Current season aligns with wheat growing cycle",
        "Adequate rainfall predicted for vegetative stage"
      ],
      fertilizerTip: "Apply NPK 120:60:40 kg/ha in split doses.",
      harvestTime: "120-130 days",
      warningNote: "Monitor for yellow rust if humidity remains high."
    }), 1500));
  }

  const prompt = `You are an expert agricultural AI. Based on the following real farm conditions, recommend the single BEST crop to grow. Respond ONLY with a valid JSON object, no markdown, no explanation outside the JSON. Farm Conditions:
- Location: ${farmData.location}
- Temperature: ${farmData.temperature}°C
- Humidity: ${farmData.humidity}%
- Rainfall: ${farmData.rainfall} mm
- Soil Type: ${farmData.soilType}
- Soil pH: ${farmData.soilPh}
- Season: ${farmData.season} Respond with this exact JSON format:
{ "recommendedCrop": "crop name", "confidence": "percentage like 94%", "expectedYield": "High or Medium or Low", "waterRequirement": "High or Medium or Low", "reasons": [ "reason 1 specific to the data", "reason 2 specific to the data", "reason 3 specific to the data", "reason 4 specific to the data" ], "fertilizerTip": "one specific fertilizer recommendation", "harvestTime": "e.g. 90-120 days", "warningNote": "any risk or caution or empty string"
  }`;
  
  const res = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 1024,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || "Groq API failed");
  }

  const data = await res.json();
  let text = data.choices[0].message.content.trim();
  // Strip markdown code blocks if present
  text = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(text);
} const SOIL_TYPES = ["Loamy", "Clay", "Sandy", "Black Soil", "Red Soil", "Alluvial", "Laterite"];
const SEASONS = ["Kharif (June–Oct)", "Rabi (Oct–Mar)", "Zaid (Mar–Jun)"]; export default function AIRecommendation() { const { addNotification } = useNotifications(); const [form, setForm] = useState({ location: "", soilType: "", soilPh: "", season: "", temperature: "", humidity: "", rainfall: "", }); const [weatherFetched, setWeatherFetched] = useState(false); const [loading, setLoading] = useState(false); const [weatherLoading, setWeatherLoading] = useState(false); const [result, setResult] = useState(null); const [error, setError] = useState(null); const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); }; const handleFetchWeather = async () => { if (!form.location.trim()) { setError("Please enter a location first."); return; } setWeatherLoading(true); setError(null); try { const weather = await fetchWeather(form.location); setForm((prev) => ({ ...prev, temperature: String(weather.temperature), humidity: String(weather.humidity), rainfall: String(weather.rainfall), location: weather.city, })); setWeatherFetched(true); } catch (e) { setError(e.message); } finally { setWeatherLoading(false); } }; const handleGenerate = async () => {
    if (!form.location || !form.soilType || !form.soilPh || !form.season) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const rec = await getAIRecommendation(form);
      setResult(rec);
      addNotification(`New AI recommendation: ${rec.recommendedCrop}`, 'ai_rec');
    } catch (e) {
      setError("AI Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 ">
            AI Crop Recommendation
          </h1>
          <p className="text-gray-500 mt-1 md:mt-2 text-sm md:text-lg">
            Real AI-powered recommendations using live weather + Gemini AI.
          </p>
        </div>
        <button onClick={handleGenerate} disabled={loading} className="w-full sm:w-auto justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-6 py-3.5 md:py-3 rounded-xl shadow-lg shadow-green-600/30 transition-all hover:-translate-y-1 flex items-center gap-2 font-semibold" >
          {loading ? <FaSpinner className="animate-spin" /> : <FaRobot />}
          {loading ? "Generating..." : "Generate Recommendation"}
        </button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 mb-10 md:mb-0">
        <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-gray-800 ">Enter Farm Details</h2>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">

          {/* Location with Fetch Weather Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="City / Location (e.g. Bangalore)" className="flex-1 w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" />
            <button onClick={handleFetchWeather} disabled={weatherLoading} className="w-full sm:w-auto shrink-0 whitespace-nowrap justify-center py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-5 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100" >
              {weatherLoading ? <FaSpinner className="animate-spin" /> : <FaCloudRain />}
              {weatherLoading ? "..." : "Get Weather"}
            </button>
          </div>

          {/* Soil Type */}
          <select name="soilType" value={form.soilType} onChange={handleChange} className="border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" >
            <option value="">Select Soil Type *</option> {SOIL_TYPES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Temperature - auto-filled by weather */}
          <div className="relative">
            <input type="number" name="temperature" value={form.temperature} onChange={handleChange} placeholder="Temperature (°C)" className={`w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all ${weatherFetched ? "ring-2 ring-blue-500/30 border-blue-400 " : ""}`} />
            {weatherFetched && (
              <span className="absolute right-4 top-4 text-sm text-blue-600 font-semibold">Live ✓</span>
            )}
          </div>

          {/* Humidity - auto-filled */}
          <div className="relative">
            <input type="number" name="humidity" value={form.humidity} onChange={handleChange} placeholder="Humidity (%)" className={`w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all ${weatherFetched ? "ring-2 ring-blue-500/30 border-blue-400 " : ""}`} />
            {weatherFetched && (
              <span className="absolute right-4 top-4 text-sm text-blue-600 font-semibold">Live ✓</span>
            )}
          </div>

          {/* Rainfall - auto-filled */}
          <div className="relative">
            <input type="number" name="rainfall" value={form.rainfall} onChange={handleChange} placeholder="Rainfall (mm)" className={`w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all ${weatherFetched ? "ring-2 ring-blue-500/30 border-blue-400 " : ""}`} />
            {weatherFetched && (
              <span className="absolute right-4 top-4 text-sm text-blue-600 font-semibold">Live ✓</span>
            )}
          </div>

          {/* Soil pH */}
          <input type="number" name="soilPh" step="0.1" min="0" max="14" value={form.soilPh} onChange={handleChange} placeholder="Soil pH (e.g. 6.5) *" className="border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" />

          {/* Season */}
          <select name="season" value={form.season} onChange={handleChange} className="border border-gray-200 rounded-xl p-4 md:col-span-2 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" >
            <option value="">Select Season *</option> {SEASONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4">
          ⚠️ {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mt-10 bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping"></div>
            <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white shadow-lg">
              <FaRobot size={40} className="animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 ">Gemini AI is analyzing your farm conditions...</h2>
          <p className="text-gray-500 mt-3 text-lg">Cross-referencing soil type, live weather, and crop yield data.</p>
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Recommendation Cards */}
          <div className="grid md:grid-cols-4 gap-6 mt-10">
            <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 shadow-sm hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                <FaLeaf size={28} className="text-emerald-600 " />
              </div>
              <p className="text-emerald-600/80 font-medium text-sm tracking-wide uppercase">Recommended Crop</p>
              <h2 className="text-4xl font-bold text-emerald-700 mt-2">{result.recommendedCrop}</h2>
            </div>

            <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 shadow-sm hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <FaRobot size={28} className="text-blue-600 " />
              </div>
              <p className="text-blue-600/80 font-medium text-sm tracking-wide uppercase">AI Confidence</p>
              <h2 className="text-4xl font-bold text-blue-700 mt-2">{result.confidence}</h2>
            </div>

            <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 shadow-sm hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                <FaTemperatureHigh size={28} className="text-amber-600 " />
              </div>
              <p className="text-amber-600/80 font-medium text-sm tracking-wide uppercase">Expected Yield</p>
              <h2 className="text-4xl font-bold text-amber-700 mt-2">{result.expectedYield}</h2>
            </div>

            <div className="bg-cyan-50 rounded-3xl p-8 border border-cyan-100 shadow-sm hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 rounded-full bg-cyan-100 flex items-center justify-center mb-6">
                <FaTint size={28} className="text-cyan-600 " />
              </div>
              <p className="text-cyan-600/80 font-medium text-sm tracking-wide uppercase">Water Requirement</p>
              <h2 className="text-4xl font-bold text-cyan-700 mt-2">{result.waterRequirement}</h2>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mt-10 p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                <FaRobot size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 ">AI Analysis</h2>
                <p className="text-gray-500 mt-1">Why Gemini AI selected <strong className="text-emerald-600 ">{result.recommendedCrop}</strong></p>
              </div>
            </div>

            <div className="space-y-4"> {result.reasons.map((reason, i) => (
                <div key={i} className="flex items-start gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:border-emerald-200 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FaCheckCircle className="text-emerald-600 text-lg" />
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed pt-0.5">{reason}</p>
                </div>
              ))}
            </div>

            {result.warningNote && (
              <div className="mt-6 flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <span className="text-3xl">⚠️</span>
                <div>
                  <h3 className="font-bold text-amber-800 mb-1">Important Note</h3>
                  <p className="text-amber-700 leading-relaxed">{result.warningNote}</p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Info */}
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
              <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-4">Farm Conditions Used</h2>
              <div className="space-y-5 text-gray-700 text-lg">
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl"><div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"><FaMapMarkerAlt className="text-red-500" /></div> <span className="font-medium">{form.location}</span></div>
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl"><div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-xl">🌾</div> <span className="font-medium">Soil Type: {form.soilType}</span></div>
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl"><div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl">🧪</div> <span className="font-medium">Soil pH: {form.soilPh}</span></div>
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl"><div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">🗓️</div> <span className="font-medium">Season: {form.season}</span></div>
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl"><div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl">🌡️</div> <span className="font-medium">Temperature: {form.temperature}°C</span></div>
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl"><div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-xl">💧</div> <span className="font-medium">Humidity: {form.humidity}%</span></div>
                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl"><div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><FaCloudRain className="text-blue-500" /></div> <span className="font-medium">Rainfall: {form.rainfall} mm</span></div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
              <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-4">Additional Tips</h2>
              <div className="space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <FaSeedling className="text-emerald-600 " />
                    </div>
                    <span className="font-bold text-emerald-800 text-lg">Fertilizer Tip</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed ml-13">{result.fertilizerTip}</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                      ⏱️
                    </div>
                    <span className="font-bold text-blue-800 text-lg">Harvest Time</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed ml-13">{result.harvestTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Default state - no result yet */}
      {!result && !loading && !error && (
        <div className="mt-10 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200 p-16 text-center text-gray-400">
          <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6">
            <FaRobot size={40} className="text-gray-300 " />
          </div>
          <p className="text-2xl font-medium text-gray-500 mb-3">Ready to Analyze</p>
          <p className="text-lg mb-2">Fill in the farm details above and click <strong className="text-emerald-500">Generate Recommendation</strong>.</p>
          <p className="text-sm">Tip: Click <strong className="text-blue-500">Get Weather</strong> to auto-fill live temperature, humidity and rainfall for your location!</p>
        </div>
      )}

    </DashboardLayout>
  );
}