function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = "green",
}) {
  const colorClasses = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-3 text-slate-800">
            {value}
          </h2>

          <p className="text-gray-500 mt-2">
            {subtitle}
          </p>

        </div>

        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${colorClasses[color]}`} >
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;