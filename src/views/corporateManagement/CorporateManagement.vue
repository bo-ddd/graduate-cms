<script lang="ts" setup>
import { useCompany } from '@/stores/company';
import type { CompanyDetail, TabledateItem } from '@/type/Company';
import type { Industry, Nature } from '@/type/CorporateManagement';
import type { Res } from '@/type/Res';
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { Company, CompanyList } from '@/type/Zapi';

const companyStore = useCompany();
// 企业名称
let companyFullName :Ref<string> = ref('');
// 企业简称
let companyName :Ref<string> = ref('');
// 注册地区
let companyAddr :Ref<string> = ref('');
// 企业性质
let nature: Ref<Nature[]> = ref([]);
let natureValue: Ref<string> = ref('');
const getCompanyNatureList = async () => {
    const res: Res = await companyStore.getCompanyNature({});
    if (res.code == 200) {
        nature.value = nature.value.concat(res.data);
    }
}
getCompanyNatureList();

// 企业规模
let companySize: Ref<Nature[]> = ref([]);
let companySizeValue: Ref<string> = ref('');
const getCompanySizeList = async () => {
    const res: Res = await companyStore.getCompanySize({});
    if (res.code == 200) {
        companySize.value = companySize.value.concat(res.data);
    }
}
getCompanySizeList();

// 企业标签
let companyTag: Ref<Nature[]> = ref([]);
let companyTagValue: Ref<string> = ref('');
const getCompanyTagList = async () => {
    const res: Res = await companyStore.getCompanyTag({});
    if (res.code == 200) {
        companyTag.value = companyTag.value.concat(res.data);
    }
}
getCompanyTagList();
// 所属行业
let companyIndustry: Ref<Industry[]> = ref([]);
let companyIndustryValue: Ref<string> = ref('');
const getCompanyIndustryList = async () => {
    const res: Res = await companyStore.getCompanyIndustry({});
    if (res.code == 200) {
        companyIndustry.value = companyIndustry.value.concat(res.data);
    }
}
getCompanyIndustryList();

