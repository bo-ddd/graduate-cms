import axios from './instance';

import { postConfig, getConfig } from './config'

export default {
    getLogin: (params: any) => {
        return axios.post('/system/login', params, postConfig)
    },
    getsendSmsApi: (params: any) => {
        return axios.post('/phone/sendSms', params, postConfig)
    }
}