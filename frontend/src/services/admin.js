import api from "./api";

/**
 * GET - View All Farmers
 */
export const getAllFarmers = async () => {
  try {
    const response = await api.get("/farmverse/admin/viewFarmers");
    return response.data;
  } catch (error) {
    console.error("Error fetching farmers:", error);
    throw error;
  }
};

/**
 * POST - Add Farmer
 */
export const addFarmer = async (farmer) => {
  try {
    const response = await api.post("/farmverse/admin/addFarmer", farmer);
    return response.data;
  } catch (error) {
    console.error("Error adding farmer:", error);
    throw error;
  }
};

/**
 * PUT - Edit Farmer
 */
export const editFarmer = async (username, farmer) => {
  try {
    const response = await api.put(
      `/farmverse/admin/editFarmer/${username}`,
      farmer
    );
    return response.data;
  } catch (error) {
    console.error("Error updating farmer:", error);
    throw error;
  }
};

/**
 * DELETE - Delete Farmer
 */
export const deleteFarmer = async (username) => {
  try {
    const response = await api.delete(
      `/farmverse/admin/deleteFarmer/${username}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting farmer:", error);
    throw error;
  }
};