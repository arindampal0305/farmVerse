import api from "./api";

const API = "/farmverse/farms";

export const addFarm = async (farmData) => {
  const response = await api.post(`${API}/addFarm`, farmData);
  return response.data;
};

export const getAllFarms = async () => {
  const response = await api.get(`${API}/viewAllFarms`);
  return response.data;
};

export const getFarmById = async (id) => {
  const response = await api.get(`${API}/viewFarm/${id}`);
  return response.data;
};

export const updateFarm = async (id, farmData) => {
  const response = await api.put(`${API}/editFarm/${id}`, farmData);
  return response.data;
};

export const deleteFarm = async (id) => {
  const response = await api.delete(`${API}/deleteFarm/${id}`);
  return response.data;
};