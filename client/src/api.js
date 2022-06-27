import vouchers from './api/vouchers'
import membershipCards from './api/membershipcards'
import qrcode from './api/qrcode'

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
    membershipCards,
    vouchers,
    qrcode
}

export const axios = axios_package
