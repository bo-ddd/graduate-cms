export interface School{
    userId:number;
    userEducationId:number;
    school:string;
    professional:string;
    education:string;
}
export interface UserInfo{
    school:string;
    userEducation:string;
    userName: string;
    userProfessional: string;
}

export interface Check {
    id: number,
    label: string | number,
    value: string | number,
}
export interface HSRes {
    code: number,
    data: string | [] | any,
    msg: string,
}
export interface Form {
    sex?: any,
    education?: any,
    professional?: any,
    city?: string,
    wishMoneyLeft?: any,
    wishMoneyRight?: any,
}
export interface InvitationForm{
    status:any;
    positionId:any;
}