import axios from './instance';

import { postConfig,getConfig } from './config'

export default{
    getMemberCardList: (params:any) => {
        return axios.post('/system/selectVipCard', params, postConfig)
    },
}