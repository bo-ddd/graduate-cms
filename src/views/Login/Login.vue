<template>
    <div class="login">
        <div class="form">
            <el-form :model="form" label-width="100px">
                <div class="form_title">登录</div>
                <div class="form_input">
                    <el-form-item label="USERNAME">
                        <el-input v-model="form.username" placeholder="请输入用户名" maxlength="15" type="text" />
                    </el-form-item>
                    <el-form-item label="PASSWORD">
                        <el-input v-model="form.password" placeholder="请输入密码" maxlength="15" type="password" />
                    </el-form-item>
                </div>

                <div class="form_submit">
                    <el-button type="primary" @click="submit">登录</el-button>
                    <el-button>注册</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入
import { reactive } from 'vue';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
import type UserInfo from '@/type/UserInfo'

// 声明变量
let router = useRouter();

// 登录的form表单绑定的参数
const form = reactive({
    // username: '',
    // password: '',
}) as UserInfo;

// MessageProps 是提示信息的数据的类型
interface MessageProps {
    message: string,
    type: "warning" | "success" | "info" | "error"
}

// 方法
// formCheck 校验方法
const formCheck = function (form: UserInfo) {
    let res: MessageProps = {
        message: '',
        type: 'warning'
    }
    if (form.username == '' || form.username == undefined || form.username.length < 6 || form.username.length > 10) {
        res.type = 'warning';
        res.message = `用户名有问题!`;
        return res;
    } else if (form.password == "" || form.password == undefined || form.password.length < 6 || form.password.length > 10) { 
        res.type = 'warning';
        res.message = `密码有问题!`;
        return res;
    }
    return res;
}

// submit 点击登录按钮的方法
const submit = function () {
    let res = formCheck(form);
    console.log('---------res--------------')
    console.log(res)
    ElMessage({
        type: res.type,
        message: res.message
    })
    if (res.type == 'success') {
        console.log(form);
        nav('/userAdmin');
    }
};

// 跳转页面的方法
const nav = (name: string) => {
    router.push(name);
}
</script>

<style scoped lang="scss">
:deep(.el-form) {
    padding: 30px 50PX;
    border: 1px solid var(--el-border-color);
    color: #409EFF;
    background-color: rgba(255, 255, 255, .6);
    border-radius: 5px;
    box-shadow: 0px 0px 100px 0PX rgb(157, 155, 155);
}

:deep(.el-form-item__label) {
    color: #409EFF;
}

:deep(.el-input__wrapper.is-focus) {
    box-shadow: none;
}

:deep(.el-input) {
    --el-input-hover-border-color: none;
}

:deep(.el-input__inner) {
    color: #409EFF !important;
    outline: none !important;
    border: none;
}

:deep(.el-input__wrapper) {
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
    cursor: default;
    border-radius: 0;
    background-color: rgba(0, 0, 0, 0);
    padding: 0 10px;
    border-bottom: 1px solid #409EFF;

    .el-input__inner {
        cursor: default !important;
    }
}

:deep(.el-form-item label) {
    font-size: 14px;
}

.login {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/imanges/5.png');
    background-repeat: no-repeat;
    background-size: cover;
}

.form {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .form_title {
        text-align: center;
        font-size: 20px;
        margin-bottom: 25px;
    }

    .form_submit {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .el-button {
            width: 35%;
        }
    }
}
</style>