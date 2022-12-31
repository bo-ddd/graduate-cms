import axios from './instance';

import { postConfig, getConfig } from './config'
import type { CompanyIndustry, CompanyList, CompanyNature, CompanyResume, CompanySize, CompanyTag } from '@/type/Zapi';

export default {
    // 获取企业列表
    getSelectCompanyList: (params: CompanyList) => {
        return axios.post('/system/selectCompany', params, postConfig)
    },
    // 获取企业简历
    getSelectCompanyResumeList: (params: CompanyResume) => {
        return axios.post('/system/selectCompanyResume', params, postConfig)
    },
    // 获取企业性质
    getCompanyNatureList: (params: CompanyNature = {}) => {
        return axios.post('/drop/getCompanyNature', params, postConfig)
    },
    // 获取企业规模
    getCompanySizeList: (params: CompanySize = {}) => {
        return axios.post('/drop/getCompanySize', params, postConfig)
    },
    // 获取企业标签
    getCompanyTagList: (params: CompanyTag = {}) => {
        return axios.post('/drop/getCompanyTag', params, postConfig)
    },
    // 获取所属行业
    getCompanyIndustryList: (params: CompanyIndustry = {}) => {
        return axios.post('/drop/getCompanyIndustry', params, postConfig)
    },

}