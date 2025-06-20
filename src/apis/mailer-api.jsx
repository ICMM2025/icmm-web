import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const sendOrderMailer = async (body) =>
  await axios.post(`${baseUrl}/mailer/`, body);
