import axios from "./instance";
import { postConfig, getConfig } from './config';
export default {
    // 性别
    getSexList:(payload:any)=>{
        return axios.post('/drop/getSex',payload,postConfig);
    },
    // 期待薪资
    getWishMoneyList:(payload:any)=>{
        return axios.post('/drop/getWishMoney',payload,postConfig);
    },
    // 学历
    getEducationList:(payload:any)=>{
        return axios.post('/drop/getEducation',payload,postConfig);
    },
    // 专业
    getProfessionaList:(payload:any)=>{
        return axios.post('/drop/getProfessional',payload,postConfig);
    },
    // 职位类别
    getPositionList:(payload:any)=>{
        return axios.post('/drop/getPosition',payload,postConfig);
    },
    // 邀请人才列表
    selectInviteList:(payload:any)=>{
        return axios.post('/system/selectInvite',payload,postConfig);
    },
    getTalentList:(payload:any)=>{
        return axios.post('/system/getTalent',payload,postConfig);
    }
}