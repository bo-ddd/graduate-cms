<script lang="ts" setup>
import { useCompany } from "@/stores/company";
import type { CompanyDetail, TabledateItem } from "@/type/Company";
import type { Industry, Nature } from "@/type/CorporateManagement";
import type { Res } from "@/type/Res";
import { ref,reactive,watch } from "vue";
import type { Ref } from "vue";
import type { Company, CompanyList } from "@/type/Zapi";
import type{School,UserInfo,HSRes,Check,Form,InvitationForm} from "@/type/InvitePerson";
import {useInvitation} from "@/stores/inviationPositon";
import cityJson from "@/assets/json/city.json";
import { useMemberCard } from "@/stores/memberCard";

/***
 *
 * 简历管理
 *
 */
import candidateMain from "@/components/resumeAdmin/candidateMain.vue";
import interviewMain from "@/components/resumeAdmin/interviewMain.vue";
import inappropriate from "@/components/resumeAdmin/inappropriate.vue";
let activeName = ref("first");

const companyStore = useCompany();
// 企业名称
let companyFullName: Ref<string> = ref("");
// 企业简称
let companyName: Ref<string> = ref("");
// 注册地区
let companyAddr: Ref<string> = ref("");
// 企业性质
let nature: Ref<Nature[]> = ref([]);
let natureValue: Ref<string> = ref("");
const getCompanyNatureList = async () => {
  const res: Res = await companyStore.getCompanyNature({});
  if (res.code == 200) {
    nature.value = nature.value.concat(res.data);
  }
};
getCompanyNatureList();

// 企业规模
let companySize: Ref<Nature[]> = ref([]);
let companySizeValue: Ref<string> = ref("");
const getCompanySizeList = async () => {
  const res: Res = await companyStore.getCompanySize({});
  if (res.code == 200) {
    companySize.value = companySize.value.concat(res.data);
  }
};
getCompanySizeList();

// 企业标签
let companyTag: Ref<Nature[]> = ref([]);
let companyTagValue: Ref<string> = ref("");
const getCompanyTagList = async () => {
  const res: Res = await companyStore.getCompanyTag({});
  if (res.code == 200) {
    companyTag.value = companyTag.value.concat(res.data);
  }
};
getCompanyTagList();
// 所属行业
let companyIndustry: Ref<Industry[]> = ref([]);
let companyIndustryValue: Ref<string> = ref("");
const getCompanyIndustryList = async () => {
  const res: Res = await companyStore.getCompanyIndustry({});
  if (res.code == 200) {
    companyIndustry.value = companyIndustry.value.concat(res.data);
  }
};
getCompanyIndustryList();

// 表格
let tableData = ref();
const getSelectCompanyList = async (params: CompanyList) => {
  const res: Res = await companyStore.getSelectCompany(params);
  console.log(res);
  if (res.code == 200) {
    tableData.value = res.data.data;
    tableData.value.forEach((item: TabledateItem, index: number) => {
      let key: keyof any;
      for (key in item) {
        if (key == "vipLevel") {
          if (item[key] == 1) {
            item[key] = "普通会员";
          } else if (item[key] == 2) {
            item[key] = "白银会员";
          }
        }
      }
      Object.assign(item, { index: index + 1 });
    });
    console.log(tableData.value);
  }
};
getSelectCompanyList({
  // companyAddr: '',
  // companyFullName: '',
  // companyIndustryLeft: 0,
  // companyIndustryRight: 0,
  // companyName: '',
  // companyNature: 0,
  // companySize: 0,
  // companyTag: 0,
  pageIndex: 1,
  pageSize: 10,
  token: "",
});

// 查询
const query = () => {
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
    token: "",
  });
};

//简历管理
let resume = ref(false);
let companyId = ref();
const isShowResume = function (id: number) {
  companyId.value = id;
  console.log(companyId.value);

  resume.value = true;
};
//发布职位
let usePosition = useMemberCard();
let position = ref(false);
const recruitNum = ref(0);
const positionList:any = ref([]);
const downPositionList:any = ref([]);
const downNum = ref(0);
const currentIndex = ref(0);
const pageNum = ref(1);
const pageSize = ref(10);
const pageNum2 = ref(1);
const pageSize2 = ref(10);
const companyPositionId: any = ref(null);
const isShowPosition = function (companyId: number) {
  position.value = true;
  companyPositionId.value=companyId;
  getPositionInfo();
};
const tab = function (num: number) {
  currentIndex.value = num;
};

//获取在招分页页面的数据
let getPositionInfo = () => {
  getPositionList();
  getDownList();
};
let getPositionList = async function () {
  let res = await usePosition.getPosition({
    pageIndex: pageNum.value,
    pageSize: pageSize.value,
    positionStatus: 1,
    companyId:companyPositionId.value,
  });
  if (res.code == 200) {
    positionList.value = res.data ? res.data.data : [];
    recruitNum.value = res.data ? res.data.maxCount : 0;
  }
};
//获取下线分页数据
const getDownList = async function () {
  let res = await usePosition.getPosition({
    pageIndex: pageNum2.value,
    pageSize: pageSize2.value,
    positionStatus: 2,
    companyId:companyPositionId.value,
  });
  if (res.code == 200) {
    downNum.value = res.data ? res.data.maxCount : 0;
    downPositionList.value = res.data ? res.data.data : [];
  }
};

