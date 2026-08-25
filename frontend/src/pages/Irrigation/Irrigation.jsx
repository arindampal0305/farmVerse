import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  FaTint,
  FaWater,
  FaPowerOff,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

function Irrigation() {
  return (
    <DashboardLayout>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Smart Irrigation
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor and control irrigation efficiently.
          </p>

        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg">
          Schedule Irrigation
        </button>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <FaTint className="text-blue-600 text-5xl mb-5"/>

          <h2 className="text-gray-500">
            Soil Moisture
          </h2>

          <h1 className="text-4xl font-bold mt-3">
            74%
          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <FaWater className="text-cyan-600 text-5xl mb-5"/>

          <h2 className="text-gray-500">
            Water Tank
          </h2>

          <h1 className="text-4xl font-bold mt-3">
            82%
          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <FaPowerOff className="text-green-600 text-5xl mb-5"/>

          <h2 className="text-gray-500">
            Pump Status
          </h2>

          <h1 className="text-3xl font-bold mt-3 text-green-600">
            ON
          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <FaClock className="text-orange-500 text-5xl mb-5"/>

          <h2 className="text-gray-500">
            Next Schedule
          </h2>

          <h1 className="text-3xl font-bold mt-3">
            6:00 AM
          </h1>

        </div>

      </div>

      {/* Pump Controls */}

      <div className="bg-white rounded-3xl shadow-lg mt-10 p-8">

        <h2 className="text-2xl font-bold mb-8">
          Pump Controls
        </h2>

        <div className="flex gap-6">

          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl">
            Start Pump
          </button>

          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl">
            Stop Pump
          </button>

        </div>

      </div>

      {/* Irrigation History */}

      <div className="bg-white rounded-3xl shadow-lg mt-10 p-8">

        <h2 className="text-2xl font-bold mb-8">
          Irrigation History
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Date</th>

              <th className="text-left">Time</th>

              <th className="text-left">Duration</th>

              <th className="text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b">

              <td className="py-4">07 Jul</td>

              <td>06:00 AM</td>

              <td>30 mins</td>

              <td className="text-green-600 font-semibold">
                Completed
              </td>

            </tr>

            <tr className="border-b">

              <td className="py-4">06 Jul</td>

              <td>06:00 AM</td>

              <td>25 mins</td>

              <td className="text-green-600 font-semibold">
                Completed
              </td>

            </tr>

            <tr>

              <td className="py-4">05 Jul</td>

              <td>06:00 AM</td>

              <td>28 mins</td>

              <td className="text-blue-600 font-semibold">
                Scheduled
              </td>

            </tr>

          </tbody>

        </table>

      </div>

      {/* AI Recommendation */}

      <div className="bg-white rounded-3xl shadow-lg mt-10 p-8">

        <div className="flex items-center gap-4 mb-6">

          <FaCheckCircle className="text-green-600 text-3xl"/>

          <h2 className="text-2xl font-bold">
            AI Irrigation Suggestion
          </h2>

        </div>

        <div className="space-y-4">

          <div className="bg-green-50 rounded-xl p-4">
            ✅ Soil moisture is sufficient for the next 12 hours.
          </div>

          <div className="bg-yellow-50 rounded-xl p-4">
            ⚠ Irrigation is recommended tomorrow morning.
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            💧 Estimated water saving: 18%.
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Irrigation;