<template>
    <div class="login">
        <div class="form flex-ja-center">
            <el-form :model="form" label-width="100px">
                <div class="form_title">登录</div>
                <div class="form_input">
                    <div class="mt-15 flex-ja-center">
                        <span class="mr-10">USERNAME</span>
                        <el-input v-model="form.username" placeholder="请输入用户名" maxlength="20" type="text" />
                    </div>
                    <div class="mt-15 flex-ja-center">
                        <span class="mr-10">USERNAME</span>
                        <el-input v-model="form.password" placeholder="请输入密码" maxlength="20" type="password" />
                    </div>
                </div>

                <div class="nav mt-15 flex">
                    <div class="cursor-p">忘记密码</div>
                    <div class="cursor-p" @click="nav('/register')">注册</div>
                </div>

                <div class="form_submit mt-15">
                    <el-button type="primary" @click="submit">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import type UserLogin from '@/type/UserLogin';
import type MessageProps from '@/type/ElMessage';

// 声明变量
let router = useRouter();

// 登录的form表单绑定的参数
const form = reactive({}) as UserLogin;

// 方法
// formCheck 校验方法
const formCheck = function (form: UserLogin) {
    let res: MessageProps = {
        message: '',
        type: 'warning'
    };
    if (form.username == '' || form.username == undefined) {
        res.message = `用户名不能为空!`;
        return res;
    } else if (form.username.length < 6 || form.username.length > 20) {
        res.message = `用户名不能少于6位且不能大于20位!`;
        return res;
    } else if (form.password == "" || form.password == undefined) {
        res.type = 'warning';
        res.message = `密码不能为空!`;
        return res;
    } else if (form.password.length < 6 || form.password.length > 20) {
        res.message = `密码不能少于6位且不能大于20位!`;
        return res;
    } else {
        res.type = 'success';
        res.message = '登录成功';
    };
    return res;
}

// submit 点击登录按钮的方法
const submit = function () {
    let res = formCheck(form);
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
    padding: 30px;
    color: #0080ff;
    background-color: rgba(255, 255, 255, .6);
    border-radius: 5px;
    box-shadow: 0px 0px 100px 0PX rgb(255, 255, 255);
}

:deep(.el-form-item__label) {
    color: #0080ff;
}

:deep(.el-input__wrapper.is-focus) {
    box-shadow: none;
}

:deep(.el-input) {
    --el-input-hover-border-color: none;
}

:deep(.el-input__inner) {
    color: #409EFF;
}

:deep(.el-input__inner::placeholder) {
    color: #409EFF;
}

:deep(.el-input__wrapper) {
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
    // cursor: default;
    border-radius: 0;
    background-color: rgba(0, 0, 0, 0);
    padding: 0 10px;
    border-bottom: 1px solid #409EFF;
}

:deep(.el-form-item label) {
    font-size: 14px;
}

.login {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/images/login-bgd.png');
    background-repeat: no-repeat;
    background-size: cover;
}

.form {
    width: 100vw;
    height: 100vh;
    .form_title {
        text-align: center;
        font-size: 20px;
    }

    .nav {
        width: 100%;
        font-size: 12px;
        justify-content: space-between;
    }

    .form_submit {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .el-button {
            width: 100%;
            height: 35px;
            border-radius: 8px !important;
            padding: 0;
        }
    }
}
</style>