import axios from './instance';

import { postConfig,getConfig } from './config'
interface Res{
    code:number,
    msg:string,
    data:object[]
    }
export default{
    getMemberCardList: (params:any):Promise<Res> => {
        return axios.post<Res,any>('/system/selectVipCard', params, postConfig)
    },
}
