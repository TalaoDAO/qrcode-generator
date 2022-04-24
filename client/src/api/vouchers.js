import {base_url, axios} from "../api";

const getVoucher = async (id) => {
  return await axios.get(`${base_url}/vouchers/${id}`);
}

const getQRUrl = async (id) => {
  return await axios.get(`${base_url}/vouchers/${id}/qr-url`);
}

const addVoucher = async (data) => {
  return await axios.post(`${base_url}/vouchers`, data);
}

const updateVoucher = async (id, data) => {
  return await axios.put(`${base_url}/vouchers/${id}`, data);
}

export default {
  getQRUrl,
  getVoucher,
  addVoucher,
  updateVoucher
}
