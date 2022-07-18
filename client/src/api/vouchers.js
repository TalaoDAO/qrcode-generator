import {axios} from "../api";

const getVouchers = async () => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/vouchers`);
}

const getVoucher = async (id) => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/vouchers/${id}`);
}

const getQRUrl = async (id, type) => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/vouchers/${id}/qr-url/${type}`);
}

const addVoucher = async (data) => {
  return await axios.post(`${process.env.REACT_APP_BASE_URL}/vouchers`, data);
}

const updateVoucher = async (id, data) => {
  return await axios.put(`${process.env.REACT_APP_BASE_URL}/vouchers/${id}`, data);
}

const deleteVoucher = async (id) => {
  return await axios.delete(`${process.env.REACT_APP_BASE_URL}/vouchers/${id}`);
}

export default {
  getVouchers,
  getQRUrl,
  getVoucher,
  addVoucher,
  updateVoucher,
  deleteVoucher
}
