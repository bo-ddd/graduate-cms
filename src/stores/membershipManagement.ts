import { defineStore } from 'pinia'
import Api from "@/assets/api/hs-api";
import type { SelectVip } from '@/type/User';
export const useMemberShipManage = defineStore('memberShipManage', () => {
    function getVip(payload?: any) {
        return Api.getVip(payload);
    }
    function getUserList(payload?: SelectVip) {
        return Api.getUserList(payload);
    }
    return { getVip, getUserList }
})
