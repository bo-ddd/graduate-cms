
import { defineStore } from 'pinia'
import Api from '../assets/api/member-api'

export const useMemberCard = defineStore('memberCard', () => {
    function getMemberCardList(params: any) {
        return Api.getMemberCardList(params)
    }
    function getPosition(params: any) {
        return Api.getPosition(params)
    }
    function modifyStatus(params: any) {
        return Api.modifyStatus(params)
    }

    return { getMemberCardList,getPosition,modifyStatus }
})
