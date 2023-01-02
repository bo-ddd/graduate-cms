
import { defineStore } from 'pinia'
import Api from '../assets/api/member-api'

export const useMemberCard = defineStore('member', () => {
    function getMemberCardList(params: any) {
        return Api.getMemberCardList(params)
    }
    function getPosition(params: any) {
        return Api.getPosition(params)
    }

    return { getMemberCardList,getPosition }
})