// 表格
let tableData = ref();
const getSelectCompanyList = async (params: CompanyList) => {
    const res: Res = await companyStore.getSelectCompany(params);
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
getSelectCompanyList({
    companyAddr: '',
    companyFullName: '',
    companyIndustryLeft: 0,
    companyIndustryRight: 0,
    companyName: '',
    companyNature: 0,
    companySize: 0,
    companyTag: 0,
    pageIndex: 0,
    pageSize: 0,
    token: '',
});

// 查询
const query = ()=>{
    getSelectCompanyList({
    companyAddr: companyAddr.value,
    companyFullName: companyFullName.value,
    companyIndustryLeft: 0,
    companyIndustryRight: 0,
    companyName: companyName.value,
    companyNature: 0,
    companySize: 0,
    companyTag: 0,
    pageIndex: 0,
    pageSize: 0,
    token: '',
});
}


//简历管理
let resume = ref(false);
const isShowResume = function () {
    resume.value = true;

}
//发布职位
let position = ref(false);
const isShowPosition = function () {
    position.value = true;

}
//邀请人才
let personnel = ref(false);
const isShowPersonnel = function () {
    personnel.value = true;

}
//企业详情
let details = ref(false);
let companyDetail = ref({}) as Ref<CompanyDetail>;
const getCompanyCommon = async (params: Company) => {
    let res: Res = await companyStore.getCompanyCommon(params);
    if (res.code == 200) {
        companyDetail.value = res.data;
    }
    console.log(companyDetail.value);
}
const isShowDetails = function (id: number) {
    details.value = true;
    getCompanyCommon({
        companyId: id
    });
}


</script>

<template>
    <div class="user">
        <div class="header">
            <div class="mt-10">
                <h4>查询条件:</h4>
            </div>
            <div class="header-main">
                <div>公司名称</div>
                <div>
                    <el-input class="input-width" v-model="companyFullName" placeholder="请输入公司名称" />
                </div>
                <div>企业性质</div>
                <div>
                    <el-select class="m-2 input-width" v-model="natureValue" placeholder="请选择企业性质" size="large">
                        <el-option v-for="item, index in nature" :key="index" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
                <div>企业规模</div>
                <div>
                    <el-select class="m-2 input-width" v-model="companySizeValue" placeholder="请选择企业规模" size="large">
                        <el-option v-for="item, index in companySize" :key="index" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </div>
                <div>企业标签</div>
                <div>
                    <el-select class="m-2 input-width" v-model="companyTagValue" placeholder="请选择企业标签" size="large">
                        <el-option v-for="item, index in companyTag" :key="index" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </div>

                <div>所属行业</div>
                <div>
                    <el-select class="m-2 input-width" v-model="companyIndustryValue" placeholder="请选择所属行业"
                        size="large">
                        <el-option v-for="item, index in companyIndustry" :key="index" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </div>

                <div>注册地区</div>
                <div>
                    <el-input class="input-width" v-model="companyAddr" placeholder="请输入注册地区" />
                </div>

                <div>品牌名称</div>
                <div>
                    <el-input class="input-width" v-model="companyName" placeholder="请输入品牌名称(简称)" />
                </div>
                <div>
                    <el-button class="find-btn" type="primary" @click="query()">查询</el-button>
                </div>
            </div>
        </div>

        <el-table :data="tableData" height="420" style="width: 100%">
            <el-table-column prop="index" label="序号" align="center" />
            <el-table-column prop="companyId" label="企业id" align="center" />
            <el-table-column prop="companyFullName" label="企业名称" align="center" />
            <el-table-column prop="companyName" label="品牌名称" align="center" />
            <el-table-column label="简历管理" align="center">
                <template #default="scope">
                    <!-- {{ scope.row.index }} -->
                    <el-button type="danger" @click="isShowResume()" text class="btn-xq">详情</el-button>
                </template>
            </el-table-column>

            <el-table-column prop="companyIndustry" label="所属行业" align="center" />
            <el-table-column label="发布职位" align="center">
                <template #default="scope">
                    <!-- {{ scope.row.index }} -->
                    <el-button type="danger" @click="isShowPosition()" text class="btn-xq">详情</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="vipLevel" label="会员等级" align="center" />
            <el-table-column prop="companyRegisterAddr" label="注册地区" align="center" />
            <el-table-column label="邀请人才" align="center">
                <template #default="scope">
                    <!-- {{ scope.row.index }} -->
                    <el-button type="danger" @click="isShowPersonnel()" text class="btn-xq">详情</el-button>
                </template>
            </el-table-column>
            <el-table-column label="企业详情" align="center">
                <template #default="scope">
                    <!-- {{ scope.row.index }} -->
                    <el-button type="danger" @click="isShowDetails(scope.row.companyId)" text
                        class="btn-xq">详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 简历管理 -->
        <el-dialog v-model="resume" width="80%" align-center>

        </el-dialog>
        <!-- 发布职位 -->
        <el-dialog v-model="position" width="80%" align-center>

        </el-dialog>
        <!-- 邀请人才 -->
        <el-dialog v-model="personnel" width="80%" align-center>

        </el-dialog>
        <!-- 企业详情 -->
        <el-dialog v-model="details" width="30%" align-center title="企业详情">
            <div class="align-center company-detail mt-20">
                <p class="label">企业全称 ：</p> {{ companyDetail.companyFullName }}
            </div>
            <div class="align-center company-detail mt-20">
                <p class="label">品牌名 ：</p> {{ companyDetail.companyName }}
            </div>
            <div class="align-center company-detail mt-20">
                <p class="label">注册详细地址 ：</p> {{ companyDetail.companyRegisterAddr }}
            </div>
            <div class="align-center company-detail mt-20">
                <p class="label">所属行业 ：</p> {{ companyDetail.companyIndustry }}
            </div>
            <div class="align-center company-detail mt-20">
                <p class="label">企业规模 ：</p> {{ companyDetail.companySize }}
            </div>
            <div class="align-center company-detail mt-20">
                <p class="label">社会信用代码 ：</p> {{ companyDetail.companySocialCreditCode }}
            </div>
            <div class="align-center company-detail mt-20">
                <p class="label">联系人 ：</p> {{ companyDetail.companyContactName }}
            </div>
            <div class="align-center company-detail mt-20">
                <p class="label">联系方式 ：</p> {{ companyDetail.companyContactPhone }}
            </div>
            <div class="align-center company-detail mt-20">
                <p class="label">接收简历邮箱 ：</p> {{ companyDetail.companyContactEmail }}
            </div>
            <div class="align-center company-detail mt-20">
                <p class="label">企业简介 ：</p>
                <a class="company-introducation" :title="companyDetail.companyIntroducation">{{
        companyDetail.companyIntroducation
}}</a>
            </div>
            <div class="align-center company-detail mt-20">
                <p class="label">企业官网 ：</p> {{ companyDetail.companyWebUrl }}
            </div>
            <div class="align-center company-detail mt-20">
                <p class="label">会员等级 ：</p> {{ companyDetail.vipLevel }}
            </div>
        </el-dialog>

        <el-pagination class="mt-10" :page-sizes="[100, 200, 300, 400]" layout="total, sizes, prev, pager, next, jumper"
            :total="400" />
    </div>
</template>

<style lang="scss" scoped>
.user {

    .input-width {
        width: 163px;
        height: 40px;
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

// 企业详情
.company-detail {
    gap: 20px;

    &>.label {
        width: 120px;
        font-weight: 600;
        text-align: center;
    }

    .company-introducation {
        width: 15vw;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; // 默认不换行；

    }

}

:deep(.el-dialog__body) {
    padding-top: 0 !important;
}






@media screen and (-webkit-min-device-pixel-ratio:0) {

    /* Webkit内核兼容CSS选择器样式 放到这里 */
    .btn-xq {
        color: #f56c6c !important;
    }
}
</style>