//在招分页：
const handleCurrentChange = async (val: number) => {
  pageNum.value = val;
  getPositionList();
};
//下线分页：
const handleCurrentChange2 = async (val: number) => {
  pageNum2.value = val;
  getDownList();
};
//邀请人才
let personnel = ref(false);
const isShowPersonnel = function () {
  personnel.value = true;
};
//企业详情
let details = ref(false);
let companyDetail = ref({}) as Ref<CompanyDetail>;
const getCompanyCommon = async (params: Company) => {
  let res: Res = await companyStore.getCompanyCommon(params);
  if (res.code == 200) {
    companyDetail.value = res.data;
  }
  console.log(companyDetail.value);
};
const isShowDetails = function (id: number) {
  details.value = true;
  getCompanyCommon({
    companyId: id,
  });
};


// 我是邀请人才页面的js开始
//邀请人员后一个页面的分页
let PersonStore = useInvitation();
let industry = ref();
let form: Form = reactive({
    sex: null,//性别
    education: null,//学历
    professional: null,//专业
    city: '',//城市
    wishMoneyLeft: null,//最低薪资
    wishMoneyRight: null,//最高薪资
});//这个是人才列表模糊查询
let pagingInvite = reactive({
    total: 100,
    pageSize: 3,
    pageIndex: 1,
})
let invitationForm:InvitationForm = reactive<{
    status: any;
    positionId: any;
}>({
    status: null,
    positionId: null,
});
let inviationNumber = ref(0);//这个是当日邀请次数
let paging = reactive({
    total: 0,
    pageSize: 3,
    pageIndex: 1,
});//邀请人员分页
let showGuid = ref(false);//展示导航
let circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
let checkItem = ref(0);//默认展示哪个页面
//切换页面
const handleItemChange = (index: number) => {
    checkItem.value = index;
}
//清空选择的方法
const cancelCheck = () => {
    let key: keyof Form;
    for (key in form) {
        form[key] = null;
    }
}
let educationArr = reactive<Check[]>([]);//学历的列表
let majorArr = reactive<any[]>([]);//专业的列表
let sexArr = reactive<any[]>([]);//性别的列表
let positionArr = reactive<any[]>([]);//职位列表
let wishMoneyLeftList = reactive<any[]>([]);//这个是期望薪资左边的列表
let wishMoneyRightList = reactive<any[]>([]);//这个是期望薪资右边的列表
let talentList = reactive<any[]>([]);//这个是人才列表
let positionCategoryList = reactive<any[]>([]);//这个是获取职位类别的数组
let invitationList = reactive<any[]>([]);//这个是邀请人才的列表
let statusList = reactive<any[]>([]);//邀请人才状态

//这个是学历的列表
const getEducationList = async () => {
    const res: Res | any = await PersonStore.getEducationList();
    if (res.code !== 200) return;
    let resData = (res.data).reverse();//获取学历数据
    educationArr.push(...resData);
}
getEducationList();//调用获取学历列表
//这个是获取专业列表的方法
const getProfessionalList = async () => {
    const res: Res | any = await PersonStore.getProfessionaList({});
    if (res.code !== 200) return;
    majorArr.length = 0;
    majorArr.push(...(res.data));
}
getProfessionalList();//调用获取专业列表
//这个是获取性别列表的方法
const getSexList = async () => {
    const res: Res | any = await PersonStore.getSexList();
    if (res.code !== 200) return;
    sexArr.push(...(res.data));
}
getSexList();
//这个是获取职位列表的方法
const getMyPositionList = async () => {
    const res: Res | any = await PersonStore.getPositionList();
    positionArr.push(...(res.data))
}
getMyPositionList();

