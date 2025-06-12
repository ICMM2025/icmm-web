import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const exportExcelApi = async (token) =>
  await axios.get(`${baseUrl}/admin/export-excel`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  });
export const getAllOrdersApi = async (token) =>
  await axios.get(`${baseUrl}/admin/all-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const getOrderDetailAdminApi = async (token, body) =>
  await axios.post(`${baseUrl}/admin/order-detail`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addNoteApi = async (token, body) =>
  await axios.post(`${baseUrl}/admin/add-note`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const editDetailOrderApi = async (token, body) =>
  await axios.post(`${baseUrl}/admin/edit-detail-order`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const editDetailOrderAdminPhotoApi = async (token, body) =>
  await axios.post(`${baseUrl}/admin/edit-detail-admin-photo-order`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const forwardStatusApi = async (token, body) =>
  await axios.post(`${baseUrl}/admin/forward-status`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const editCartOrderApi = async (token, body) =>
  await axios.post(`${baseUrl}/admin/edit-cart`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
