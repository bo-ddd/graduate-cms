import { defineStore } from 'pinia'
import Api from '@/assets/api/z-api'

export const useCompany = defineStore('company', () => {
    function getSelectCompany(params: any) {
        return Api.getSelectCompanyList(params) as any
    }
    
    function getSelectCompanyResume(params: any) {
        return Api.getSelectCompanyResumeList(params) as any
    }

    function getCompanyNature(params: any) {
        return Api.getCompanyNatureList(params) as any
    }


    return { getSelectCompany, getSelectCompanyResume, getCompanyNature, }
})
