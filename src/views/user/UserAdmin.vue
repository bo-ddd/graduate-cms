<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
let userStore = useUserStore();

let userName = ref();
let stagelSelect = ref();
/**
 * 查询用户列表
 */
let pageSize = ref(10);
let totalCount = ref();
let tableData = ref();
let current = ref(1);
const getUserList = async (value?:number) => {
    console.log(value);
    
    let res = await userStore.getSelectUser({
        pageIndex: current.value,
        pageSize:pageSize.value,
        userName:userName.value,
        userStatus:stagelSelect.value

    });
    if (res.code == 200) {
        tableData.value = res.data.data;
        totalCount.value = res.data.maxCount;
    }
}
getUserList();



/***
 * 
 * 面试
 * 
 */
let interviewDialog = ref(false);
let interviewList = ref();
let isInterK = ref(false);
const interviewFn = async (userId:number) => {

    interviewDialog.value = true;
    let res = await userStore.selectUserInterview({
        userId
    })
   if(res.code){
    interviewList.value = res.data;
    console.log(interviewList.value.length);

    if(interviewList.value.length){
        isInterK.value = false;
    }else{
        isInterK.value = true;
    }

   }
}
             
/***
 * 
 * 投递记录
 * 
 */

let deliveryId = ref(0);
let deliveryDialog = ref(false);
let  deliveryUserId = ref();
let deliveryList = ref();
const deliveryFn = async (id?: number) => {
    deliveryDialog.value = true;
    deliveryUserId.value = id;
    let res = await userStore.selectUserDelivery({
        deliveryStatus:deliveryId.value,
        userId:Number(deliveryUserId.value)   
    });
    if (res.code == 200) {
        deliveryList.value = res.data;
    }
}

const deliveryTabFn = async(name:number)=>{
    deliveryId.value = name;
    let res = await userStore.selectUserDelivery({
        deliveryStatus:deliveryId.value,
        userId:Number(deliveryUserId.value)
    });
    if (res.code == 200) {
        deliveryList.value = res.data;
    }
}

/****
 * 应聘阶段下拉框
 * 
 */
let stagel = ref();
const getStageL = async () => {
    let res = await userStore.getStageL({});
    if (res.code == 200) {
        stagel.value = res.data;
    }
}
getStageL();

/***
 * 收藏
 */
let collectionName = ref("企业");
let collectionDialog = ref(false);
let bool = ref(true);
let cardList = ref();
let collUserId = ref();
const collectionFn = (userId: number) => {
    collectionDialog.value = true;
    collUserId.value = userId;
    userStarFn();
}

