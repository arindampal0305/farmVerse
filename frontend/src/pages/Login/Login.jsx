import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaLock,
  FaSeedling,
  FaEye,
  FaEyeSlash,
  FaUserShield,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

import { loginUser } from "../../services/auth";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("FARMER");
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("roleMismatch") === "true") {
      alert(
        "This Google account is registered as a different role. Please select the correct role."
      );
    }

    if (params.get("googleError") === "true") {
      alert("Google login failed. Please try again.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    let temp = {};

    if (!formData.username.trim()) {
      temp.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      temp.username = "Username must contain at least 3 characters";
    }

    if (!formData.password.trim()) {
      temp.password = "Password is required";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleGoogleLogin = () => {
    localStorage.setItem("selectedRole", selectedRole);

    window.location.href =
      `http://localhost:8080/oauth2/authorization/google?prompt=select_account&role=${selectedRole}`;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await loginUser({
        username: formData.username.trim(),
        password: formData.password,
        role: selectedRole,
      });

      if (!rememberMe) {
        setFormData({
          username: "",
          password: "",
        });
      }

      if (response.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/farmer/dashboard");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        error.message ||
        "Invalid username or password.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

    return (

    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 md:p-8 overflow-y-auto">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid lg:grid-cols-2 my-auto">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex relative flex-col justify-between p-12 overflow-hidden text-white group">
          <div className="absolute inset-0 bg-[url('/leafy_bg.jpg')] bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-105"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-emerald-800/90 to-teal-950/90 z-0"></div>

          <div className="relative z-10 flex flex-col h-full justify-center items-center text-center">
            <div className="w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl mb-8 border border-white/20">
              <FaSeedling className="text-white text-7xl drop-shadow-md" />
            </div>

            <h1 className="text-6xl font-bold mb-4 tracking-tight">
              FarmVerse
            </h1>
            <p className="text-2xl font-medium text-emerald-100 mb-10">
              Smart Agriculture Platform
            </p>

            <p className="text-lg leading-relaxed max-w-md text-emerald-50 bg-black/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
              Grow smarter with AI-powered insights, real-time weather updates, and intelligent farm management, all in one place.
            </p>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-8 lg:p-16 overflow-y-auto bg-white">
          <div className="w-full max-w-md">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-4xl font-bold text-gray-800 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-gray-500 mt-3 text-lg">
                Sign in to continue to FarmVerse
              </p>
            </div>

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div onClick={() => setSelectedRole("FARMER")} className={`cursor-pointer rounded-2xl border-2 p-5 transition-all duration-300 hover:shadow-md ${ selectedRole === "FARMER" ? "border-emerald-500 bg-emerald-50 shadow-emerald-100 shadow-inner" : "border-gray-100 bg-gray-50 hover:bg-gray-100/80" }`} >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${selectedRole === "FARMER" ? "bg-emerald-100 text-emerald-600" : "bg-white text-gray-400 shadow-sm"}`}>
                  <FaSeedling className="text-2xl" />
                </div>
                <h3 className={`font-bold text-lg mb-1 ${selectedRole === "FARMER" ? "text-emerald-800" : "text-gray-700"}`}>
                  Farmer
                </h3>
                <p className={`text-xs leading-relaxed ${selectedRole === "FARMER" ? "text-emerald-600/80" : "text-gray-500"}`}>
                  Manage crops, weather, irrigation & reports.
                </p>
              </div>

              <div onClick={() => setSelectedRole("ADMIN")} className={`cursor-pointer rounded-2xl border-2 p-5 transition-all duration-300 hover:shadow-md ${ selectedRole === "ADMIN" ? "border-blue-500 bg-blue-50 shadow-blue-100 shadow-inner" : "border-gray-100 bg-gray-50 hover:bg-gray-100/80" }`} >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${selectedRole === "ADMIN" ? "bg-blue-100 text-blue-600" : "bg-white text-gray-400 shadow-sm"}`}>
                  <FaUserShield className="text-2xl" />
                </div>
                <h3 className={`font-bold text-lg mb-1 ${selectedRole === "ADMIN" ? "text-blue-800" : "text-gray-700"}`}>
                  Admin
                </h3>
                <p className={`text-xs leading-relaxed ${selectedRole === "ADMIN" ? "text-blue-600/80" : "text-gray-500"}`}>
                  Manage users, analytics & platform.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6" >
              {/* Username */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Username
                </label>
                <div className={`flex items-center border-2 rounded-xl transition-all bg-white ${ errors.username ? "border-red-400 ring-4 ring-red-50" : "border-gray-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50" }`} >
                  <div className="pl-4 pr-3 py-4">
                    <FaUser className={errors.username ? "text-red-400" : "text-gray-400"} />
                  </div>
                  <input type="text" name="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} autoComplete="off" className="w-full py-4 pr-4 outline-none rounded-r-xl bg-transparent font-medium text-gray-800 placeholder-gray-400" />
                </div>

                {errors.username && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.username}
                  </p>
                )}

              </div>
              {/* Password */}
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Password
                </label>
                <div className={`flex items-center border-2 rounded-xl transition-all bg-white ${ errors.password ? "border-red-400 ring-4 ring-red-50" : "border-gray-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50" }`} >
                  <div className="pl-4 pr-3 py-4">
                    <FaLock className={errors.password ? "text-red-400" : "text-gray-400"} />
                  </div>
                  <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} autoComplete="new-password" className="w-full py-4 outline-none bg-transparent font-medium text-gray-800 placeholder-gray-400" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="px-4 py-4 text-gray-400 hover:text-emerald-600 transition-colors" >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password}
                  </p>
                )}

              </div>
              <div className="flex justify-between items-center py-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="peer sr-only" />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-emerald-600 peer-checked:border-emerald-600 transition-colors"></div>
                    <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="group-hover:text-gray-800 transition-colors">Remember me</span>
                </label>
                <button type="button" onClick={() => navigate("/forgot-password")} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors" >
                  Forgot Password?
                </button>
              </div>

              <div className="pt-2 space-y-4">
                <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${ loading ? "bg-emerald-400 cursor-not-allowed shadow-none" : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-emerald-500/30 hover:-translate-y-1" }`} >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </span>
                  ) : "Sign In"}
                </button>

                <div className="relative flex items-center justify-center py-2">
                  <div className="absolute border-t border-gray-200 w-full"></div>
                  <span className="bg-white px-4 text-sm text-gray-400 z-10 font-medium">OR</span>
                </div>

                <button type="button" onClick={handleGoogleLogin} className="w-full border-2 border-gray-200 rounded-xl py-4 flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-300 font-semibold text-gray-700 transition-all" >
                  <FcGoogle className="text-2xl" />
                  Continue with Google
                </button>
              </div>
            </form>

            <div className="text-center mt-10 space-y-3">
              <p className="text-gray-600 font-medium">
                Don't have an account?
                <Link to="/register" className="text-emerald-600 font-bold ml-2 hover:text-emerald-700 hover:underline" >
                  Create one now
                </Link>
              </p>
              <div>
                <Link to="/" className="text-sm text-gray-500 hover:text-emerald-600 font-semibold transition-colors" >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );

}

export default Login;