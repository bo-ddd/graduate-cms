import { defineStore } from 'pinia'
import Api from '@/assets/api/invitaionPerson';
export const useInvitation = defineStore('invitation', () => {
    function getSexList(params?:any){
        return Api.getSexList(params);
    }
    // 期待薪资
    function getWishMoneyList(params?:any){
        return Api.getWishMoneyList(params);
    }
    // 学历
    function getEducationList(params?:any){
        return Api.getEducationList(params);
    }
    // 专业
    function getProfessionaList(params?:any){
        return Api.getProfessionaList(params);
    }
    // 职位类别
    function getPositionList(params?:any){
        return Api.getPositionList(params);
    }
    // 邀请人才列表
    function selectInviteList(params?:any){
        return Api.selectInviteList(params);
    }
    // 获取人才列表
    function getTalentList(params:any){
        return Api.getTalentList(params);
    }
    return {
        getSexList,
        getWishMoneyList,
        getEducationList,
        getProfessionaList,
        getPositionList,
        selectInviteList,
        getTalentList,
    };
})