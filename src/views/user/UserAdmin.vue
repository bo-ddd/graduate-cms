<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
let userStore = useUserStore();


/**
 * 查询用户列表
 */
let tableData = ref()
const getUserList = async () => {
    let res = await userStore.getSelectUser({
        pageIndex: 1,
        pageSize: 10,

    });
    if (res.code == 200) {
        tableData.value = res.data.data;
    }
}
getUserList();



/***
 * 
 * 面试
 * 
 */
let interviewDialog = ref(false);
const interviewFn = () => {
    interviewDialog.value = true;
}

/***
 * 
 * 投递记录
 * 
 */

let deliveryDialog = ref(false);
const deliveryFn = () => {
    deliveryDialog.value = true;
}

/***
 * 收藏
 */
let collectionDialog = ref(false);
const collectionFn = () => {
    collectionDialog.value = true;
}


/***
 * 用户简历
 */
let userResumeDialog = ref(false);
let userResume: any = ref({});
const selectUserResume = async (userId: number) => {
    userResumeDialog.value = true;
    let res = await userStore.selectUserResume({
        userId
    })
    if (res.code == 200) {
        userResume.value = res.data[0];
        console.log(userResume.value);
    }
}



/***
 * 
 * 查询用户反馈
 * 
 */

let centerDialogVisible = ref(false);
let opinionData = ref([]);
const selectUserOpinion = async (userId: number) => {
    centerDialogVisible.value = true;
    let res = await userStore.selectUserOpinion({
        userId
    })
    if (res.code == 200) {
        opinionData.value = res.data;
    }
}



</script>

<template>
    <div class="user">
        <div class="header">
            <div>
                <h4>查询条件:</h4>
            </div>
            <div class="ml-15">用户名称:</div>
            <div>
                <el-input placeholder="Please input" />
            </div>
            <div>求职状态</div>
            <div>
                <el-select class="m-2" placeholder="Select" size="large">
                    <el-option v-for="item in 5" :key="item" :label="item" :value="item" />
                </el-select>
            </div>
            <div>
                <el-button class="find-btn" type="primary">查询</el-button>
            </div>
        </div>

        <el-table :data="tableData" style="width:100%">
            <el-table-column prop="userPhone" label="账号" />
            <el-table-column prop="userName" label="名称" />
            <el-table-column label="在线简历">
                <template #default="scope">
                    <div class="red-color">
                        <span @click="selectUserResume(scope.row.userId)">详情</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="反馈">
                <template #default="scope">
                    <div class="red-color">
                        <span @click="selectUserOpinion(scope.row.userId)">查看</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="收藏">
                <template #default="scope">
                    <div class="red-color" @click="collectionFn()">详情</div>
                </template>
            </el-table-column>
            <el-table-column prop="userStatusName" label="求职状态" />
            <el-table-column label="投递记录">
                <template #default="scope">
                    <div class="red-color" @click="deliveryFn()">详情</div>
                </template>
            </el-table-column>
            <el-table-column label="面试">
                <template #default="scope">
                    <div class="red-color" @click="interviewFn()">详情</div>
                </template>
            </el-table-column>
            <el-table-column prop="userSite" label="站点" />
            <el-table-column prop="registerTime" label="注册时间" width="160px" />
            <el-table-column prop="lastLoginTime" label="最近登录时间" width="160px" />
        </el-table>
        <el-pagination class="mt-10" :page-sizes="[100, 200, 300, 400]" layout="total, sizes, prev, pager, next, jumper"
            :total="400" />


        <!-- 投递记录 -->
        <el-dialog v-model="deliveryDialog" width="50%" align-center>
            <el-tabs tab-position="top" style="min-height:400px"  class="delivery">
                <el-tab-pane label="待查看">
                    <div class="cord-box">
                        <div class="header">
                            <div class="">
                                <h4>Java开发工程师</h4>
                            </div>
                            <div class="red-ft">8-15k</div>
                        </div>
                        <div class="count">
                            <div class="count-gs">
                                <div><img src="@/assets/images/icon-file.png" alt=""></div>
                                <div>
                                    中科百谷
                                    <br>北京-北京市
                                </div>
                            </div>
                            <div class="d0-ft">17:41</div>
                        </div>
                    </div>
                    <div class="cord-box">
                        <div class="header">
                            <div class="">
                                <h4>Java开发工程师</h4>
                            </div>
                            <div class="red-ft">8-15k</div>
                        </div>
                        <div class="count">
                            <div class="count-gs">
                                <div><img src="@/assets/images/icon-file.png" alt=""></div>
                                <div>
                                    中科百谷
                                    <br>北京-北京市
                                </div>
                            </div>
                            <div class="d0-ft">17:41</div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已查看">Config</el-tab-pane>
                <el-tab-pane label="进入筛选">Role</el-tab-pane>
                <el-tab-pane label="通过筛选">Task</el-tab-pane>
                <el-tab-pane label="面试">Role</el-tab-pane>
                <el-tab-pane label="不合适">Task</el-tab-pane>
                <el-tab-pane label="拟录用">Task</el-tab-pane>
            </el-tabs>
        </el-dialog>

        <!-- 面试 -->
        <el-dialog v-model="interviewDialog" width="50%" align-center>
            interviewDialog
        </el-dialog>


        <!-- 反馈 -->
        <el-dialog v-model="centerDialogVisible" width="50%" align-center>
            <el-table :data="opinionData" style="width: 100%;">
                <el-table-column prop="userName" label="姓名" />
                <el-table-column prop="userOpinion" label="反馈内容" />
                <el-table-column prop="userPhone" label="联系方式" />
            </el-table>
        </el-dialog>

        <!-- 收藏 -->
        <el-dialog v-model="collectionDialog" width="50%" align-center>
            <el-tabs tab-position="top" style="height: 200px" class="demo-tabs">
                <el-tab-pane label="职位">职位</el-tab-pane>
                <el-tab-pane label="企业">企业</el-tab-pane>
            </el-tabs>
        </el-dialog>

        <!-- 简历 -->
        <el-dialog v-model="userResumeDialog" width="51%" align-center>
            <div>
                <img :src="userResume.resumeUrl" alt="">
            </div>
        </el-dialog>

    </div>
