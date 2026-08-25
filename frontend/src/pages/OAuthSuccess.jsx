import { useEffect, useRef } from "react";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];

    if (!base64Url) return null;

    const base64 = base64Url
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    return JSON.parse(window.atob(base64));
  } catch (error) {
    console.error("JWT Parse Error:", error);
    return null;
  }
}

export default function OAuthSuccess() {
  const hasRun = useRef(false);

  useEffect(() => {
    // Prevent React StrictMode from running twice
    if (hasRun.current) return;
    hasRun.current = true;

    console.log("========== OAUTH SUCCESS ==========");

    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const role = params.get("role");

    const selectedRole = localStorage.getItem("selectedRole");

    if (!token) {
      // If a token already exists in localStorage,
      // redirect according to the stored user role.
      if (localStorage.getItem("jwtToken")) {
        const user = JSON.parse(
          localStorage.getItem("user") || "{}"
        );

        if (user.role === "ADMIN") {
          window.location.replace("/admin/dashboard");
        } else {
          window.location.replace("/farmer/dashboard");
        }
      } else {
        console.error("No token in URL");
        alert("Google login failed.");
        window.location.replace("/login");
      }

      return;
    }

    const payload = parseJwt(token);

    if (!payload) {
      alert("Invalid token.");
      window.location.replace("/login");
      return;
    }

    // Role mismatch
    if (
      selectedRole &&
      role &&
      selectedRole !== role
    ) {
      localStorage.removeItem("selectedRole");

      alert(
        `This Google account belongs to a ${role}. Please select the correct role.`
      );

      window.location.replace("/login");
      return;
    }

    const user = {
      username: payload.sub,
      email: payload.email || "",
      role: role || payload.role,
    };

    localStorage.setItem("jwtToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("username", user.username);

    localStorage.removeItem("selectedRole");

    if (user.role === "ADMIN") {
      window.location.replace("/admin/dashboard");
    } else {
      window.location.replace("/farmer/dashboard");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl flex flex-col items-center max-w-sm w-full mx-4 relative overflow-hidden">

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 animate-pulse"></div>

        <div className="w-20 h-20 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 shadow-inner relative">
          <div className="absolute inset-0 rounded-2xl border-4 border-emerald-500/20 animate-ping"></div>

          <svg
            className="animate-spin h-10 w-10 text-emerald-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>

            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
          Authenticating
        </h2>

        <p className="text-gray-500 mt-2 text-center font-medium">
          Please wait while we sign you in...
        </p>

      </div>
    </div>
  );
}