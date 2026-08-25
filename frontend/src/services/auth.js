import api from "./api";

/**
 * Register Farmer
 */
export const registerFarmer = async (userData) => {
  const response = await api.post("/api/auth/register", userData);
  return response.data;
};

/**
 * Login Farmer/Admin
 */
export const loginUser = async (loginData) => {
  const response = await api.post("/api/auth/login", loginData);

  const { token, username, email, role } = response.data;

  // Save JWT
  localStorage.setItem("jwtToken", token);

  // Save user details
  localStorage.setItem(
    "user",
    JSON.stringify({
      username,
      email,
      role,
    })
  );

  return response.data;
};

/**
 * Logout
 */
export const logout = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
};

/**
 * Get Logged-in User
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  if (!user) return null;

  return JSON.parse(user);
};

/**
 * Get JWT Token
 */
export const getToken = () => {
  return localStorage.getItem("jwtToken");
};

/**
 * Check Login
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("jwtToken");
};

/**
 * Check Farmer
 */
export const isFarmer = () => {
  const user = getCurrentUser();
  return user?.role === "FARMER";
};

/**
 * Check Admin
 */
export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === "ADMIN";
};

export const createAdmin = async (data) => {
    const response = await api.post(
        "/api/auth/create-admin",
        data
    );

    return response.data;
};