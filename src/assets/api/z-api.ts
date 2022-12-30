import axios from './instance';

import { postConfig,getConfig } from './config'

export default{
    getSelectCompanyList: (params:any = {}) => {
        return axios.post('/system/selectCompany', params, postConfig)
    },
    getSelectCompanyResumeList: (params:any = {}) => {
        return axios.post('/system/selectCompanyResume', params, postConfig)
    },
    getCompanyNatureList: (params:any = {}) => {
        return axios.post('/drop/getCompanyNature', params, postConfig)
    },
}