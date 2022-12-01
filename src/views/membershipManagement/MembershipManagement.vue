<script lang="ts" setup>
import { reactive } from "vue";
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
let company = reactive<{
    companyName:string;
    level:number | string;
}>({
    companyName:'',
    level:'',
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
                <el-select class="m-2" v-model="company.level" size="large">
                    <el-option v-for="item in 5" :key="item" :label="item" :value="item" />
                </el-select>
            </div>
            <div>
                <el-button class="find-btn" type="primary">查询</el-button>
            </div>
        </div>

        <el-table :data="tableData" style="width: 100%" fit="true" table-layout="auto" :cell-style="{'text-align':'center'}" :header-cell-style="{'text-align':'center'}">
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