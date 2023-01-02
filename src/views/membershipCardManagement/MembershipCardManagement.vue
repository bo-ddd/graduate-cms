<template>
  <div class="user">
    <div class="header">
      <div>
        <h4>查询条件:</h4>
      </div>
      <div>会员卡名称</div>
      <div>
         <el-input v-model="input" placeholder="输入会员名称" />
      </div>
      <div>
        <el-button class="find-btn" type="primary" @click="search">查询</el-button>
      </div>
    </div>
    <el-table :data="memberCardData" border>
      <el-table-column prop="vipLevel" fixed label="序号" width="100" align="center" />
      <el-table-column prop="vipName" fixed label="会员卡名称" width="100" align="center" />
      <el-table-column prop="vipPrice" label="价格" width="100" align="center" />
      <el-table-column prop="vipDiscountPrice" label="折扣价格" width="100" align="center" />
      <el-table-column prop="positionCount" label="1个月同时职位" width="100" align="center" />
      <el-table-column prop="refreshPositionCount" label="1个月刷新点数" width="100" align="center" />
      <el-table-column prop="invitationTalentCount" label="1个月邀请学生点数" width="100" align="center" />
      <el-table-column prop="refreshPositionCardCount" label="1个月自动刷新卡" width="100" align="center" />
      <el-table-column prop="positionCount3" label="3个月同时职位" width="100" align="center" />
      <el-table-column prop="refreshPositionCount3" label="3个月刷新点数" width="100" align="center" />
      <el-table-column prop="invitationTalentCount3" label="3个月邀请学生点数" width="100" align="center" />
      <el-table-column prop="refreshPositionCardCount3" label="3个月自动刷新卡" width="100" align="center" />
      <el-table-column prop="positionCount6" label="6个月同时职位" width="100" align="center" />
      <el-table-column prop="refreshPositionCount6" label="6个月刷新点数" width="100" align="center" />
      <el-table-column prop="invitationTalentCount6" label="6个月邀请学生点数" width="100" align="center" />
      <el-table-column prop="refreshPositionCardCount6" label="6个月自动刷新卡" width="100" align="center" />
      <el-table-column prop="positionCount12" label="12个月同时职位" width="100" align="center" />
      <el-table-column prop="refreshPositionCount12" label="12个月刷新点数" width="100" align="center" />
      <el-table-column prop="invitationTalentCount12" label="12个月邀请学生点数" width="100" align="center" />
      <el-table-column prop="refreshPositionCardCount12" label="12个月自动刷新卡" width="100" align="center" />
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { useMemberCard } from "@/stores/memberCard";
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import type{ Ref } from "vue";
const use = useMemberCard();
let input=ref('')
let memberCardData = ref([]) as Ref<object[]>;
const getMemberCard = async (val:string|void) => {
  let res = await use.getMemberCardList({
    vipName:val
  });
  if (res.code == 200) {
    console.log(res);
    let data=res.data;
    data.forEach((e:any) => {
      if(!e.vipDiscountPrice){
        e.vipDiscountPrice="无"
      }
    });
    memberCardData.value=data
  }
};
let search=()=>{
  getMemberCard(input.value);
}
onMounted(() => {
  getMemberCard();
});
</script>

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

