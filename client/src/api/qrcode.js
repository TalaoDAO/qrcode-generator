import {base_url, axios} from "../api";

const getQRCodeUrl = async () => {
    return await axios.get(`${base_url}/qrcode-generator/`);
}

const getChallenge = async (id) => {
    return await axios.get(`${base_url}/qrcode-generator/${id}`);
}

export default {
    getQRCodeUrl,
    getChallenge
}
