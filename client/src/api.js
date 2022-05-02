import vouchers from './api/vouchers'
import qrcode from './api/qrcode'

export const SOCKET_URL = "http://localhost:5000"
export const base_url = "http://localhost:5000/api"

const axios_package = require('axios')

axios_package.interceptors.response.use(undefined, (err) => {
    switch (err.response.status) {
        case 401:
            if (!!localStorage.getItem('token')) {
                localStorage.removeItem('token')
            }
            break;
        default:
            break;
    }
    return Promise.reject(err)
})

export default {
    vouchers,
    qrcode
}

export const axios = axios_package
