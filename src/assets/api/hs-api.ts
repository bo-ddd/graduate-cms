import axios from "./instance";
import { postConfig, getConfig } from './config'
interface Res {
    code: number,
    msg: string,
    data: any
}
export default {
    getVip: (params?: any):Promise<Res> => {
        return axios.post('/drop/getVip', params, postConfig);
    },
    getUserList: (params?: any):Promise<Res> => {
        return axios.post('/system/selectVip', params, postConfig);
    }
}