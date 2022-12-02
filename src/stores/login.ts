import { defineStore } from 'pinia'
import Api from '@/assets/api/login-registration'

export const useMemberCard = defineStore('member', () => {
    function getLogin(params: any) {
        return Api.getLogin(params) as any
    }

    return { getLogin }
})
