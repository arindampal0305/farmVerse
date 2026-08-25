import api from "./api";

// Get Admin history (all logs)
export const getAdminHistory = async () => {
  const response = await api.get("/farmverse/admin/history");
  return response.data;
};

// Get Farmer history (own logs only)
export const getFarmerHistory = async () => {
  const response = await api.get("/farmverse/farmer/history");
  return response.data;
};
