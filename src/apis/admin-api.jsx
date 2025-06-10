import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const exportExcelApi = async (token) =>
  await axios.get(`${baseUrl}/admin/export-excel`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  });
