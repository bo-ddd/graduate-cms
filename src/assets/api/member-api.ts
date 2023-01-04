import axios from './instance';

import { postConfig,getConfig } from './config'
interface Res{
    code:number,
    msg:string,
    data:object[]
    }
export default{
    getMemberCardList: (params:any):Promise<Res> => {
        return axios.post('/system/selectVipCard', params, postConfig)
    },
    
    getPosition: (params:any):any => {
        return axios.post('/system/getPosition', params, postConfig)
    },
    modifyStatus: (params:any):any => {
        return axios.post('/system/modifyStatus', params, postConfig)
    },
    
}
