<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header>基础数据/数据字典</el-header>
        <el-container>
          <el-aside>
            <div>字典目录</div>
            <div>
                <el-button>增加同级</el-button>
                <el-button>增加下级</el-button>
                <el-button>禁用</el-button>
            </div>
          </el-aside>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.el-header{
    // padding: 0;
}
.el-aside{
    padding: 20px;
}
</style>