import axios from './instance';

import { postConfig,getConfig } from './config'

interface ApiRes{
   code:number,
   msg:string,
   data:any
}

 interface UserListParams{
    pageIndex:number,
    pageSize:number,
    userName?:string,
    userStatus?:number
 }
 

 interface UserResume{
   userId:number
 }

 

export default {
    getSelectUser:(params:UserListParams) : Promise<ApiRes>=>{
       return axios.post('/system/selectUser',params,postConfig)
    },
    selectUserResume:(params:UserResume) : Promise<ApiRes>=>{
      return axios.post("/system/selectUserResume",params,postConfig)
    },
    selectUserOpinion:(params:UserResume) : Promise<ApiRes>=>{
      return axios.post("/system/selectUserOpinion",params,postConfig)
    }
}