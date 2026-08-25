import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardHeader from "../../components/ui/DashboardHeader";
import StatCard from "../../components/ui/StatCard";
import ChartCard from "../../components/ui/ChartCard";
import WeatherCard from "../../components/ui/WeatherCard";
import AIInsightCard from "../../components/ui/AIInsightCard";
import ActivityCard from "../../components/ui/ActivityCard";
import FarmCard from "../../components/ui/FarmCard";

import {
  FaCloudSun,
  FaLeaf,
  FaTint,
  FaTractor,
} from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "Rice",
    "Wheat",
    "Maize",
    "Cotton",
    "Tomato",
    "Sugarcane",
  ],

  datasets: [
    {
      label: "Yield %",
      data: [92, 84, 78, 69, 96, 88],

      backgroundColor: [
        "#16A34A",
        "#3B82F6",
        "#FACC15",
        "#F97316",
        "#EF4444",
        "#8B5CF6",
      ],

      borderRadius: 8,
    },
  ],
};

const options = {
  responsive: true,

  plugins: {
    legend: {
      display: false,
    },
  },
};

function Dashboard() {
      return (
    <DashboardLayout>

      {/* Header */}

      <DashboardHeader />

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Weather"
          value="29°C"
          subtitle="Sunny"
          icon={<FaCloudSun />} color="yellow" />

        <StatCard
          title="Crop Health"
          value="98%"
          subtitle="Healthy"
          icon={<FaLeaf />} color="green" />

        <StatCard
          title="Water Tank"
          value="82%"
          subtitle="Tank Level"
          icon={<FaTint />} color="blue" />

        <StatCard
          title="Active Farms"
          value="12"
          subtitle="Registered"
          icon={<FaTractor />} color="orange" />

      </div>

      {/* Chart & Weather */}

      <div className="grid lg:grid-cols-3 gap-8 mt-10">

        <div className="lg:col-span-2">

          <ChartCard title="Crop Yield Analytics">

            <Bar data={data} options={options} />

          </ChartCard>

        </div>

        <WeatherCard />

      </div>

      {/* AI & Activity */}

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        <AIInsightCard />

        <ActivityCard />

      </div>

      {/* Farm */}

      <div className="mt-10">

        <FarmCard />

      </div>

      {/* Crop Status */}

      <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">

            Crop Status

          </h2>

          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">

            View All

          </button>

        </div>

        <table className="w-full">

          <thead>

            <tr className="border-b text-left">

              <th className="py-3">
                Crop
              </th>

              <th>
                Health
              </th>

              <th>
                Moisture
              </th>

              <th>
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b">

              <td className="py-4">

                🌾 Rice

              </td>

              <td>

                98%

              </td>

              <td>

                75%

              </td>

              <td>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                  Healthy

                </span>

              </td>

            </tr>

            <tr className="border-b">

              <td className="py-4">

                🌽 Wheat

              </td>

              <td>

                91%

              </td>

              <td>

                68%

              </td>

              <td>

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

                  Good

                </span>

              </td>

            </tr>
                        <tr className="border-b">

              <td className="py-4">

                🍅 Tomato

              </td>

              <td>

                74%

              </td>

              <td>

                52%

              </td>

              <td>

                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">

                  Needs Water

                </span>

              </td>

            </tr>

            <tr>

              <td className="py-4">

                🧅 Onion

              </td>

              <td>

                96%

              </td>

              <td>

                82%

              </td>

              <td>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                  Healthy

                </span>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

      {/* Bottom Widgets */}

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        {/* Upcoming Tasks */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">

            📅 Upcoming Tasks

          </h2>

          <div className="space-y-5">

            <div className="border-l-4 border-green-600 pl-4">

              <h4 className="font-semibold">

                Irrigation Schedule

              </h4>

              <p className="text-gray-500">

                Today - 5:00 PM

              </p>

            </div>

            <div className="border-l-4 border-blue-600 pl-4">

              <h4 className="font-semibold">

                Weather Review

              </h4>

              <p className="text-gray-500">

                Tomorrow

              </p>

            </div>

            <div className="border-l-4 border-orange-500 pl-4">

              <h4 className="font-semibold">

                Fertilizer Application

              </h4>

              <p className="text-gray-500">

                Friday

              </p>

            </div>

          </div>

        </div>

        {/* Farm Progress */}

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-6">

            🌱 Farm Progress

          </h2>

          <div className="space-y-6">

            <div>

              <div className="flex justify-between mb-2">

                <span>

                  Rice

                </span>

                <span>

                  96%

                </span>

              </div>

              <div className="bg-gray-200 h-3 rounded-full">

                <div className="bg-green-600 h-3 rounded-full w-[96%]"></div>

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">

                <span>

                  Wheat

                </span>

                <span>

                  84%

                </span>

              </div>

              <div className="bg-gray-200 h-3 rounded-full">

                <div className="bg-blue-600 h-3 rounded-full w-[84%]"></div>

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">

                <span>

                  Tomato

                </span>

                <span>

                  70%

                </span>

              </div>

              <div className="bg-gray-200 h-3 rounded-full">

                <div className="bg-orange-500 h-3 rounded-full w-[70%]"></div>

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">

                <span>

                  Cotton

                </span>

                <span>

                  88%

                </span>

              </div>

              <div className="bg-gray-200 h-3 rounded-full">

                <div className="bg-purple-600 h-3 rounded-full w-[88%]"></div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );
}

export default Dashboard;