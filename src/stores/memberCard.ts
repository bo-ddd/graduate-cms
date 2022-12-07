
import { defineStore } from 'pinia'
import Api from '../assets/api/member-api'

export const useMemberCard = defineStore('member', () => {
    function getMemberCardList(params: any) {
        return Api.getMemberCardList(params)
    }

    return { getMemberCardList }
})
