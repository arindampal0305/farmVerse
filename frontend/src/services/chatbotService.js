import axios from "axios";

const API_BASE_URL = "http://localhost:8080/farmverse/chat";

export const sendMessage = async (message) => {

    const token = localStorage.getItem("jwtToken");

    const response = await axios.post(
        `${API_BASE_URL}/sendMessage`,
        {
            message,
            conversationHistory: []
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};