//获取期望薪资的接口
const getWishMoneyList = async () => {
    const res: Res | any = await PersonStore.getWishMoneyList();
    wishMoneyLeftList.push(...(res.data).wishMoenyLeftList);
    wishMoneyRightList.push(...(res.data).wishMoenyRightList);
}
getWishMoneyList();
//获取邀请人才列表
const inviteTalentList = async () => {
    let obj: any = {};
    let key:keyof InvitationForm;
    for (key in invitationForm) {
       if(invitationForm[key]){
            obj[key] = invitationForm[key];
       }
    }
    obj['pageIndex'] = pagingInvite.pageIndex;
    obj['pageSize'] = pagingInvite.pageSize;
    const res: HSRes | any = await PersonStore.selectInviteList(obj);
    if (res.code !== 200) return;
    invitationList.length = 0;
    invitationList.push(...(res.data.data));
    pagingInvite.total = res.data.totalCount;
}
inviteTalentList();
//确定邀请人才列表
const getInvitaion = ()=>{
    pagingInvite.pageIndex = 1;
    pagingInvite.pageSize = 3;
    inviteTalentList();
}
const getTalentList = async () => {
    let obj: any = {};
    let key: keyof Form;
    for (key in form) {
        if (form[key]) {
            obj[key] = form[key];
        }
    }
    if (industry.value) {
        obj['industryLeft'] = industry.value[0];
        obj['industryRight'] = industry.value[1];
    }
    if(obj['city']){
        obj['city'] = obj['city'][1];
    }
    obj['pageIndex'] = paging.pageIndex;
    obj['pageSize'] = paging.pageSize;
    const res: HSRes | any = await PersonStore.getTalentList(obj);
    if (res.code != 200) return;
    talentList.length = 0;
    talentList.push(...(res.data).data);
    paging.total = res.data.maxCount;
}
getTalentList();
const getTalent = ()=>{
    paging.pageIndex = 1;
    paging.pageSize = 3;
    getTalentList();
}
watch(paging, () => {
    //监听页数更改直接调用获取人才列表的接口
    getTalentList();
})
watch(pagingInvite,()=>{
    inviteTalentList();
})
const getMoney: (data: string) => string = (data: string) => {
    if (!data) return '';
    const res = data.split(",").sort((a: any, b: any) => { return a - b });
    return `${res[0].substring(0,res[0].length-3)}-${res[1].substring(0,res[1].length-3)}k`
}
// 我是邀请人才页面的js结束
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
          <el-select
            class="m-2 input-width"
            v-model="natureValue"
            placeholder="请选择企业性质"
            size="large"
          >
            <el-option
              v-for="item, index in nature"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>企业规模</div>
        <div>
          <el-select
            class="m-2 input-width"
            v-model="companySizeValue"
            placeholder="请选择企业规模"
            size="large"
          >
            <el-option
              v-for="item, index in companySize"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>企业标签</div>
        <div>
          <el-select
            class="m-2 input-width"
            v-model="companyTagValue"
            placeholder="请选择企业标签"
            size="large"
          >
            <el-option
              v-for="item, index in companyTag"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div>所属行业</div>
        <div>
          <el-select
            class="m-2 input-width"
            v-model="companyIndustryValue"
            placeholder="请选择所属行业"
            size="large"
          >
            <el-option
              v-for="item, index in companyIndustry"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
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
          <el-button type="danger" @click="isShowResume(scope.row.companyId)" text class="btn-xq">详情</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="companyIndustry" label="所属行业" align="center" />
      <el-table-column label="发布职位" align="center">
        <template #default="scope">
          <!-- {{ scope.row.index }} -->
          <el-button
            type="danger"
            @click="isShowPosition(scope.row.companyId)"
            text
            class="btn-xq"
          >详情</el-button>
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
          <el-button
            type="danger"
            @click="isShowDetails(scope.row.companyId)"
            text
            class="btn-xq"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 简历管理 -->
    <el-dialog v-model="resume" class="overf" destroy-on-close width="80%" align-center>
      <div class="resume">
        <div class="header">
          <el-tabs class="demo-tabs" v-model="activeName" :stretch="true">
            <el-tab-pane label="候选人" name="first"></el-tab-pane>
            <el-tab-pane label="面试管理" name="second"></el-tab-pane>
            <el-tab-pane label="不合适" name="third"></el-tab-pane>
          </el-tabs>
        </div>

        <candidateMain :companyId="companyId" v-if="activeName == 'first'"></candidateMain>
        <interviewMain :companyId="companyId" v-if="activeName == 'second'"></interviewMain>
        <inappropriate :companyId="companyId" v-if="activeName == 'third'"></inappropriate>
      </div>
    </el-dialog>

    <!-- 发布职位 -->
    <el-dialog v-model="position" class="position-dialog" width="80%" align-center>
      <div class="position">
        <div class="position-page">
          <div class="position-header flex-ja-center" ref="tab-box">
            <div
              class="head-nav flex-ja-center cur-po"
              :class="currentIndex== 0?'active':''"
              @click="tab(0)"
            >
              <div class="nav-title">
                <span>在招中</span>
                <span class="fs-12 num">{{recruitNum}}</span>
              </div>
              <div class="bottom-line"></div>
            </div>
            <div
              class="head-nav flex-ja-center cur-po"
              :class="currentIndex== 1?'active':''"
              @click="tab(1)"
            >
              <div class="nav-title">
                <span>已下线</span>
                <span class="fs-12 num">{{downNum}}</span>
              </div>
              <div class="bottom-line"></div>
            </div>
          </div>
          <div class="position-content">
            <div class="tab1" v-show="currentIndex== 0">
              <div class="void-box void-title flex-ja-center" v-show="recruitNum==0">
                <div class>
                  <img src="@/assets/images/img-no_position.png" />
                  <div class="mt-15">暂无在招职位</div>
                </div>
              </div>
              <div class="job plr-20" v-show="recruitNum!=0">
                <div class="job-head just-between">
                </div>
                <div class="job-box mb-15" v-for="item in positionList" :key="item.positionId">
                  <div class="info-job just-between">
                    <div class="job-title fs-18">
                      <div class="mb-15 align-center">
                        <span>{{item.positionName}}</span>
                        <span v-if="item.positionStatus2==0" class="tip-span">审核中</span>
                        <span v-if="item.positionStatus2==2" class="tip-span warning">审核未通过</span>
                      </div>
                      <div class="info-list align-center">
                        <div v-if="item.positionNature==0" class="money-num mr-15">{{item.positionMoney.split(',')[0].slice(0,1)+'-'+item.positionMoney.split(',')[1].slice(0,1)}}K</div>
                        <div v-else class="money-num mr-15">{{item.positionMonth.split(',').join('-')}}</div>
                        <div class="align-center fs-14">
                          <div>{{item.positionNature==0?'全职':'实习'}}</div>
                          <div class="bor"></div>
                          <div>大专</div>
                          <div class="bor"></div>
                          <div>{{item.positionAddr.split(',')[0]}}</div>
                          <div class="bor"></div>
                          <div>{{item.positionType}}</div>
                        </div>
                      </div>
                    </div>
                    <div class="resume-info flex-ja-center">
                      <div class="resume-box cur-po">
                        <div class="resume-num">{{item.newResumeCount}}</div>
                        <div class="mt-10 fs-14">新简历</div>
                      </div>
                      <div class="resume-box cur-po">
                        <div class="resume-num">{{item.resumeCount}}</div>
                        <div class="mt-10 fs-14">总简历</div>
                      </div>
                    </div>
                  </div>
                  <div class="edit-job just-between fs-14">
                    <div v-if="item.refreshTime">
                      刷新时间 :
                      <span>&nbsp; {{item.refreshTime}}</span>
                    </div>
                    <div v-else>
                      创建时间 :
                      <span>&nbsp; {{item.createTime}}</span>
                    </div>
                  </div>
                </div>
                <div class="just-center mt-20 mb-20" v-if="recruitNum>10">
                  <el-pagination
                    :background="true"
                    v-model:currentPage="pageNum"
                    v-model:page-size="pageSize"
                    layout="prev, pager, next"
                    :total="recruitNum"
                    @current-change="handleCurrentChange"
                  />
                </div>
              </div>
            </div>
            <div class="tab2" v-show="currentIndex==1">
              <div class="void-box void-title flex-ja-center" v-show="downNum==0">
                <div class>
                  <img src="@/assets/images/img-no_position.png" />
                  <div class="mt-15">暂无已下线职位</div>
                </div>
              </div>
              <div class="void-box" v-show="downNum!=0">
                <div class="pb-30 plr-20">
                  <div class="job-head2 just-between">
                    <div></div>
                  </div>
                  <div class="job-box" v-for="item in downPositionList" :key="item.userId">
                    <div class="info-job just-between">
                      <div class="job-title fs-18">
                        <div class="mb-15 align-center">
                          <span>{{item.positionName}}</span>
                          <span v-if="item.positionStatus2==0" class="tip-span">审核中</span>
                          <span v-if="item.positionStatus2==2" class="tip-span warning">审核未通过</span>
                        </div>
                        <div class="info-list align-center">
                          <div v-if="item.positionNature==0" class="money-num mr-15">{{item.positionMoney.split(',')[0].slice(0,1)+'-'+item.positionMoney.split(',')[1].slice(0,1)}}K</div>
                          <div v-else class="money-num mr-15">{{item.positionMonth.split(',').join('-')}}</div>
                          <div class="align-center fs-14">
                            <div>{{item.positionNature==0?'全职':'实习'}}</div>
                            <div class="bor"></div>
                            <div>大专</div>
                            <div class="bor"></div>
                            <div>{{item.positionAddr.split(',')[0]}}</div>
                            <div class="bor"></div>
                            <div>{{item.positionType}}</div>
                          </div>
                        </div>
                      </div>
                      <div class="resume-info flex-ja-center">
                        <div class="resume-box cur-po">
                          <div class="resume-num">{{item.newResumeCount}}</div>
                          <div class="mt-10 fs-14">新简历</div>
                        </div>
                        <div class="resume-box cur-po">
                          <div class="resume-num">{{item.resumeCount}}</div>
                          <div class="mt-10 fs-14">总简历</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="just-center mt-20" v-if="downNum>10">
                    <el-pagination
                      :background="true"
                      v-model:currentPage="pageNum2"
                      v-model:page-size="pageSize2"
                      layout="prev, pager, next"
                      :total="downNum"
                      @current-change="handleCurrentChange2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 邀请人才 -->
    <el-dialog v-model="personnel" width="80%" align-center>
      <div class="personnel">
        <div class="operation-wrap box-shadow">
            <div class="wrap operation-container fs-18">
                <div class="operation-item" @click="handleItemChange(0)">
                    <p :class="[checkItem == 0 ? 'span-check' : '']">人才库</p>
                    <div :class="[checkItem == 0 ? 'btm-check' : '']"></div>
                </div>
                <div class="operation-item" @click="handleItemChange(1), inviteTalentList()">
                    <p :class="[checkItem == 1 ? 'span-check' : '']">我邀请的</p>
                    <div :class="[checkItem == 1 ? 'btm-check' : '']"></div>
                </div>
            </div>
        </div>

        <!-- 人才数据的页面 -->
        <div class="talent-pool-wrap" v-show="checkItem == 0">

            <!-- 模糊查询的列表 -->
            <div class="wrap filter-wrap">
                <div class="filter-wrap-top">
                    <el-select v-model="form.sex" class="m-2 check-sex mr-30" placeholder="性别选择" size="large">
                        <el-option v-for="item in sexArr" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-select v-model="form.education" class="m-2 check-education mr-30" placeholder="最高学历选择"
                        size="large">
                        <el-option v-for="item in educationArr" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                    <el-select v-model="form.professional" class="m-2 check-education mr-30" placeholder="专业选择"
                        size="large">
                        <el-option v-for="item in majorArr" :key="item.sortId" :label="item.professionalName"
                            :value="item.sortId" />
                    </el-select>
                    <el-cascader v-model="industry" placeholder="意向职位"
                        :props="{ 'children': 'positionDownList', 'label': 'positionTypeName', 'value': 'positionTypeId' }"
                        class="check-education mr-30" :options="positionCategoryList" clearable />
                </div>
                <div class="filter-wrap-btm">
                    <div class="check">
                        <el-cascader v-model="form.city" class="mr-30 check-education m-2" placeholder="意向城市选择"
                            :options="cityJson" :props="{ 'label': 'name', 'value': 'name' }" clearable />
                        <el-select v-model="form.wishMoneyLeft" class="m-2 check-salary mr-15" placeholder="期望薪资选择"
                            size="large">
                            <el-option v-for="item in wishMoneyLeftList" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                        <span class="fs-14">至</span>
                        <el-select v-model="form.wishMoneyRight" class="m-2 check-salary ml-15" placeholder="期望薪资选择"
                            size="large">
                            <el-option v-for="item in wishMoneyRightList" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <div class="operation">
                        <el-button type="primary" plain @click="getTalent()">确定</el-button>
                        <el-button type="info" plain @click="cancelCheck()">清空</el-button>
                    </div>
                </div>
            </div>

            <!-- 查询数据内容 -->
            <div class="wrap data-wrap">
                <div class="search-tip-wrap">
                    <span class="fs-14">邀请点数</span>
                    <span class="fs-16 ml-5 cl-blue">{{ inviationNumber }}</span>
                    <span class="fs-12 ml-15 cl-ccc">若当日点数用尽，次日凌晨会自动补充新点数</span>
                </div>

                <!-- 每一项数据 -->
                <div class="data-item" v-for="item in talentList" :key="item.id">

                    <!--头像-->
                    <div class="cbleft1">
                        <el-avatar :size="72" :src="item.userLogoUrl ? item.userLogoUrl : circleUrl" />
                    </div>

                    <!-- 人名与最高学历 -->
                    <div class="cbleft2 ml-16">
                        <p class="name fs-18">{{ item.userName }}</p>
                        <div class="description mt-16 cl-ccc">
                            <p class="fs-12">{{ item.userAge }}岁</p>
                            <div class="line"></div>
                            <p class="fs-12">{{ item.userEducation }}</p>
                        </div>
                    </div>

                    <!-- 教育经历 -->
                    <div class="cbleft3 ml-48 cl-ccc">
                        <p class="titlest fs-12 ml-16">教育经历</p>
                        <template v-for="child in item.userEducationList" :key="child.userId">
                            <div class="school-name">
                                <div class="coursor"></div>
                                <p class="fs-14 ml-12">{{ child.school }}</p>
                            </div>
                            <div class="school-description fs-12 ml-16">
                                <p>{{ child.professional }}</p>
                                <div class="line"></div>
                                <p>{{ child.education }}</p>
                            </div>
                        </template>
                    </div>

                    <!-- 求职意向 -->
                    <div class="cbleft4 cl-ccc ml-40">
                        <p class="titlest fs-12 ml-28">求职意向</p>
                        <div class="occupation-item mt-16">
                            <img src="@/assets/images/icon-dingwei.png" class="icon">
                            <p class="description fs-14 ml-12">{{item.wishAddr ? item.wishAddr : '无'}}</p>
                        </div>
                        <div class="occupation-item mt-12">
                            <img src="@/assets/images/icon-bangong.png" class="icon">
                            <p class="description fs-14 ml-12">{{ item.wishPosition ? item.wishPosition :
                                    '无'
                            }}</p>
                        </div>
                        <div class="occupation-item mt-16">
                            <img src="@/assets/images/icon-qianbi.png" class="icon">
                            <p class="description fs-14 ml-12">{{ item.wishMoney ? getMoney(item.wishMoney) : '3-50k' }}
                            </p>
                        </div>
                    </div>

                    <!-- 活跃时间 -->
                    <div class="cbleft5">
                        <p class="titlest fs-12 cl-ccc">{{ item.lastLoginTime }}活跃</p>
                    </div>
                </div>
            </div>

            <!-- 分页 -->
            <div class="page-wrap wrap mt-48">
                <div class="page-content">
                    <el-pagination v-model:current-page="paging.pageIndex" :background="true" :pager-count="7"
                        v-model:page-size="paging.pageSize" layout="prev, pager, next" :total="paging.total" />
                </div>
            </div>
        </div>

        <!-- 我邀请的页面 -->
        <div class="invitation-library-wrap" v-show="checkItem == 1">
            <div class="container wrap" v-show="!invitationList.length">
                <!-- 如果没人邀请显示的页面 -->
                <div class="nolist">
                    <p class="fs-16 top">暂无学生投递</p>
                    <p class="fs-16">快去人才库中邀请自己心仪的学生吧</p>
                </div>
                <!-- 邀请人才的列表 -->
            </div>
            <div class="invitation wrap" v-show="invitationList.length">
                <!-- 邀请的选择容器 -->
                <div class="filter-wrap">
                    <el-select v-model="invitationForm.status" clearable class="m-2 check-sex mr-30" placeholder="状态选择"
                        size="large">
                        <el-option v-for="item in statusList" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                    <el-select v-model="invitationForm.positionId" clearable class="m-2 check-position mr-30"
                        placeholder="意向职位选择" size="large">
                        <el-option v-for="item in positionArr" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                    <el-button type="primary" class="btn" @click="getInvitaion">确定</el-button>
                </div>

                <!--邀请的列表-->
                <div class="list">
                    <div class="item" v-for="item in invitationList" :key="item.id">
                        <div class="top">
                            <div class="left">
                                <p>投递职位</p>
                                <div class="line"></div>
                                <p>{{item.positionName}}</p>
                            </div>
                            <div class="right">
                                <p>发送时间</p>
                                <div class="line"></div>
                                <p>{{item.createTime}}</p>
                            </div>
                        </div>
                        <div class="btm">

                            <!--头像-->
                            <div class="cbleft1">
                                <el-avatar :size="72" :src="circleUrl" />
                            </div>

                            <!-- 人名与最高学历 -->
                            <div class="cbleft2 ml-16">
                                <p class="name fs-18">{{ item.userName }}</p>
                                <div class="description mt-16 cl-ccc">
                                    <p class="fs-12">{{ item.userAge }}岁</p>
                                    <div class="line"></div>
                                    <p class="fs-12">{{ item.userEducation }}</p>
                                </div>
                            </div>

                            <!-- 教育经历 -->
                            <div class="cbleft3 ml-48 cl-ccc">
                                <p class="titlest fs-12 ml-16">教育经历</p>
                                <template v-for="child in item.userEducationList" :key="child.userId">
                                    <div class="school-name">
                                        <div class="coursor"></div>
                                        <p class="fs-14 ml-12">{{ child.school }}</p>
                                    </div>
                                    <div class="school-description fs-12 ml-16">
                                        <p>{{ child.professional }}</p>
                                        <div class="line"></div>
                                        <p>{{ child.education }}</p>
                                    </div>
                                </template>
                            </div>

                            <!-- 求职意向 -->
                            <div class="cbleft4 cl-ccc ml-40">
                                <p class="titlest fs-12 ml-28">求职意向</p>
                                <div class="occupation-item mt-16">
                                    <img src="@/assets/images/icon-dingwei.png" class="icon">
                                    <p class="description fs-14 ml-12">{{ item.wishAddr ? item.wishAddr : '无' }}</p>
                                </div>
                                <div class="occupation-item mt-12">
                                    <img src="@/assets/images/icon-bangong.png" class="icon">
                                    <p class="description fs-14 ml-12">{{  item.wishPosition ? item.wishPosition : '无' }}</p>
                                </div>
                                <div class="occupation-item mt-16">
                                    <img src="@/assets/images/icon-qianbi.png" class="icon">
                                    <p class="description fs-14 ml-12">{{item.wishMoney ? getMoney(item.wishMoney) : '无' }}</p>
                                </div>
                            </div>

                            <!-- 活跃时间 -->
                            <div class="cbleft5">
                                <p class="mt-40 fs-18">{{ item.inviteStatus }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 分页 -->
                <div class="page-wrap wrap mt-48">
                    <div class="page-content">
                        <el-pagination v-model:current-page="pagingInvite.pageIndex" :background="true" :pager-count="7"
                            v-model:page-size="pagingInvite.pageSize" layout="prev, pager, next"
                            :total="pagingInvite.total" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </el-dialog>
    <!-- 企业详情 -->
    <el-dialog v-model="details" width="30%" align-center title="企业详情">
      <div class="align-center company-detail mt-20">
        <p class="label">企业全称 ：</p>
        {{ companyDetail.companyFullName }}
      </div>
      <div class="align-center company-detail mt-20">
        <p class="label">品牌名 ：</p>
        {{ companyDetail.companyName }}
      </div>
      <div class="align-center company-detail mt-20">
        <p class="label">注册详细地址 ：</p>
        {{ companyDetail.companyRegisterAddr }}
      </div>
      <div class="align-center company-detail mt-20">
        <p class="label">所属行业 ：</p>
        {{ companyDetail.companyIndustry }}
      </div>
      <div class="align-center company-detail mt-20">
        <p class="label">企业规模 ：</p>
        {{ companyDetail.companySize }}
      </div>
      <div class="align-center company-detail mt-20">
        <p class="label">社会信用代码 ：</p>
        {{ companyDetail.companySocialCreditCode }}
      </div>
      <div class="align-center company-detail mt-20">
        <p class="label">联系人 ：</p>
        {{ companyDetail.companyContactName }}
      </div>
      <div class="align-center company-detail mt-20">
        <p class="label">联系方式 ：</p>
        {{ companyDetail.companyContactPhone }}
      </div>
      <div class="align-center company-detail mt-20">
        <p class="label">接收简历邮箱 ：</p>
        {{ companyDetail.companyContactEmail }}
      </div>
      <div class="align-center company-detail mt-20">
        <p class="label">企业简介 ：</p>
        <a class="company-introducation" :title="companyDetail.companyIntroducation">
          {{
          companyDetail.companyIntroducation
          }}
        </a>
      </div>
      <div class="align-center company-detail mt-20">
        <p class="label">企业官网 ：</p>
        {{ companyDetail.companyWebUrl }}
      </div>
      <div class="align-center company-detail mt-20">
        <p class="label">会员等级 ：</p>
        {{ companyDetail.vipLevel }}
      </div>
    </el-dialog>

    <el-pagination
      class="mt-10"
      :page-sizes="[100, 200, 300, 400]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    />
  </div>
</template>

<style lang="scss" scoped>
///简历管理

.resume {
  min-height: calc(100vh - 200px);
  background: #f6f7f9;
  .header {
    border-bottom: 1px solid rgb(238, 238, 238);
    height: 60px;
    box-shadow: 0px 0px 8px rgb(221, 221, 221);
    background: white;
    .demo-tabs {
      margin-left: 50%;
      transform: translate(-50%, 0);
      width: 500px;
    }
  }
}
:deep(.el-table thead) {
  height: 60px;
}

:deep(.candidate-header_bottom > .el-button) {
  border: none;
  color: #808695;
  background: white;
}

:deep(.el-checkbox) {
  margin-right: 0px;
}

:deep(.el-checkbox.el-checkbox--small) {
  height: 33px;
}

:deep(.el-tabs__active-bar) {
  width: 60px !important;
  left: 40px !important;
}

:deep(.el-tabs__active-bar) {
  width: 60px !important;
  left: 40px !important;
}

:deep(.el-tabs__item) {
  font-size: 17px;
  font-weight: 600;
}

:deep(.el-tabs__nav) {
  height: 62px;
  align-items: center;
  width: 50px;
}

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

  & > .label {
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
  padding: 0 !important;
  overflow: auto;
  height: 680px !important;
}
//职位列表
.position-dialog {
}
.position-page {
  .position-header {
    height: 55px;
    position: relative;

    box-shadow: 0px 3px 5px #e9e9e9;
    .head-nav {
      width: 290px;
      height: 100%;
      box-sizing: border-box;
      position: relative;
      .nav-title {
        position: relative;
        .num {
          position: absolute;
          left: 58px;
          min-width: 25px;
        }
      }
    }
    .active {
      font-weight: 700;
    }
    .active .bottom-line {
      position: absolute;
      width: 55px;
      height: 3px;
      background-color: #356ffa;
      bottom: 0;
      left: 42%;
      border-radius: 10px;
    }
  }
  .position-content {
    overflow: hidden;
    width: 100%;
    background-color: #f6f7f9;
    
      .void-box {
        min-height: calc(100vh - 55px);

        text-align: center;
        img {
          width: 240px;
          height: 210px;
        }
      }
      .void-title {
        color: #515a6e;
      }
      .job-head2 {
        margin: 35px 0;
        .release-btn {
          gap: 10px;
          font-size: 16px;
          padding: 4px 20px;
          background-color: #356ffa;
          color: white;
          border-radius: 2px;
        }
      }
    .tab2 {
      background-color: white;
      overflow: hidden;
      color: black;
      .info-job {
        padding: 25px 0 !important;
      }
      .bor {
        height: 9px;
        border-left: 2px solid rgb(197, 200, 206);
        margin: 0 6px;
      }

      .refresh-info {
        font-size: 14px;
        .cur-po {
          color: #515a6e;
        }
        .cur-po:hover {
          color: #356ffa;
        }
      }
    }
    .job {
      box-sizing: border-box;
      overflow: hidden;
      min-height: calc(100vh - 55px);
      padding-bottom: 120px;
    }
    .job-head {
      .point-num {
        color: #356ffa;
      }
      .release-btn {
        gap: 10px;
        font-size: 16px;
        padding: 4px 20px;
        background-color: #356ffa;
        color: white;
        border-radius: 2px;
      }
      color: #515a6e;
      margin: 35px 0;
    }
    .job-box {
      background-color: #fff;
      .info-job {
        padding: 30px 25px;
        border-bottom: 2px solid #f6f7f9;
        .job-title {
          width: 400px;
          .tip-span {
            // min-width: 50px;
            // height: 20px;
            box-sizing: border-box;
            border-radius: 2px;
            border: 1px solid #445e9b;
            margin-left: 12px;
            font-size: 12px;
            font-family: MicrosoftYaHei;
            color: #445e9b;
            line-height: 18px;
            text-align: center;
            padding: 0 4px;
          }
          .warning {
            color: #ed4112;
            border: 1px solid #ed4112;
          }
        }
        .info-list {
          color: rgb(81, 90, 110);

          .bor {
            height: 9px;
            border-left: 2px solid rgb(197, 200, 206);
            margin: 0 10px;
          }
        }
        .resume-info {
          color: #515a6e;
          .resume-box {
            padding: 0 35px;
          }
          .resume-box:hover {
            .resume-num {
              color: #356ffa;
            }
          }
          .resume-num {
            text-align: center;
          }
        }
        .money-num {
          color: #f75736;
        }

        .refresh-info {
          gap: 0 12px;
          :deep(.el-button) {
            font-size: 16px;
            box-sizing: border-box;
            padding: 17px 15px;
          }
          :deep(.el-button + .el-button) {
            margin-left: 0;
            padding: 17px 20px;
          }
          .autorefresh-btn {
            box-sizing: border-box;
            padding: 7px 12px;
            border: 1px solid #356ffa;
            color: #356ffa;
            border-radius: 4px;
            transition: all 0.3s;
          }
          .autorefresh-btn:hover {
            background-color: #356ffa;
            color: white;
          }
          .refresh-btn {
            padding: 7px 15px;
            color: white;
            border: 1px solid #356ffa;
            border-radius: 4px;
            background-color: #356ffa;
          }
        }
      }
      .edit-job {
        color: #515a6e;
        padding: 18px 25px;
        .cur-po:hover {
          color: #356ffa;
        }
        .bor {
          height: 10px;
          border-left: 2px solid rgb(197, 200, 206);
          margin: 0 16px;
        }
      }
    }
  }
}
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  /* Webkit内核兼容CSS选择器样式 放到这里 */
  .btn-xq {
    color: #f56c6c !important;
  }
}
// 这个是邀请人才的样式
.personnel {
    position: relative;
    & .vip{
        & .btn{
            margin-top: 20px;
            text-align: center;
            padding: 10px 0;
            background:linear-gradient(128deg,#fee8cd,#e2ae7e);
        }
        & .btn:hover{
            cursor: pointer;
        }
    }
    &>.operation-wrap {
        background: #fff;
        &>.operation-container {
            display: flex;
            justify-content: center;
            &>.operation-item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                &>p {
                    width: 220px;
                    text-align: center;
                    padding: 8px 16px;
                }
                &>.span-check {
                    font-weight: 800;
                }
                &>.btm-check {
                    display: inline-block;
                    border-radius: 2px;
                    width: 51px;
                    height: 3px;
                    background: #356ffa;
                }
            }
            &>.operation-item:hover {
                cursor: pointer;
            }
        }
    }

    // 这个是咨询
    &>.consulting-service {
        position: relative;
        text-align: center;
        &>.top {
            padding: 12px 12px 0;
            box-shadow: 2px 3px 0 rgb(215 214 214 / 50%);
            &>.or-code {
                width: 88px;
            }
            &>.tip {
                width: 72px;
                margin: 0 auto;
                padding-top: 5px;
                padding-bottom: 12px;
                line-height: 16px;
                text-align: center;
            }
        }
        &>img:hover {
            cursor: pointer;
        }
    }
    //这个是弹出咨询
    &>.seek-advice {
        padding: 10px 10px 6px;
        &>img {
            width: 38px;
        }
    }
    &>.seek-advice:hover {
        cursor: pointer;
    }

    .absolute-wrap {
        position: absolute;
        right: 20px;
        top: 90px;
        z-index: 2;
    }

    &>.talent-pool-wrap {
        &>.filter-wrap {
            padding: 32px 0;
            border-bottom: 1px solid #eef0f2;
            :deep(.check-sex) {
                width: 110px;
            }
            :deep(.check-salary) {
                width: 150px;
            }
            :deep(.el-input__inner) {
                height: 40px;
            }

            &>.filter-wrap-btm {
                margin-top: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }

        &>.data-wrap {
            padding: 24px 0;

            &>.data-item {
                padding: 32px 0 32px;
                display: flex;
                border-bottom: 1px solid #eef0f2;

                &>.cbleft2 {
                    width: 124px;

                    &>.description {
                        display: flex;
                        align-items: center;
                    }
                }

                &>.cbleft3 {
                    width: 280px;

                    &>.school-name {
                        display: flex;
                        align-items: center;

                        &>.coursor {
                            width: 4px;
                            height: 4px;
                            border-radius: 2px;
                            background: #c5c8ce;
                        }

                        &>p {
                            padding: 12px 0;
                        }
                    }

                    &>.school-description {
                        display: flex;
                        align-items: center;
                    }
                }

                &>.cbleft4 {
                    width: 420px;

                    &>.occupation-item {
                        display: flex;
                    }
                }

                &>.cbleft5 {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
            }
        }

        &>.page-wrap {
            &>.page-content {
                display: flex;
                justify-content: center;
                padding-bottom: 64px;
            }
        }
    }

    &>.invitation-library-wrap {
        background-color: #f6f7f9;
        min-height: calc(100vh - 150px);

        &>.container {
            height: calc(100vh - 260px);
            display: flex;
            justify-content: center;
            align-items: center;

            &>.nolist {
                text-align: center;

                &>img {
                    width: 243px;
                }

                &>p {
                    color: #515a6e;
                }

                &>.top {
                    margin: 12px 0 16px;
                }
            }
        }

        &>.invitation {
            &>.filter-wrap {
                padding: 35px 0;

                :deep(.btn) {
                    padding: 18px 26px;
                }
            }

            &>.page-wrap {
                &>.page-content {
                    display: flex;
                    justify-content: center;
                    padding-bottom: 64px;
                }
            }

            &>.list {
                &>.item {
                    background: #ffff;
                    padding: 0 22px;

                    &>.top {
                        display: flex;
                        justify-content: space-between;
                        padding: 22px 0;

                        &>.left,
                        &>.right {
                            display: flex;
                            align-items: center;
                        }
                    }

                    &>.btm {
                        padding: 32px 0;
                        display: flex;

                        &>.cbleft2 {
                            width: 124px;

                            &>.description {
                                display: flex;
                                align-items: center;
                            }
                        }

                        &>.cbleft3 {
                            width: 280px;

                            &>.school-name {
                                display: flex;
                                align-items: center;

                                &>.coursor {
                                    width: 4px;
                                    height: 4px;
                                    border-radius: 2px;
                                    background: #c5c8ce;
                                }

                                &>p {
                                    padding: 12px 0;
                                }
                            }

                            &>.school-description {
                                display: flex;
                                align-items: center;
                            }
                        }

                        &>.cbleft4 {
                            width: 420px;

                            &>.occupation-item {
                                display: flex;
                            }
                        }

                        &>.cbleft5 {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }
                    }
                }
            }
        }
    }

    .dialog {
        :deep(& > .el-dialog__body) {
            padding: 40px;
        }
        & .msg-wrap {
            padding: 20px;
            background: #f9f9f9;
            &>.top,
            &>.btm {
                display: flex;
                align-items: center;
            }
            &>.btm {
                padding: 10px 0;
            }
            &>.top {
                &>.btn {
                    padding: 5px;
                    background: #e5ebf9;
                }
            }
        }

        & .post-tips {
            padding: 14px 0;
        }

        & .invitation-method {
            padding: 20px 0;
        }
        & .invitation {
            display: flex;
            padding: 10px 0;
            align-items: center;
        }
    }
    .ml-30 {
        margin-left: 30px;
    }

    .cl-blue {
        color: #356ffa;
    }

    .cl-ccc {
        color: #808695;
    }

    .ml-16 {
        margin-left: 16px;
    }

    .mt-16 {
        margin-top: 16px;
    }

    .mt-17 {
        margin-top: 17px;
    }

    .ml-48 {
        margin-left: 48px;
    }

    .ml-12 {
        margin-left: 12px;
    }

    .line {
        display: inline-block;
        height: 10px;
        width: 1px;
        margin: 0 8px;
        background: #000;
    }

    .ml-40 {
        margin-left: 40px;
    }

    .icon {
        width: 18px;
        height: 18px;
    }
    .fs-26 {
        font-size: 26px;
    }

    .ml-28 {
        margin-left: 28px;
    }

    .mt-12 {
        margin-top: 12px;
    }

    .fs-12 {
        font-size: 12px;
    }

    .mt-48 {
        margin-top: 48px;
    }

    .fw-700 {
        font-weight: 700;
    }

    .mt-50 {
        margin-top: 50px;
    }

    .cl-black {
        color: #000;
    }
    .icon-31{
        width: 31px;
    }
}
</style>

