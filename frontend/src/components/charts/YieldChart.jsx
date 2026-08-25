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

function YieldChart() {

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

        data: [
          92,
          84,
          78,
          69,
          96,
          88,
        ],

        backgroundColor: [
          "#16A34A",
          "#3B82F6",
          "#FACC15",
          "#F97316",
          "#EF4444",
          "#8B5CF6",
        ],

        borderRadius: 10,

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

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold">

            Crop Yield Analytics

          </h2>

          <p className="text-gray-500 mt-1">

            Monthly crop production

          </p>

        </div>

        <select className="border rounded-lg px-4 py-2">

          <option>2026</option>
          <option>2025</option>

        </select>

      </div>

      <Bar data={data} options={options} />

    </div>

  );

}

export default YieldChart;