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
import { reactive } from 'vue';
import { ElMessage } from 'element-plus'

interface Form {
    username: string,
    password: string,
};
const form: Form = reactive({
    username: '',
    password: '',
});
interface MessageProps {
    message: string,
    type: "warning" | "success" | "info" | "error"
}
const formCheck = function (form: Form) {
    let res: MessageProps = {
        message: '',
        type: 'warning'
    }
    for (const key in form) {
        if (form[key as keyof typeof form].length < 6) {
            res.message = `${key}的长度不能小于6位数!`;
            return res;
        } else if (form[key as keyof typeof form] == '' || form[key as keyof typeof form] == undefined) {
            res.message = `${key}不能为空!`;
            return res;
        } else {
            res.type = 'success';
            res.message = '登录成功';
        }
    }
    return res;
}

const submit = function () {
    let res = formCheck(form);
    ElMessage({
        type: res.type,
        message: res.message
    })
    console.log(form);
};
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

.login {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/imanges/5.png');
    background-repeat: no-repeat;
    background-size: cover;
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