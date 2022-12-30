<script lang="ts" setup>
import { reactive,ref ,type Ref} from "vue";
import { useMemberShipManage } from "@/stores/membershipManagement";
import type { SelectVip } from "@/type/User";
let memberShipStore = useMemberShipManage();//接口的仓库

let company = reactive<SelectVip>({
    pageSize:10,
    pageIndex:1,
    companyName:null,
    vipLevel:null,
}) as SelectVip;
let vipList:Ref<Array<{
    vipLevel:number,
    vipName:string,
}>> = ref([]);
let tableData = ref([]) as Ref<Object[]>;

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
    let res = await memberShipStore.getUserList(obj);
    if(res.code == 200){
        tableData.value = res.data;
        console.log(res);
    }
}
getUserList();
// 获取vip列表的方法
const getVip = async ()=>{
    let res = await memberShipStore.getVip();
    if(res.code == 200){
        vipList.value = res.data;
        console.log(res);
    }
}
getVip();


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
            <el-table-column prop="date" label="序号"  />
            <el-table-column prop="name" label="公司id" />
            <el-table-column prop="address" label="公司名称" />
            <el-table-column prop="address" label="品牌名称" />
            <el-table-column prop="address" label="会员等级" />
            <el-table-column prop="address" label="所属行业" />
            <el-table-column prop="address" label="购买月数" />
            <el-table-column prop="address" label="到期时间" />
        </el-table>
        <div class="mt-10 just-center">
            <el-pagination  :page-sizes="[10, 20, 30, 40]"  layout="total, sizes, prev, pager, next, jumper" :total="400"  />
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