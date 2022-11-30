<script lang="ts" setup>
import { ChatRound } from '@element-plus/icons-vue'
import { ref,onMounted } from "vue";
import { useRouter,useRoute } from "vue-router";
let router = useRouter();
let route = useRoute();
let title = ref("用户管理");
onMounted(()=>{
    if(route.path == '/') router.push({path:'/userAdmin'})
});

/**
 * 菜单list
 */
let menuList = ref([
    {
        id: 1,
        title: "用户管理",
        icon: "location",
        url: '/userAdmin'
    }, {
        id: 2,
        title: "公司管理",
        icon: "icon-menu" ,
        url: '/corporateManagement'
    }, {
        id: 3,
        title: "会员管理",
        icon: "document",
        url: '/membershipManagement'
    }, {
        id: 4,
        title: "会员卡管理",
        icon: "setting",
        url: '/membershipCardManagement'
    }, {
        id: 5,
        title: "招聘会管理",
        icon: "setting",
        url: '/jobFairManagement'
    },
    {
        id: 6,
        title: "代理管理",
        icon: "setting",
        url: '/agentManagement'
    },
    {
        id: 7,
        title: "下拉框管理",
        icon: "<setting />",
        url: '/selectionBoxManagement'
    },
]);

/**
 * 跳转路由
 * @param url 路径
 */
let jump = (item:any) => {
    title.value = item.title;
    if(route.path ==item.url) return;
    router.push({ path:item.url });
}
</script>

<template>
    <div class="layout">
        <el-container>
            <el-header class="header flex-ja-center">{{title}}</el-header>
            <el-container>
                <el-aside width="180px">
                    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu" default-active="1"
                        text-color="#fff">
                        <el-menu-item v-for="item in menuList" :index="`${item.id}`" @click="jump(item)">
                            <el-icon>
                                <ChatRound />
                            </el-icon>
                            <span>{{ item.title }}</span>
                        </el-menu-item>

                    </el-menu>
                </el-aside>
                <el-main>
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="scss" scoped>
.layout {
    width: 100%;

    .header {
        border-bottom: 1px solid rgb(232, 232, 232);
        font-size: 20px;
        font-weight:600;
        height: 60px;
    }
    .el-menu {
        height: calc(100vh - 60px);
        width: 100%;
    }
}
</style>

