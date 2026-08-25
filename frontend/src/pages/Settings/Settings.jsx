import { useState, useEffect } from "react"; import DashboardLayout from "../../components/layout/DashboardLayout"; import api from "../../services/api"; function Settings() { const [emailNotifs, setEmailNotifs] = useState( localStorage.getItem("setting_emailNotifs") !== "false" ); const [smsNotifs, setSmsNotifs] = useState( localStorage.getItem("setting_smsNotifs") === "true" ); const [aiRecs, setAiRecs] = useState( localStorage.getItem("setting_aiRecs") !== "false" ); const [darkMode, setDarkMode] = useState( localStorage.getItem("theme") === "dark" ); const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "", }); const [passwordLoading, setPasswordLoading] = useState(false); const [passwordError, setPasswordError] = useState(""); const [passwordSuccess, setPasswordSuccess] = useState(""); useEffect(() => { if (darkMode) { document.documentElement.classList.add("dark"); localStorage.setItem("theme", "dark"); } else { document.documentElement.classList.remove("dark"); localStorage.setItem("theme", "light"); } }, [darkMode]); const handleToggle = (setter, key, value) => { setter(value); localStorage.setItem(key, value.toString()); }; const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    setPasswordLoading(true);
    try {
      await api.post("/api/auth/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordSuccess("Password changed successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setPasswordError(err.response?.data || "Failed to change password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">
          Settings
        </h1>

        <div className="space-y-8">
          {/* Preferences */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b border-gray-100 pb-4">Preferences</h2>
            
            <div className="space-y-6">
              {/* Email Notifications */}
              <label className="flex items-center justify-between group cursor-pointer p-2 -m-2 rounded-xl hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">Email Notifications</h3>
                  <p className="text-sm text-gray-500 mt-1">Receive alerts about your farm</p>
                </div>
                <div className="relative inline-flex items-center">
                  <input type="checkbox" checked={emailNotifs} onChange={(e) => handleToggle(setEmailNotifs, "setting_emailNotifs", e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </div>
              </label>

              {/* SMS Notifications */}
              <label className="flex items-center justify-between group cursor-pointer p-2 -m-2 rounded-xl hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">SMS Notifications</h3>
                  <p className="text-sm text-gray-500 mt-1">Receive text alerts</p>
                </div>
                <div className="relative inline-flex items-center">
                  <input type="checkbox" checked={smsNotifs} onChange={(e) => handleToggle(setSmsNotifs, "setting_smsNotifs", e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </div>
              </label>

              {/* AI Recommendations */}
              <label className="flex items-center justify-between group cursor-pointer p-2 -m-2 rounded-xl hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">AI Recommendations</h3>
                  <p className="text-sm text-gray-500 mt-1">Enable AI suggestions</p>
                </div>
                <div className="relative inline-flex items-center">
                  <input type="checkbox" checked={aiRecs} onChange={(e) => handleToggle(setAiRecs, "setting_aiRecs", e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </div>
              </label>

              {/* Dark Mode */}
              <div className="border-t border-gray-100 pt-6 mt-6">
                <label className="flex items-center justify-between group cursor-pointer p-2 -m-2 rounded-xl hover:bg-gray-50 transition-colors">
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">Dark Mode</h3>
                    <p className="text-sm text-gray-500 mt-1">Switch to dark theme</p>
                  </div>
                  <div className="relative inline-flex items-center">
                    <input type="checkbox" checked={darkMode} onChange={(e) => { const isDark = e.target.checked; setDarkMode(isDark); localStorage.setItem("theme", isDark ? "dark" : "light"); }} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b border-gray-100 pb-4">Security</h2>
            
            <form onSubmit={handlePasswordChange} className="max-w-md space-y-5">
              <h3 className="font-semibold text-lg text-gray-800 mb-4">Change Password</h3>
              
              {passwordError && <div className="p-3 bg-red-100 text-red-700 rounded-lg">{passwordError}</div>}
              {passwordSuccess && <div className="p-3 bg-green-100 text-green-700 rounded-lg">{passwordSuccess}</div>}

              <div>
                <label className="block font-medium mb-2 text-gray-700 ">Current Password</label>
                <input type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})} className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />
              </div>

              <div>
                <label className="block font-medium mb-2 text-gray-700 ">New Password</label>
                <input type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})} className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />
              </div>

              <div>
                <label className="block font-medium mb-2 text-gray-700 ">Confirm New Password</label>
                <input type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all" required />
              </div>

              <button type="submit" disabled={passwordLoading} className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-6 py-4 rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-1 mt-6 disabled:opacity-50 disabled:hover:translate-y-0" >
                {passwordLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 rounded-3xl p-10 border border-red-200 shadow-sm hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-red-700 ">Danger Zone</h2>
            <p className="text-red-600 mb-6 text-lg">Once you delete your account, there is no going back. Please be certain.</p>
            <button onClick={() => { if(window.confirm("Are you ABSOLUTELY sure you want to delete your account? This action cannot be undone.")) { alert("Account deletion requested. Please contact support to finalize."); } }} className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-red-600/30 transition-all hover:-translate-y-1" >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Settings;