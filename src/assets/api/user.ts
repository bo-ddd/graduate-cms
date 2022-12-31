import axios from './instance';

import { postConfig, getConfig } from './config'

interface ApiRes {
  code: number,
  msg: string,
  data: any
}

interface UserListParams {
  pageIndex: number,
  pageSize: number,
  userName?: string,
  userStatus?: number
}


interface UserResume {
  userId: number
}

interface UserStar {
  bool: boolean,
  pageIndex: number,
  pageSize: number,
  userId: number
}


export default {
  getSelectUser: (params: UserListParams): Promise<ApiRes> => {
    return axios.post('/system/selectUser', params, postConfig)
  },
  selectUserResume: (params: UserResume): Promise<ApiRes> => {
    return axios.post("/system/selectUserResume", params, postConfig)
  },
  selectUserOpinion: (params: UserResume): Promise<ApiRes> => {
    return axios.post("/system/selectUserOpinion", params, postConfig)
  },
  selectUserStar: (params: UserStar): Promise<ApiRes> => {
    return axios.post("/system/selectUserStar", params, postConfig)
  },
  selectUserDelivery: (params: { deliveryStatus: number ,  userId: number}): Promise<ApiRes> => {
    return axios.post("/system/selectUserDelivery", params, postConfig)
  },
  // 应聘阶段下拉框
  getStageL: (params: {}): Promise<ApiRes> => {
    return axios.post("/drop/getStage", params, postConfig)
  },
  selectUserInterview:(params:{userId:number}): Promise<ApiRes> => {
    return axios.post("/system/selectUserInterview", params, postConfig)
  },                          
}