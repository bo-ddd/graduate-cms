import { defineStore } from 'pinia'
import Api from '@/assets/api/login-registration'

export const useLoginStores = defineStore('member', () => {
    /**
     * @param params 登录、修改密码
     * @returns inviteCode (integer, optional): 用户邀请码id ,
     * @returns loginType (integer): 登录方式 0密码登录 1短信 2注册 3重置密码 ,
     * @returns password (string, optional): 密码 ,
     * @returns phone (string): 手机号 ,
     * @returns smsCode (string, optional): 验证码,
     */
    function login(params: any) {
        return Api.getLogin(params) as any
    }

    return { login }
})
