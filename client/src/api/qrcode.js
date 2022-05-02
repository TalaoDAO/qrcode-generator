import {base_url, axios} from "../api";

const getQRCodeUrl = async () => {
    return await axios.get(`${base_url}/qrcode-generator/`);
}

export default {
    getQRCodeUrl
}
