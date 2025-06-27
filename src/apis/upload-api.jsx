import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const uploadResult = async (body) =>
  await axios.post(`${baseUrl}/upload`, body);

export const getVirtualTrans = async (token) =>
  await axios.get(`${baseUrl}/upload`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
