import { BrowserRouter, Routes, Route } from "react-router-dom";

// Protected Route
import ProtectedRoute from "../components/common/ProtectedRoute";

// Authentication
import Landing from "../pages/Landing";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";
import OAuthSuccess from "../pages/OAuthSuccess";
import Unauthorized from "../pages/Unauthorized/Unauthorized";

// Admin Pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Farmers from "../pages/Admin/Farmers";
import Farms from "../pages/Admin/Farms";
import Crops from "../pages/Admin/Crops";
import CreateAdmin from "../pages/admin/CreateAdmin";

// Farmer Pages
import FarmerDashboard from "../pages/Farmer/FarmerDashboard";
import Farm from "../pages/Farm/Farm";
import AddFarm from "../pages/Farm/AddFarm";
import EditFarm from "../pages/Farm/EditFarm";
import ViewFarm from "../pages/Farm/ViewFarm";

import AddCrop from "../pages/Crop/AddCrop";
import ViewCrop from "../pages/Crop/ViewCrop";
import EditCrop from "../pages/Crop/EditCrop";
import ViewAllCrops from "../pages/Crop/ViewAllCrops";

import Weather from "../pages/Weather/Weather";
import Analytics from "../pages/Analytics/Analytics";
import AIRecommendation from "../pages/Recommendations/AIRecommendation";

// Profile
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Profile/EditProfile";
import Settings from "../pages/Settings/Settings";
import History from "../pages/History/History";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= LANDING ================= */}

        <Route path="/" element={<Landing />} />

        {/* Ananya's Home page */}
        <Route path="/home" element={<Home />} />


        {/* ================= AUTH ================= */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route
          path="/oauth-success"
          element={<OAuthSuccess />}
        />

        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />


        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/farmers"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Farmers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/farms"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Farms />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/crops"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Crops />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <CreateAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/history"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <History />
            </ProtectedRoute>
          }
        />


        {/* ================= FARMER ================= */}

        <Route
          path="/farmer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />


        {/* ================= FARM ================= */}

        <Route
          path="/farm"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <Farm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/farm/add"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <AddFarm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/farm/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <EditFarm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/farm/:id"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <ViewFarm />
            </ProtectedRoute>
          }
        />


        {/* ================= CROPS ================= */}

        <Route
          path="/farm/:id/crop/add"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <AddCrop />
            </ProtectedRoute>
          }
        />

        {/* New farm-aware edit route */}
        <Route
          path="/farm/:farmId/crop/edit/:cropId"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <EditCrop />
            </ProtectedRoute>
          }
        />

        {/* Existing edit route */}
        <Route
          path="/crop/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <EditCrop />
            </ProtectedRoute>
          }
        />

        <Route
          path="/crop/:id"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <ViewCrop />
            </ProtectedRoute>
          }
        />

        <Route
          path="/crops"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <ViewAllCrops />
            </ProtectedRoute>
          }
        />


        {/* ================= WEATHER ================= */}

        <Route
          path="/weather"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <Weather />
            </ProtectedRoute>
          }
        />


        {/* ================= ANALYTICS ================= */}

        <Route
          path="/analytics"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <Analytics />
            </ProtectedRoute>
          }
        />


        {/* ================= AI RECOMMENDATION ================= */}

        <Route
          path="/recommendation"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <AIRecommendation />
            </ProtectedRoute>
          }
        />


        {/* ================= PROFILE ================= */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute allowedRoles={["FARMER"]}>
              <History />
            </ProtectedRoute>
          }
        />


        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="text-center">

                <h1 className="text-7xl font-bold text-red-600">
                  404
                </h1>

                <p className="mt-4 text-2xl">
                  Page Not Found
                </p>

                <p className="mt-2 text-gray-500">
                  The page you are looking for does not exist.
                </p>

              </div>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;