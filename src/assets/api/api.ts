import axios from './instance';

import { postConfig, getConfig } from './config'

export default {
    //登录
    login: (params: any) => {
        return axios.post('/system/login', params, postConfig)
    },


    getEducation: (params: any) => {
        return axios.post('/drop/getEducation', params, postConfig)
    },

    /**
     * 获取学历下拉框
     */
    getEducationList: (params: any) => {
        return axios.post('/drop/getEducation', params, postConfig);
    },

    /**
     * 获取企业详细信息
     */
    getEnterpriseInfo: (params: any) => {
        return axios.post('/system/getCompanyCommon', params, postConfig);
    },

    /**
     * 修改企业详细信息
     */
    setModifyEnterpriseInfo: (params: any) => {
        return axios.post('/system/modifyCompanyCommon', params, postConfig);
    },

    /**
     * 获取所属行业下拉框
     */
    getIndustryList: (params: any) => {
        return axios.post('/drop/getCompanyIndustry', params, postConfig);
    },

    /**
     * 获取企业性质下拉框
     */
    getEnterpriseNatureList: (params: any) => {
        return axios.post('/drop/getCompanyNature', params, postConfig);
    },

    /**
     * 获取企业规模下拉框
     */
    getEnterpriseSizeList: (params: any) => {
        return axios.post('/drop/getCompanySize', params, postConfig);
    },

    /**
     * 获取企业标签下拉框
     */
    getEnterpriseTagList: (params: any) => {
        return axios.post('/drop/getCompanyTag', params, postConfig);
    },

    /**
     * 获取学校下拉框
     */
    getSchoolList: (params: any) => {
        return axios.post('/drop/getSchool', params, postConfig);
    },


    /**
     * 获取专业下拉框
     */
    getMajorList: (params: any) => {
        return axios.post('/drop/getProfessional', params, postConfig);
    },

    /**
     * 获取期望薪资
     */
    getWishMoney: (params: any) => {
        return axios.post('/drop/getWishMoney', params, postConfig);
    },

    /** 
     * 获取性别列表
     * */
    getSexList: (params = {}) => {
        return axios.post('/drop/getSex', params, postConfig);
    },

    /**
     * 获取企业职位列表
     */
    getPositionDrop: (params: any) => {
        return axios.post('/drop/getPositionDrop', params, postConfig);
    },

    /**
     * 获取人才列表
     */
    getTalentList: (params: any) => {
        return axios.post('/system/getTalent', params, postConfig);
    },
    getResume: (params: any) => {
        return axios.post('/system/selectCompanyResume', params, postConfig);
    },

    /**
     * 获取实习月数和天数下拉框
     */
    getMonthDay: (params: any) => {
        return axios.post('/drop/drop/getMonthDay', params, postConfig);
    },

    /**
     * 获取职位类别下拉框
     */
    getCompanyIndustry: (params: any) => {
        return axios.post('/drop/getCompanyIndustry', params, postConfig);
    },

    /**
     * 获取企业职位列表
     */
    getPositionData: (params: any) => {
        return axios.post('/system/getPosition', params, postConfig);
    },

    /**
     * 获取实习薪资下拉列表
     */
    getInternshipMoney: (params: any) => {
        return axios.post('/drop/getInternshipMoney', params, postConfig);
    },
    /**
     * 发布职业
     */
    releasePosition: (params: any) => {
        return axios.post('/system/releasePosition', params, postConfig);
    },

    /**
     * 应聘阶段下拉框
     */
    getStage: (params: any) => {
        return axios.post('/drop/getStage', params, postConfig);
    },

    /**
     * 修改简历状态
     */
    modifyResume: (params: any) => {
        return axios.post('/system/modifyResume', params, postConfig);
    },

    /**
     * 邀请人才列表
     */
    getInvite: (params: any) => {
        return axios.post('/system/getInvite', params, postConfig);
    },

    /**
     * 邀请人才
     */
    inviteTalent: (params: any) => {
        return axios.post('/system/inviteTalent', params, postConfig)
    },
    /**
     * 删除职位
     */
    deletePosition: (params: any) => {
        return axios.post('/system/delPosition', params, postConfig)
    },
    /**
     * 修改职位信息
     */
    modifyPosition: (params: any) => {
        return axios.post('/system/modifyPosition', params, postConfig)
    },
    /**
     * 获取VIP下拉框
     */
    getVip: (params: any) => {
        return axios.post('/drop/getVip', params, postConfig)
    },

    /**
     * 获取职位类别下拉框
     */
    getPosition: (params: any) => {
        return axios.post('/drop/getPosition', params, postConfig);
    },

    /**
     *批量修改状态
     */
    modifyResumeStatus: (params: any) => {
        return axios.post('/system/modifyResumeStatus', params, postConfig)
    },
    /**
      *支付宝支付
      */
    payment: (params: any) => {
        let towParams = '?';
        for (let key in params) {
            towParams += `${key}=${params[key]}&`
        };
        return axios.get(`/pay${towParams}`, getConfig)
    },
    /**
      * 修改职位状态
      */
    modifyPositionStatus: (params: any) => {
        return axios.post('/system/modifyPositionStatus', params, postConfig)
    },
    /**
      * 获取职位信息
      */
    getPositionDetail: (params: any) => {
        return axios.post('/system/getPositionById', params, postConfig)
    },
    /**
      * 刷新职位
      */
    refreshPosition: (params: any) => {
        return axios.post('/system/refreshPosition', params, postConfig)
    },
    /**
      * @describe 修改企业意向学校
      * @param 
      */
    setEnterpriseSchoolOfIntention: (params: any) => {
        return axios.post('/system/modifyCompanyWishSchool', params, postConfig)
    },
    /**
     * 获取简历url
     */
    getResumeUrl: (params: any) => {
        return axios.post('/system/getResumeUrl', params, postConfig)
    },

    /**
     * @description 邀请人才下拉框
     */
    getInviteDrop: (params: any) => {
        return axios.post('/drop/getInvite', params, postConfig)
    },

                  

    /**
     * @description 注册企业信息
     */
    registerCompany: (params: any) => {
        return axios.post('/system/register', params, postConfig)
    }
}