import { useEffect, useState } from "react"; import axios from "axios"; import { WiDaySunny, WiHumidity, WiStrongWind, WiCloud, } from "react-icons/wi"; import DashboardLayout from "../../components/layout/DashboardLayout"; const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "b2cf1d2569d8676de02b88f8e7b98ec2"; export default function Weather() { const [city, setCity] = useState("Bengaluru"); const [weather, setWeather] = useState(null); const [forecast, setForecast] = useState([]); const [loading, setLoading] = useState(false); const fetchWeather = async (cityName) => { try { setLoading(true); const current = await axios.get( `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}` ); const next = await axios.get( `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}` ); setWeather(current.data); const daily = next.data.list.filter((item) => item.dt_txt.includes("12:00:00") ); setForecast(daily); } catch (err) { alert("Unable to fetch weather."); console.error(err); } finally { setLoading(false); } }; useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4 md:mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 ">
            🌦 Weather Dashboard
          </h1>
          <p className="text-gray-500 mt-1 md:mt-2 text-sm md:text-lg">
            Real-time weather insights and 5-day forecast.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input className="border border-gray-200 rounded-xl p-3 w-full sm:w-80 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Search City" />

          <button onClick={() => fetchWeather(city)} className="w-full sm:w-auto justify-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3.5 md:py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1" >
            Search
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <h2 className="text-xl font-semibold text-gray-500 animate-pulse">Fetching Weather Data...</h2>
        </div>
      )}

      {weather && (
        <>
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-6 md:p-10">

            <div className="flex justify-between items-center border-b border-gray-100 pb-6 md:pb-8">

              <div>
                <h2 className="text-5xl md:text-6xl font-bold text-gray-800 ">
                  {weather.main.temp}°C
                </h2>

                <p className="text-xl md:text-2xl capitalize text-gray-600 mt-1 md:mt-2 font-medium">
                  {weather.weather[0].description}
                </p>

                <p className="text-gray-500 mt-2 md:mt-3 text-sm md:text-lg font-medium flex items-center gap-2">
                  <span className="text-red-500 text-lg md:text-xl">📍</span> {weather.name}
                </p>
              </div>

              <WiDaySunny className="text-yellow-500 text-7xl md:text-9xl drop-shadow-lg" />

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">

              <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 ">
                <WiHumidity className="text-6xl mx-auto text-blue-500 " />
                <h3 className="font-semibold mt-3 text-gray-700 ">Humidity</h3>
                <p className="text-xl font-bold text-gray-800 mt-1">{weather.main.humidity}%</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 ">
                <WiStrongWind className="text-6xl mx-auto text-emerald-500 " />
                <h3 className="font-semibold mt-3 text-gray-700 ">Wind</h3>
                <p className="text-xl font-bold text-gray-800 mt-1">{weather.wind.speed} m/s</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 ">
                <WiCloud className="text-6xl mx-auto text-gray-400 " />
                <h3 className="font-semibold mt-3 text-gray-700 ">Clouds</h3>
                <p className="text-xl font-bold text-gray-800 mt-1">{weather.clouds.all}%</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 ">
                <div className="text-4xl mt-3 mb-4 mx-auto text-purple-500 ">⏱</div>
                <h3 className="font-semibold text-gray-700 ">Pressure</h3>
                <p className="text-xl font-bold text-gray-800 mt-1">
                  {weather.main.pressure} hPa
                </p>
              </div>

            </div>

          </div>

          <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-800 ">
            5-Day Forecast
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6"> {forecast.map((day) => (
              <div key={day.dt} className="bg-white h-52 flex flex-col justify-center rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 p-6 text-center hover:-translate-y-1 transition-all duration-300" >
                <h3 className="font-bold text-gray-800 text-lg">
                  {new Date(day.dt_txt).toLocaleDateString("en-IN", {
                    weekday: "short",
                  })}
                </h3>

                <WiDaySunny className="text-yellow-500 text-7xl mx-auto my-2 drop-shadow-md" />

                <p className="text-3xl font-bold text-gray-800 ">
                  {Math.round(day.main.temp)}°
                </p>

                <p className="capitalize text-gray-500 mt-2 font-medium">
                  {day.weather[0].description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-2xl shadow-sm p-8 mt-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🌾</span>
              <h2 className="text-2xl font-bold text-emerald-800 ">
                Smart Farming Recommendation
              </h2>
            </div>

            <ul className="list-disc ml-8 space-y-3 text-emerald-900/80 text-lg"> {weather.main.humidity > 80 ? (
                <li>High humidity. Monitor crops for fungal diseases.</li>
              ) : (
                <li>Humidity is suitable for healthy crop growth.</li> )} {weather.wind.speed > 8 ? (
                <li>Avoid pesticide spraying due to strong winds.</li>
              ) : (
                <li>Wind conditions are favorable for spraying.</li>
              )}

              {weather.weather[0].main === "Rain" ? (
                <li>Rain expected. Postpone irrigation today.</li>
              ) : (
                <li>No significant rain expected. Irrigation can continue if required.</li>
              )}
            </ul>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}