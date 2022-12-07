import { defineStore } from 'pinia'
import Api from '@/assets/api/z-api'

export const useCompany = defineStore('company', () => {
    function getSelectCompany(params: any) {
        return Api.getSelectCompanyList(params) as any
    }

    return { getSelectCompany }
})
