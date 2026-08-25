import React from "react"; const WeatherCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4 hover:shadow-lg transition">
      <div className="text-3xl text-green-600">
        {icon}
      </div>

      <div>
        <h4 className="text-gray-500 text-sm">
          {title}
        </h4>

        <h2 className="text-2xl font-bold">
          {value}
        </h2>
      </div>
    </div>
  );
};

export default WeatherCard;