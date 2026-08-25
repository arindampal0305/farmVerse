import DashboardLayout from "../../components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";

function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: "", phone: "", location: "", });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/farmverse/profile");
        setFormData({
          fullName: res.data.fullName || "",
          phone: res.data.phone || "",
          location: res.data.location || "",
        });
      } catch (err) {
        console.error("Failed to fetch profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const [errors, setErrors] = useState({ fullName: "", phone: "", location: "", });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, });
    setErrors({ ...errors, [e.target.name]: "", });
  };

  const handleSave = async () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const locationRegex = /^[A-Za-z ]+$/;

    // Full Name Validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    } else if (!nameRegex.test(formData.fullName)) {
      newErrors.fullName = "Only letters and spaces are allowed.";
    }

    // Phone Validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    // Location Validation
    if (!formData.location.trim()) {
      newErrors.location = "Location is required.";
    } else if (!locationRegex.test(formData.location)) {
      newErrors.location = "Only letters and spaces are allowed.";
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      await api.put("/farmverse/profile", {
        fullName: formData.fullName,
        phone: formData.phone,
        location: formData.location,
      });

      alert("Profile Updated Successfully!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-full pt-20">
          <h2 className="text-2xl font-semibold text-gray-500">Loading...</h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-3xl shadow-sm border border-gray-100 p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-10">
          Edit Profile
        </h1>

        {/* Full Name */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700 ">
            Full Name
          </label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={`w-full p-4 rounded-xl border bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 transition-all ${ errors.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20" }`} />

          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName}
            </p>
          )}
        </div>



        {/* Phone */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700 ">
            Phone Number
          </label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className={`w-full p-4 rounded-xl border bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 transition-all ${ errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20" }`} />

          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Location */}
        <div className="mb-8">
          <label className="block mb-2 font-semibold text-gray-700 ">
            Location
          </label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} className={`w-full p-4 rounded-xl border bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 transition-all ${ errors.location ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20" }`} />

          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4 border-t border-gray-100 mt-8">
          <button onClick={handleSave} className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-6 py-4 rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-1" >
            Save Changes
          </button>
          <button onClick={() => navigate("/profile")} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-4 rounded-xl transition-all" >
            Cancel
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default EditProfile;