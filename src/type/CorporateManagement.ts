// 企业性质 
export interface Nature {
    label: string,
    value: number,
    createTime: null | string,
    modifyTime: null | string,
}

// 所属行业的子级
export interface IndustryChildren {
    industryTypeId: string,
    label: string,
    sortId: number,
    value: string,
}

// 所属行业
export interface Industry {
    sortId: number,
    label: string,
    value: number,
    children: IndustryChildren[]
}