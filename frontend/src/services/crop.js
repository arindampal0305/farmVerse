import api from "./api";

const API = "/farmverse/crops";

// Add Crop
export const addCrop = async (cropData) => {
  const response = await api.post(`${API}/addCrop`, cropData);
  return response.data;
};

// Get All Crops
export const getAllCrops = async () => {
  const response = await api.get(`${API}/viewAll`);
  return response.data;
};

// Get Crop by ID
export const getCropById = async (id) => {
  const response = await api.get(`${API}/viewCrop/${id}`);
  return response.data;
};

// Update Crop
export const updateCrop = async (id, cropData) => {
  const response = await api.put(`${API}/editCrop/${id}`, cropData);
  return response.data;
};

// Delete Crop
export const deleteCrop = async (id) => {
  const response = await api.delete(`${API}/deleteCrop/${id}`);
  return response.data;
};