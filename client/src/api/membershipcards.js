import {axios} from "../api";

const getMembershipCard = async (id) => {
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/membership-cards/${id}`);
}

const getQRUrl = async (id) => {
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/membership-cards/${id}/qr-url`);
}

const addMembershipCard = async (data) => {
    return await axios.post(`${process.env.REACT_APP_BASE_URL}/membership-cards`, data);
}

const updateMembershipCard = async (id, data) => {
    return await axios.put(`${process.env.REACT_APP_BASE_URL}/membership-cards/${id}`, data);
}

export default {
    getMembershipCard,
    getQRUrl,
    addMembershipCard,
    updateMembershipCard
}
