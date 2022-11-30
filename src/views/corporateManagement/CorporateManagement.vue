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
            <div class="mt-10">
                <h4>查询条件:</h4>
            </div>

            <div class="header-main">
                <div>公司名称:</div>
                <div>
                    <el-input class="input-width" placeholder="Please input" />
                </div>
                <div>企业性质</div>
                <div>
                    <el-select class="m-2 input-width" placeholder="Select" size="large">
                        <el-option v-for="item in 5" :key="item" :label="item" :value="item" />
                    </el-select>
                </div>
                <div>企业规模</div>
                <div>
                    <el-select  class="m-2 input-width" placeholder="Select" size="large">
                        <el-option v-for="item in 5" :key="item" :label="item" :value="item" />
                    </el-select>
                </div>
                <div>企业标签</div>
                <div>
                    <el-select class="m-2 input-width" placeholder="Select" size="large">
                        <el-option v-for="item in 5" :key="item" :label="item" :value="item" />
                    </el-select>
                </div>

                <div>所属行业</div>
                <div>
                    <el-select class="m-2 input-width" placeholder="Select" size="large">
                        <el-option v-for="item in 5" :key="item" :label="item" :value="item" />
                    </el-select>
                </div>

                <div>注册地区</div>
                <div>
                        <el-input class="input-width" placeholder="Please input" />
                </div>

                <div>品牌名称</div>
                <div>
                        <el-input class="input-width" placeholder="Please input" />
                </div>
                <div>
                    <el-button class="find-btn" type="primary">查询</el-button>
                </div>
            </div>
        </div>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
        <el-pagination class="mt-10" :page-sizes="[100, 200, 300, 400]" layout="total, sizes, prev, pager, next, jumper"
            :total="400" />
    </div>
</template>

<style lang="scss" scoped>
.user {
    .input-width {
        width: 163px;
    }
    .header {
        display: flex;
        border-bottom: 1px solid rgb(237, 237, 237);
        padding-bottom: 20px;
        align-items: top;
        .header-main {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap:10px 22px;
            width:86%;
            margin-left: 10px;
        }

        .find-btn {
            padding: 0 30px;
        }
    }
}
</style>

