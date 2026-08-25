import { FaCloudSun, FaCloudRain, FaSun, } from "react-icons/fa"; function ForecastCard({ day, temp, type, }) { const getIcon = () => {

    if (type === "Sunny")
      return <FaSun className="text-yellow-500 text-4xl" />;

    if (type === "Rain")
      return <FaCloudRain className="text-blue-500 text-4xl" />;

    return <FaCloudSun className="text-orange-400 text-4xl" />;
  };

  return (

    <div className="bg-white rounded-2xl shadow-lg p-5 text-center">

      <h3 className="font-semibold">

        {day}

      </h3>

      <div className="my-5">

        {getIcon()}

      </div>

      <h2 className="text-3xl font-bold">

        {temp}°C

      </h2>

      <p className="text-gray-500 mt-2">

        {type}

      </p>

    </div>

  );

}

export default ForecastCard;