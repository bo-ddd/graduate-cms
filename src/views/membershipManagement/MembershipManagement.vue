<script lang="ts" setup>
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
</script>

<template>
    <div class="user">
        <div class="header">
            <div>
                <h4>查询条件:</h4>
            </div>
            <div class="ml-15">公司名称:</div>
            <div>
                <el-input placeholder="Please input" />
            </div>
            <div>会员等级</div>
            <div>
                <el-select class="m-2" placeholder="Select" size="large">
                    <el-option v-for="item in 5" :key="item" :label="item" :value="item" />
                </el-select>
            </div>
            <div>
                <el-button class="find-btn" type="primary">查询</el-button>
            </div>
        </div>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
        <el-pagination class="mt-10"
            :page-sizes="[100, 200, 300, 400]" 
            layout="total, sizes, prev, pager, next, jumper" :total="400"  />
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

