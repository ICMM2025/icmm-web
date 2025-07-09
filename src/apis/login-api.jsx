import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const loginApi = async (body) =>
  await axios.post(`${baseUrl}/auth/login`, body);

export const testDBApi = async (body) =>
  await axios.get(`${baseUrl}/test`, body);