</template>

<style lang="scss" scoped>
:deep(.el-dialog__close) {
    font-size: 33px !important;
    margin-left: 60px;
    margin-bottom: 60px !important;
    color: #ffffff;
}

:deep(.el-dialog__header) {
    padding: 0;
    padding-bottom: 0;
}

:deep(.el-dialog) {
    border-radius: 6px;
    text-align: center;
}

.red-color {
    color: red;
    text-align: center;
}

:deep(.el-table .cell) {
    text-align: center;
    padding: 8px;
}

:deep(.el-tabs__active-bar) {
    left: 265%;
}

.user {
    .demo-tabs {
        :deep(.el-tabs__item) {
            font-size: 18px !important;
        }

        :deep(.el-tabs__nav-scroll) {
            display: flex;
            justify-content: center;
        }

    }

    .delivery {
        :deep(.el-tabs__item) {
            font-size: 16px !important;
        }

        .cord-box {
            border-bottom: 1px solid rgb(247, 247, 247);
            border-top: 5px solid rgb(247, 247, 247);

            .header {
                display: flex;
                justify-content: space-between;
                padding: 10px;

                .red-ft {
                    color: red;
                    font-weight: 600;
                }
            }

            .count {
                display: flex;
                justify-content: space-between;
                padding: 0 10px;

                .count-gs {
                    display: flex;
                    align-items: center;
                    gap: 0 5px;

                    img {
                        width: 40px;
                        height: 40px;
                        align-items: center;
                        gap: 0 10px;
                    }
                }

                .d0-ft {
                    color: #a5a5a5;
                    font-size: 10px;
                }
            }
        }
    }

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

