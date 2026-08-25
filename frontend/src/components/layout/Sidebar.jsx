import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaSeedling,
  FaLeaf,
  FaCloudSun,
  FaChartBar,
  FaRobot,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaHistory
} from "react-icons/fa";

import { logout } from "../../services/auth";

function Sidebar({ isOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const adminMenu = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/admin/dashboard",
    },
    {
      name: "Farmers",
      icon: <FaUsers />,
      path: "/admin/farmers",
    },
    {
      name: "Farms",
      icon: <FaSeedling />,
      path: "/admin/farms",
    },
    {
      name: "Crops",
      icon: <FaLeaf />,
      path: "/admin/crops",
    },
    {
      name: "History",
      icon: <FaHistory />,
      path: "/admin/history",
    },
  ];

  const farmerMenu = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/farmer/dashboard",
    },
    {
      name: "My Farms",
      icon: <FaSeedling />,
      path: "/farm",
    },
    {
      name: "Add Farm",
      icon: <FaSeedling />,
      path: "/farm/add",
    },
    {
      name: "Weather",
      icon: <FaCloudSun />,
      path: "/weather",
    },
    {
      name: "Analytics",
      icon: <FaChartBar />,
      path: "/analytics",
    },
    {
      name: "AI Recommendation",
      icon: <FaRobot />,
      path: "/recommendation",
    },
    {
      name: "History",
      icon: <FaHistory />,
      path: "/history",
    },
    {
      name: "Profile",
      icon: <FaUserCircle />,
      path: "/profile",
    },
    {
      name: "Settings",
      icon: <FaCog />, path: "/settings", }, ]; const menu = role === "ADMIN" ? adminMenu : farmerMenu; const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 transform 
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      md:relative md:translate-x-0
      w-64 h-full bg-gradient-to-b from-green-800 to-green-950 text-white flex flex-col shadow-2xl overflow-y-auto custom-scrollbar transition-transform duration-300 ease-in-out
    `}>
      {/* Logo */}
      <div className="p-6 border-b border-green-700/50">
        <h1 className="text-3xl font-bold tracking-tight">🌿 FarmVerse</h1>
        <p className="text-xs mt-2 text-green-200/80 uppercase tracking-wider font-semibold">
          Smart Agriculture
        </p>
      </div>

      {/* User */}
      <div className="px-6 py-5 border-b border-green-700/50 bg-green-900/20">
        <p className="text-xs text-green-300 uppercase tracking-wider font-semibold mb-1">Welcome Back</p>
        <h3 className="font-bold text-lg text-white">
          {user?.username || "Guest"}
        </h3>
        <span className="inline-block mt-1 px-2 py-0.5 bg-green-700 rounded text-xs font-semibold">{role}</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 px-4 space-y-2"> {menu.map((item) => (
          <NavLink key={item.name} to={item.path} 
            onClick={() => setIsSidebarOpen && setIsSidebarOpen(false)}
            className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${ isActive ? "bg-white text-green-800 font-bold shadow-lg shadow-black/10 scale-105" : "text-green-50 hover:bg-white/10 hover:translate-x-1 font-medium" }` } >
            <span className={`text-xl flex items-center justify-center w-8 transition-transform duration-300`}>{item.icon}</span>
            <span className="flex-1 tracking-wide">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button onClick={handleLogout} className="flex items-center justify-center gap-3 m-4 py-3 bg-red-500/10 text-red-100 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 border border-red-500/20 hover:shadow-lg" >
        <FaSignOutAlt />
        <span className="font-semibold">Logout</span>
      </button>
    </aside>
  );
}

export default Sidebar;