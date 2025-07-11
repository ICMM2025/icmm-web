import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const addOrderApi = async (body) =>
  await axios.post(`${baseUrl}/order/add-order`, body);
export const sendOrderApi = async (body) =>
  await axios.post(`${baseUrl}/order/send-order`, body);
export const checkOrderApi = async (body) =>
  await axios.post(`${baseUrl}/order/check-order`, body);
export const applyCoupon = async (body) =>
  await axios.post(`${baseUrl}/order/apply-coupon`, body);
