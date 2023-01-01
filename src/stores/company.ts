import { defineStore } from 'pinia'
import Api from '@/assets/api/z-api'
import type { Company, CompanyIndustry, CompanyList, CompanyNature, CompanyResume, CompanySize, CompanyTag } from '@/type/Zapi'

export const useCompany = defineStore('company', () => {
    // 获取企业列表
    function getSelectCompany(params: CompanyList) {
        return Api.getSelectCompanyList(params) as any
    };
    // 查询简历
    function getSelectCompanyResume(params: CompanyResume) {
        return Api.getSelectCompanyResumeList(params) as any
    };
    // 获取企业性质
    function getCompanyNature(params: CompanyNature) {
        return Api.getCompanyNatureList(params) as any
    };
    // 获取企业规模
    function getCompanySize(params: CompanySize) {
        return Api.getCompanySizeList(params) as any
    };
    // 获取企业标签
    function getCompanyTag(params: CompanyTag) {
        return Api.getCompanyTagList(params) as any
    };
    // 获取所属行业
    function getCompanyIndustry(params: CompanyIndustry) {
        return Api.getCompanyIndustryList(params) as any
    };
    // 获取企业详情
    function getCompanyCommon(params: Company) {
        return Api.getCompanyCommon(params) as any
    };

    return {
        getSelectCompany,
        getSelectCompanyResume,
        getCompanyNature,
        getCompanySize,
        getCompanyTag,
        getCompanyIndustry,
        getCompanyCommon,
    };
})
