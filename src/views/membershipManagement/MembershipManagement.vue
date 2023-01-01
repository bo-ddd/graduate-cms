<script lang="ts" setup>
import { reactive,ref ,type Ref,watch} from "vue";
import { useMemberShipManage } from "@/stores/membershipManagement";
import type { SelectVip } from "@/type/User";
let memberShipStore = useMemberShipManage();//接口的仓库
interface Vip{
    vipLevel:number;
    vipName:string;
}
interface Res<T>{
    code:number,
    msg:string,
    data:T,
}
interface Company{
    buyMonth: number;
    companyFullName: string;
    companyId: number;
    companyIndustry: string;
    companyName: string;
    overTime: string;
    sortId: number;
    userId: number;
    vipLevel: number;
    vipLevelName?:string,
}
let company = reactive<SelectVip>({
    pageSize:10,
    pageIndex:1,
    companyName:'',
    vipLevel:'',
}) as SelectVip;
let vipList:Ref<Vip[]> = ref([]) as Ref<Vip[]>;
let tableData:Ref<Company[]> = ref() as Ref<Company[]>;
let companyCount:Ref<number> = ref() as Ref<number>;
// 获取用户列表的方法
const getUserList = async ()=>{
    let obj : SelectVip = {} as SelectVip;
    let key: keyof SelectVip;
    for (key in company) {
      if(company[key]){
        obj[key] = company[key];
      }
    }
    console.log(obj);
    let res:Res<{
      data:Company[];
      maxCount:number;
    }> = await memberShipStore.getUserList(obj);
    if(res.code == 200){
        tableData.value = (res.data).data.map(item=>{
            return {
                ...item,
                vipLevelName:vipList.value[item.vipLevel-1].vipName,
            }
        });
        companyCount.value = res.data.maxCount;
        console.log(res.data.maxCount);
    }
}
const getVip = async ()=>{
    let res:Res<Vip[]> = await memberShipStore.getVip();
    if(res.code == 200){
        vipList.value = res.data;
    }
}
getVip();
getUserList();
// 获取vip列表的方法
watch(company,()=>{
    getUserList();
})

</script>

<template>
    <div class="user">
        <div class="header">
            <div>
                <h4>查询条件:</h4>
            </div>
            <div class="ml-15">公司名称:</div>
            <div>
                <el-input placeholder="请输入公司名称" v-model="company.companyName" />
            </div>
            <div>会员等级</div>
            <div>
                <el-select class="m-2" v-model="company.vipLevel" size="large" placeholder="请选择会员等级">
                    <el-option v-for="item in vipList" :key="item.vipLevel" :label="item.vipName" :value="item.vipLevel" />
                </el-select>
            </div>
            <div>
                <el-button class="find-btn" type="primary" @click="getUserList">查询</el-button>
            </div>
        </div>

        <el-table :data="tableData"   table-layout="auto" :cell-style="{'text-align':'center'}" :header-cell-style="{'text-align':'center'}">
            <el-table-column prop="sortId" label="序号"  />
            <el-table-column prop="companyId" label="公司id" />
            <el-table-column prop="companyName" label="公司名称" />
            <el-table-column prop="companyFullName" label="品牌名称" />
            <el-table-column prop="vipLevelName" label="会员等级" />
            <el-table-column prop="companyIndustry" label="所属行业" />
            <el-table-column prop="buyMonth" label="购买月数" />
            <el-table-column prop="overTime" label="到期时间" />
        </el-table>
        <div class="mt-10 just-center">
            <el-pagination :pager-count="7"	v-model:current-page="company.pageIndex" v-model:page-size="company.pageSize" :page-sizes="[1,10, 20, 30, 40]"  layout="total, sizes, prev, pager, next, jumper" :total="companyCount"  />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.user {
    .header {
        display: flex;
        align-items: center;
        gap: 0 10px;
        border-bottom: 1px solid rgb(237, 237, 237);
        padding-bottom: 20px;

        .find-btn {
            padding: 0 30px;
        }
    }
}
</style>