
import { defineStore } from 'pinia'
import Api from '../assets/api/member-api'

interface Res{
code:number,
msg:string,
data:object[]
}

export const useMemberCard = defineStore('member', () => {
    function getMemberCardList(params: any) {
        return Api.getMemberCardList(params) as any
    }

    return { getMemberCardList }
})
