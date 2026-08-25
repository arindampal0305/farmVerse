import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaStore, FaChartLine } from "react-icons/fa";
import { getMandiPrice } from "../../services/mandiService";

export default function MandiPriceWidget({ cropName, farmLocation }) {
  const [expanded, setExpanded] = useState(false);
  const priceData = getMandiPrice(cropName, farmLocation);
  const isPositive = priceData.change >= 0;

  return (
    <div className="mt-4 border-t pt-4 border-gray-100">
      <div 
        onClick={() => setExpanded(!expanded)} 
        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-all"
      >
        <div className="flex items-center gap-2">
          <FaStore className="text-emerald-600 text-lg" />
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Mandi Price</p>
            <p className="font-bold text-gray-800 text-sm">
              ₹{priceData.modalPrice.toLocaleString("en-IN")} <span className="text-[10px] text-gray-500 font-normal">/ {priceData.unit}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isPositive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {isPositive ? "+" : ""}{priceData.change}%
          </span>
          {expanded ? <FaChevronUp className="text-gray-400 text-xs" /> : <FaChevronDown className="text-gray-400 text-xs" />}
        </div>
      </div>

      {expanded && (
        <div className="mt-3 bg-gray-50 rounded-xl p-3 border border-gray-100 text-xs space-y-2 animate-in fade-in duration-200">
          <div className="flex justify-between">
            <span className="text-gray-500">Market</span>
            <span className="font-bold text-gray-800">{priceData.mandiName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Range (Min - Max)</span>
            <span className="font-bold text-gray-800">
              ₹{priceData.minPrice.toLocaleString("en-IN")} - ₹{priceData.maxPrice.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="pt-2 border-t border-gray-200">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-2 flex items-center gap-1">
              <FaChartLine /> 5-Day Trend ({priceData.unit})
            </p>
            <div className="flex justify-between gap-1 items-end h-16 pt-2">
              {priceData.history.map((day, idx) => {
                const minOfHistory = Math.min(...priceData.history.map(h => h.price));
                const maxOfHistory = Math.max(...priceData.history.map(h => h.price));
                const heightPercent = maxOfHistory === minOfHistory 
                  ? 50 
                  : ((day.price - minOfHistory) / (maxOfHistory - minOfHistory)) * 60 + 40;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center group/bar relative">
                    <div 
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-sm transition-all duration-300 ${isPositive ? "bg-emerald-500/30 group-hover/bar:bg-emerald-500" : "bg-red-500/30 group-hover/bar:bg-red-500"}`}
                    ></div>
                    <span className="text-[9px] text-gray-400 mt-1 scale-90">{day.date}</span>
                    <div className="absolute bottom-full mb-1 hidden group-hover/bar:block bg-slate-800 text-white text-[9px] rounded py-1 px-1.5 whitespace-nowrap z-10 shadow-md">
                      ₹{day.price}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-[9px] text-gray-400 text-right italic pt-1">Last updated: {priceData.lastUpdated}</p>
        </div>
      )}
    </div>
  );
}
