import {axios} from "../api";

const getVoucher = async (id) => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/vouchers/${id}`);
}

const getQRUrl = async (id) => {
  return await axios.get(`${process.env.REACT_APP_BASE_URL}/vouchers/${id}/qr-url`);
}

const addVoucher = async (data) => {
  return await axios.post(`${process.env.REACT_APP_BASE_URL}/vouchers`, data);
}

const updateVoucher = async (id, data) => {
  return await axios.put(`${process.env.REACT_APP_BASE_URL}/vouchers/${id}`, data);
}

export default {
  getQRUrl,
  getVoucher,
  addVoucher,
  updateVoucher
}
