import {
  FaCloudSun,
  FaTint,
  FaWind,
  FaTemperatureHigh,
  FaCloudRain,
} from "react-icons/fa";

function WeatherCard() {
  return (
    <div className="bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-600 text-white rounded-2xl shadow-lg p-6 h-full">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold">
            Bengaluru
          </h2>

          <p className="text-blue-100">
            Karnataka, India
          </p>

        </div>

        <FaCloudSun className="text-5xl" />

      </div>

      {/* Temperature */}

      <div className="mt-8">

        <h1 className="text-6xl font-bold">
          29°C
        </h1>

        <p className="text-xl mt-2">
          Sunny
        </p>

      </div>

      {/* Weather Details */}

      <div className="grid grid-cols-2 gap-4 mt-10">

        <div className="bg-white/20 rounded-xl p-4">

          <FaTint className="text-2xl" />

          <p className="mt-2 text-sm">
            Humidity
          </p>

          <h3 className="text-2xl font-bold">
            72%
          </h3>

        </div>

        <div className="bg-white/20 rounded-xl p-4">

          <FaWind className="text-2xl" />

          <p className="mt-2 text-sm">
            Wind Speed
          </p>

          <h3 className="text-2xl font-bold">
            14 km/h
          </h3>

        </div>

        <div className="bg-white/20 rounded-xl p-4">

          <FaTemperatureHigh className="text-2xl" />

          <p className="mt-2 text-sm">
            Feels Like
          </p>

          <h3 className="text-2xl font-bold">
            31°C
          </h3>

        </div>

        <div className="bg-white/20 rounded-xl p-4">

          <FaCloudRain className="text-2xl" />

          <p className="mt-2 text-sm">
            Rain Chance
          </p>

          <h3 className="text-2xl font-bold">
            15%
          </h3>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 bg-white/20 rounded-xl p-4">

        <div className="flex justify-between">

          <span>Sunrise</span>

          <span>06:02 AM</span>

        </div>

        <div className="flex justify-between mt-3">

          <span>Sunset</span>

          <span>06:48 PM</span>

        </div>

      </div>

    </div>
  );
}

export default WeatherCard;