const userStarFn = async (name?: string) => {
    if (name) { collectionName.value = name!; }
    bool.value = collectionName.value == "职位" ? false : true;
    let res = await userStore.selectUserStar({
        pageIndex: current.value,
        pageSize:pageSize.value,
        bool: bool.value,
        userId: Number(collUserId.value)
    })
    if (res.code == 200) {
        cardList.value = res.data.data;

    }
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
                <el-input placeholder="请输入用户名称" v-model="userName" />
            </div>
            <div>求职状态</div>
            <div>
                <el-select class="m-2" v-model="stagelSelect" placeholder="请选择求职状态" size="large">
                    <el-option v-for="item in stagel" :key="item" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div>
                <el-button class="find-btn" type="primary" @click="getUserList()">查询</el-button>
            </div>
        </div>

        <div class="table-box">
            <el-table :data="tableData" style="width:100%;height:70vh;">
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
                        <div class="red-color" @click="collectionFn(scope.row.userId)">详情</div>
                    </template>
                </el-table-column>
                <el-table-column prop="userStatusName" label="求职状态" />
                <el-table-column label="投递记录">
                    <template #default="scope">
                        <div class="red-color" @click="deliveryFn(scope.row.userId)">详情</div>
                    </template>
                </el-table-column>
                <el-table-column label="面试">
                    <template #default="scope">
                        <div class="red-color" @click="interviewFn(scope.row.userId)">详情</div>
                    </template>
                </el-table-column>
                <el-table-column prop="userSite" label="站点" />
                <el-table-column prop="registerTime" label="注册时间" width="160px" />
                <el-table-column prop="lastLoginTime" label="最近登录时间" width="160px" />
            </el-table>
            <el-pagination class="mt-10" @current-change="getUserList" @size-change="getUserList"   v-model:page-size="pageSize" v-model:current-page="current" :page-sizes="[10, 50, 100, 500]"
                layout="total, sizes, prev, pager, next, jumper" :total="totalCount" />
        </div>



        <!-- 投递记录 -->
        <el-dialog v-model="deliveryDialog" width="50%" align-center>
            <el-tabs tab-position="top" :model-value="0" @tab-change="deliveryTabFn" style="height:500px;overflow:auto;"
                class="delivery">
                <el-tab-pane v-for="item in stagel" :label="item.label" :name="item.value">
                    <div class="cord-box" v-for="item in deliveryList">
                  <div class="header">
                     <div class=""><h3>{{ item.positionName  }}</h3></div>
                     <div class="red-ft">{{ item.positionMoney  }}</div>
                  </div>
                  <div class="count">
                     <div class="count-gs">
                        <div><img :src="item.companyLogoUrl " alt=""></div>
                        <div class="text-left"> 
                           {{ item.companyName }}
                         <br>{{ item.companyAddr }}
                        </div>
                       </div>
                     <div class="d0-ft">{{ item.interviewTime  }}</div>
                  </div>
              </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>

        <!-- 面试 -->
        <el-dialog v-model="interviewDialog" width="50%" align-center  style="height: 500px;overflow: auto;"    >
            <div class="inter">
                <el-empty v-if="isInterK" description="没有数据"  class="empty" />
        <div v-for="item in interviewList" :key="item.companyId">
            <div>
                <div class="date_time flex">
                    {{ item.interviewTime }}
                </div>

                <div class="just-between">
                    <div class="title">
                        <h2>{{ item.companyName }}</h2>
                        <span>线下面试</span>
                    </div>

                    <div class="icon-head_portrait">
                        <img :src="item.companyLogoUrl" alt="">
                    </div>
                </div>

                <div class="brief_introduction align-center">
                    <div>{{ item.positionName }}</div>
                    <div class="ml-5">{{ item.positionMoney }}</div>
                </div>
            </div>
        </div>
    </div>
        </el-dialog>


        <!-- 反馈 -->
        <el-dialog v-model="centerDialogVisible" width="50%" align-center>
            <el-table :data="opinionData" style="height: 500px;overflow: auto;"  >
                <el-table-column prop="userName" label="姓名" />
                <el-table-column prop="userOpinion" label="反馈内容" />
                <el-table-column prop="userPhone" label="联系方式" />
            </el-table>
        </el-dialog>

        <!-- 收藏 -->
        <el-dialog v-model="collectionDialog" width="50%" align-center>
            <el-tabs @tab-change="userStarFn" :model-value="collectionName" tab-position="top" style="height: 500px;overflow: auto;"
                class="demo-tabs">
                <el-tab-pane label="企业" name="企业">
                    <el-empty description="description" />
                </el-tab-pane>
                <el-tab-pane label="职位" name="职位">
                         <div class="positionItem mt-10" v-for="item in cardList">
                            <div class="top flex-between color-black">
                                <div>{{ item.positionName }}</div>
                                <div class="red-color">{{ item.positionMoney }}</div>
                            </div>
                            <div class="positionItem-header color-black flex">
                                <div class="">{{item.positionAddr}}&nbsp;|&nbsp;{{ item.positionStatus }}</div>
                  
                            </div>
                            <div class="positionItem-header">
                                <span class="ss">
                                    {{ item.positionEducation }}
                                </span>
                            </div>
                            <div class="bottom flex">
                                <div>
                                    <img :src="item.companyLogoUrl" alt="">
                                </div>
                                <div>
                                    <div class="text-left">
                                        {{ item.companyName }}
                                      <br>{{item.companySize}}&nbsp;&nbsp;|&nbsp;&nbsp;{{ item.companyIndustry }}</div>
                                </div>
                            </div>
                         </div>
                </el-tab-pane>
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
    background-color: rgb(243, 243, 243);
}

.empty{
  height: 55vh;
}

.inter {
    padding: 0 20px;
    width:80%;
    background: #ffffff;
    margin: 0 auto;
    border-radius: 5px;
    .date_time {
        padding: 5px 0;
        color: #0b0a0a;
    }

    .title {
        &>h2 {
            padding: 5px 0;
            font-size: 1.7rem;
        }

        &>span {
            display: inline-block;
            padding: 5px 0;
            font-size: 12px;
            color: #606060;
        }
    }

    .icon-head_portrait {
        border: 10px solid #ccc;
        border-radius: 30px;
    }

    .icon-head_portrait,
    img {
        width: 45px;
        height: 45px;
    }

    .brief_introduction {
        padding: 10px 0;
        font-size: 12px;
        border-bottom: 1px solid #f3f3f3;
        color: #646464;
    }
}

.cord-box{
     border-bottom: 1px solid rgb(247, 247, 247);
     border-top: 5px solid rgb(247, 247, 247);
     .header{
      display: flex;
      justify-content: space-between;
      padding: 10px;
       .red-ft{
          color: red;
          font-weight: 600;
       }
     }
     .count{
      display: flex;
      justify-content: space-between;
      padding:0 10px;
      .count-gs{
         display: flex;
         align-items: center;
         gap: 0 5px;
         img{
            width: 40px;
            height:40px;
            align-items: center;
            gap: 0 10px;
         }
      }
      .d0-ft{
         color: #a5a5a5;
         font-size: 10px;
       }
     }
  }

.color-black{
    color: black;
}
.positionItem{
    padding: 15px;
    width: 460px;
    display: flex;
    flex-direction: column;
    gap: 10px 0;
    margin:  0 auto;
    background-color: #ffffff;
    border-radius: 5px;
}

.positionItem-header{
    display: flex;
}

.text-left{
   text-align: left;
}
.ss{
    padding: 2px;
    background-color: #efefef;
}

.flex-between{
    display: flex;
    justify-content: space-between;
}

.flex{
    display: flex;
   align-items: center;
   gap: 0 10px;
}

.mt-10{
    margin-top: 10px;
}

.bottom{
    img{
        width: 30px;
        height: 30px;
    }
}

.red-color {
    color: red;
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
            border-bottom: 5px solid rgb(247, 247, 247);

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
                padding: 5px 10px;

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

