<script lang="ts" setup>
import { useCompany } from '@/stores/company';
import type { TabledateItem } from '@/type/Company';
import { ref } from 'vue';

const companyStore = useCompany();

let tableData = ref()
const getSelectCompanyList = async () => {
    let res = await companyStore.getSelectCompany({
        companyAddr: '',
        companyFullNam: '',
        companyIndustryLeft: '',
        companyIndustryRight: '',
        companyName: '',
        companyNature: '',
        companySize: '',
        companyTag: '',
        pageIndex: '',
        pageSize: '',
        token: 'token'
    });
    console.log(res);
    if (res.code == 200) {
        tableData.value = res.data;

        tableData.value.forEach((item: TabledateItem, index: number) => {
            let key: keyof any;
            for (key in item) {
                if (key == 'vipLevel') {
                    if (item[key] == 1) {
                        item[key] = '普通会员'
                    } else if (item[key] == 2) {
                        item[key] = '白银会员'
                    }
                }
            };
            Object.assign(item, { index: index + 1 })
        });
        console.log(tableData.value);
    }
}
getSelectCompanyList();



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
                    <el-input class="input-width" placeholder="" />
                </div>
                <div>企业性质</div>
                <div>
                    <el-select class="m-2 input-width" placeholder="国企" size="large">
                        <el-option label="国企" value="国企" />
                        <el-option label="其他" value="其他" />
                    </el-select>
                </div>
                <div>企业规模</div>
                <div>
                    <el-select class="m-2 input-width" placeholder="Select" size="large">
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

        <el-table :data="tableData" height="420" style="width: 100%">
            <el-table-column prop="index" label="序号" align="center" />
            <el-table-column prop="companyId" label="企业id" align="center" />
            <el-table-column prop="companyFullName" label="企业名称" align="center" />
            <el-table-column prop="companyName" label="品牌名称" align="center" />
            <el-table-column prop="address" label="简历管理" align="center">
                <template #default="scope">
                    <!-- {{ scope.row.index }} -->
                    <el-button type="danger" text class="btn-xq">详情</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="companyIndustry" label="所属行业" align="center" />
            <el-table-column prop="address" label="发布职位" align="center">
                <template #default="scope">
                    <!-- {{ scope.row.index }} -->
                    <el-button type="danger" text class="btn-xq">详情</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="vipLevel" label="会员等级" align="center" />
            <el-table-column prop="companyRegisterAddr" label="注册地区" align="center" />
            <el-table-column prop="address" label="邀请人才" align="center">
                 <template #default="scope">
                    <!-- {{ scope.row.index }} -->
                    <el-button type="danger" text class="btn-xq">详情</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="企业详情" align="center">
                 <template #default="scope">
                    <!-- {{ scope.row.index }} -->
                    <el-button type="danger" text class="btn-xq">详情</el-button>
                </template>
            </el-table-column>
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
            gap: 10px 22px;
            width: 86%;
            margin-left: 10px;
        }

        .find-btn {
            padding: 0 30px;
        }
    }

}

@media screen and (-webkit-min-device-pixel-ratio:0) {

    /* Webkit内核兼容CSS选择器样式 放到这里 */
    .btn-xq {
        color: #f56c6c !important;
    }
}
</style>

