import DashboardLayout from "../../components/layout/DashboardLayout"; import { useNavigate } from "react-router-dom"; import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTractor, FaEdit, } from "react-icons/fa"; import api from "../../services/api"; import { useState, useEffect } from "react"; function Profile() { const navigate = useNavigate(); const [profile, setProfile] = useState(null); const [loading, setLoading] = useState(true); useEffect(() => { const fetchProfile = async () => {
      try {
        const res = await api.get("/farmverse/profile");
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-full pt-20">
          <h2 className="text-2xl font-semibold text-gray-500">Loading Profile...</h2>
        </div>
      </DashboardLayout>
    );
  }

  const fullName = profile?.fullName || "User";
  const username = profile?.username || "User";
  const email = profile?.email || "Not Available";
  const role = profile?.role || "FARMER";
  const phone = profile?.phone || "Not Available";
  const location = profile?.location || "Not Available";
  const farms = profile?.farmCount || 0;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 md:gap-0 mb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 ">
            My Profile
          </h1>
          <p className="text-gray-500 text-base md:text-xl mt-2">
            Manage your personal information.
          </p>
        </div>

        {/* Edit Profile Button */}
        <button onClick={() => navigate("/profile/edit")} className="w-full md:w-auto justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 md:py-4 rounded-xl flex items-center gap-3 shadow-lg shadow-green-600/30 transition-all hover:-translate-y-1 font-semibold" >
          <FaEdit />
          Edit Profile
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        {/* Left Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 flex flex-col items-center hover:shadow-lg transition-shadow">
          <div className="relative">
            <FaUserCircle className="text-gray-300 text-7xl md:text-9xl" />
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-full pointer-events-none"></div>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mt-6 text-gray-800 text-center">
            {fullName}
          </h2>
          <p className="text-lg md:text-xl text-gray-500 mt-2 font-medium">
            {role}
          </p>
          <div className="mt-4 md:mt-6 bg-emerald-50 text-emerald-600 border border-emerald-100 px-6 py-2 rounded-full text-sm md:text-base font-semibold tracking-wide shadow-sm">
            @{username}
          </div>
        </div>

        {/* Right Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-gray-800 border-b border-gray-100 pb-4">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            <div className="group">
              <p className="text-sm md:text-base text-gray-500 mb-1 md:mb-2 font-medium">Full Name</p>
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                {fullName}
              </h3>
            </div>

            <div className="group min-w-0">
              <p className="text-sm md:text-base text-gray-500 mb-1 md:mb-2 font-medium">Email</p>
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 flex items-center gap-2 md:gap-3 group-hover:text-emerald-600 transition-colors break-all">
                <FaEnvelope className="text-emerald-500 shrink-0" />
                <span>{email}</span>
              </h3>
            </div>

            <div className="group">
              <p className="text-sm md:text-base text-gray-500 mb-1 md:mb-2 font-medium">Phone</p>
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 flex items-center gap-2 md:gap-3 group-hover:text-emerald-600 transition-colors">
                <FaPhone className="text-emerald-500 shrink-0" />
                <span>{phone}</span>
              </h3>
            </div>

            <div className="group">
              <p className="text-sm md:text-base text-gray-500 mb-1 md:mb-2 font-medium">Location</p>
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 flex items-center gap-2 md:gap-3 group-hover:text-emerald-600 transition-colors">
                <FaMapMarkerAlt className="text-red-500 shrink-0" />
                <span>{location}</span>
              </h3>
            </div>

            <div className="group">
              <p className="text-sm md:text-base text-gray-500 mb-1 md:mb-2 font-medium">Registered Farms</p>
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 flex items-center gap-2 md:gap-3 group-hover:text-emerald-600 transition-colors">
                <FaTractor className="text-emerald-500 shrink-0" />
                <span>{farms}</span>
              </h3>
            </div>

            <div>
              <p className="text-sm md:text-base text-gray-500 mb-1 md:mb-2 font-medium">Role</p>
              <span className="inline-block bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 md:px-5 py-1.5 md:py-2 rounded-xl text-sm md:text-base font-semibold shadow-sm">
                {role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;