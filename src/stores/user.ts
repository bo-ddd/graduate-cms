
import { defineStore } from 'pinia'
import Api from '../assets/api/user'

interface UserListParams{
    pageIndex:number,
    pageSize:number,
    userName?:string,
    userStatus?:number
 }

 interface UserResume{
    userId:number
  }

export const useUserStore = defineStore('user', () => {
    
    function  getSelectUser(payload:UserListParams){
         return Api.getSelectUser(payload);
    }

    function selectUserResume(payload:UserResume){
           return Api.selectUserResume(payload);
    }

    function selectUserOpinion(payload:UserResume){
        return Api.selectUserOpinion(payload);
 }

    return { getSelectUser,selectUserResume,selectUserOpinion }
})
