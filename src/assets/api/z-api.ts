import axios from './instance';

import { postConfig,getConfig } from './config'

export default{
    getSelectCompanyList: (params:any = {}) => {
        return axios.post('/system/selectCompany', params, postConfig)
    },
}