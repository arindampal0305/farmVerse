import {
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUserCircle,
} from "react-icons/fa";

function Topbar() {
  return (
    <header className="h-20 bg-white shadow-sm flex items-center justify-between px-10 border-b border-gray-200">

      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back, Ananya
        </p>

      </div>

      {/* Center */}

      <div className="hidden lg:flex items-center bg-gray-100 rounded-xl px-4 py-3 w-[420px]">

        <FaSearch className="text-gray-400 mr-3" />

        <input type="text" placeholder="Search farms, crops, reports..." className="bg-transparent outline-none w-full text-gray-700" />

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        <button className="relative bg-gray-100 p-3 rounded-xl hover:bg-green-100 transition">

          <FaBell className="text-xl text-slate-700" />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>

        </button>

        <button className="relative bg-gray-100 p-3 rounded-xl hover:bg-green-100 transition">

          <FaEnvelope className="text-xl text-slate-700" />

          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            2
          </span>

        </button>

        <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl">

          <FaUserCircle className="text-green-700" size={40} />

          <div>

            <h2 className="font-semibold text-slate-800">
              Ananya
            </h2>

            <p className="text-sm text-gray-500">
              Frontend Developer
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;