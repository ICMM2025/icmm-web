import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const addOrderApi = async (body) =>
  await axios.post(`${baseUrl}/order/add-order`, body);
