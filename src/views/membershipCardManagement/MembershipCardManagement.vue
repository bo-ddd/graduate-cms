<template>
  <div class="user">
    <div class="header">
      <div>
        <h4>查询条件:</h4>
      </div>
      <div>会员卡名称</div>
      <div>
        <el-select class="m-2" placeholder="输入会员卡名称" size="large">
          <el-option v-for="item in 5" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <div>
        <el-button class="find-btn" type="primary">查询</el-button>
      </div>
    </div>

    <el-table :data="tableData" style="width: 100%" border align="center">
      <el-table-column fixed prop="date" label="序号" width="100" align="center" />
      <el-table-column fixed prop="name" label="会员卡名称" width="100" align="center" />
      <el-table-column prop="address" label="价格" width="100" align="center" />
      <el-table-column prop="address" label="折扣价格" width="100" align="center" />
      <el-table-column prop="address" label="1个月同时职位" width="100" align="center" />
      <el-table-column prop="address" label="1个月刷新点数" width="100" align="center" />
      <el-table-column prop="address" label="1个月邀请学生点数" width="100" align="center" />
      <el-table-column prop="address" label="1个月自动刷新卡" width="100" align="center" />
      <el-table-column prop="address" label="3个月同时职位" width="100" align="center" />
      <el-table-column prop="address" label="3个月刷新点数" width="100" align="center" />
      <el-table-column prop="address" label="3个月邀请学生点数" width="100" align="center" />
      <el-table-column prop="address" label="3个月自动刷新卡" width="100" align="center" />
      <el-table-column prop="address" label="6个月同时职位" width="100" align="center" />
      <el-table-column prop="address" label="6个月刷新点数" width="100" align="center" />
      <el-table-column prop="address" label="6个月邀请学生点数" width="100" align="center" />
      <el-table-column prop="address" label="6个月自动刷新卡" width="100" align="center" />
      <el-table-column prop="address" label="12个月同时职位" width="100" align="center" />
      <el-table-column prop="address" label="12个月刷新点数" width="100" align="center" />
      <el-table-column prop="address" label="12个月邀请学生点数" width="100" align="center" />
      <el-table-column prop="address" label="12个月自动刷新卡" width="100" align="center" />
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import { useMemberCard } from "@/stores/memberCard";
import { onMounted } from "@vue/runtime-core";
const use = useMemberCard();
const getMemberCard = async () => {
  let res = await use.getMemberCardList({ token: "token", vipName: "dsa" });
  if (res.code == 200) {
    console.log(res);
  }
};
onMounted(() => {
  getMemberCard();
});
const tableData = [
  {
    date: "0",
    name: "非会员",
    address: "666",
  },
  {
    date: "1",
    name: "银卡会员",
    address: "666",
  },
  {
    date: "2",
    name: "金卡会员",
    address: "666",
  },
  {
    date: "3",
    name: "钻石卡会员",
    address: "666",
  },
];
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

