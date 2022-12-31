
import { defineStore } from 'pinia'
import Api from '../assets/api/user'

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
  bool:boolean,
  pageIndex:number,
  pageSize:number,
  userId: number
 }

export const useUserStore = defineStore('user', () => {

  function getSelectUser(payload: UserListParams) {
    return Api.getSelectUser(payload);
  }

  function selectUserResume(payload: UserResume) {
    return Api.selectUserResume(payload);
  }

  function selectUserOpinion(payload: UserResume) {
    return Api.selectUserOpinion(payload);
  }

  function selectUserStar(payload:UserStar){
    return Api.selectUserStar(payload);
  }

  function selectUserDelivery(payload:{deliveryStatus:number}){
    return Api.selectUserDelivery(payload);
  }

  function  getStageL(payload:{}){
    return Api.getStageL(payload);
  }

  return { getSelectUser, selectUserResume, selectUserOpinion,selectUserStar,selectUserDelivery,getStageL }
})
