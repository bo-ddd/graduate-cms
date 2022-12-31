// 获取企业规模
export interface CompanySize {

}
// 获取企业性质
export interface CompanyNature {

}
// 获取企业标签
export interface CompanyTag {

}
// 获取所属行业
export interface CompanyIndustry {

}
// 查询简历
export interface CompanyResume {
    companyId: number,
    deliveryStatus? : number,
    educationId? : number,
    invitationStatus? : boolean,
    pageIndex?: number,
    pageSize?: number,
    positionId? : number,
    userId ?: number,
    userName ?: string,
}
// 获取企业列表
export interface CompanyList {
    companyAddr? : string ,
    companyFullName ?: string ,
    companyIndustryLeft? : number ,
    companyIndustryRight ?: number ,
    companyName ?: string ,
    companyNature ?: number ,
    companySize ?: number ,
    companyTag ?: number ,
    pageIndex ?: number ,
    pageSize ?: number ,
    token ?: string,
}