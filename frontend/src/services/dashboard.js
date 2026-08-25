import api from "./api";

export async function getAdminDashboard() {
  try {
    const response = await api.get("/farmverse/admin/dashboard");

    return {
      status: "ok",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error.response?.data?.message ||
        "Failed to load dashboard",
    };
  }
}