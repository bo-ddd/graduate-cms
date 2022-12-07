<template>
    <div class="register flex-ja-center">
        <div class="form">
            <div class="title flex-ja-center">
                <div class="title_text">用户注册</div>
            </div>
            <div class="flex mt-40">
                <div class="label">用户名称：</div>
                <el-input class="w-300" v-model="form.username" placeholder="请输入用户名" />
            </div>

            <div class="flex mt-20">
                <div class="label">用户密码：</div>
                <el-input class="w-300" v-model="form.password" placeholder="请输入密码" />
            </div>

            <div class="flex mt-20">
                <div class="label">手机号：</div>
                <el-input class="w-300" v-model="form.phone" placeholder="请输入手机号" />
            </div>

            <div class="flex mt-20">
                <div class="label">二维码：</div>
                <el-button @click="(isQrCode = true)">生成二维码</el-button>
            </div>

            <div v-if="isQrCode" class="qr-code mt-20 flex-ja-center">
                <img src="@/assets/imanges/u21.png" alt="">
            </div>

            <div class="flex-space-around mt-20">
                <el-button class="el_button">取消</el-button>
                <el-button @click="submit" class="el_button" type="primary">注册</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入
import { reactive, ref } from 'vue';
import type UserRegister from '@/type/UserRegister'

// 登录的form表单绑定的参数
const form = reactive({}) as UserRegister;
// isQrCode 是控制二维码这个表情是否创建的
let isQrCode = ref(false);

// submit 方法 点注册按钮执行
const submit = function () {
    console.log(form);
}
</script>

<style scoped lang="scss">
:deep(.el-input__wrapper) {
    box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;
    cursor: default;
    border-radius: 0;
    background-color: rgba(188, 60, 60, 0);
    padding: 0 10px;
    border-bottom: 1px solid #409EFF;
}

:deep(.el-input__inner::placeholder) {
    color: #409EFF;
}

.w-300 {
    width: 300px !important;
}

.border-box {
    box-sizing: border-box;
}

.border-bottom {
    border-bottom: 1px solid #409EFF;
}

.register {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/imanges/55.png');
    background-repeat: no-repeat;
    background-size: cover;

    .form {
        padding: 30px;
        width: 400px;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0 0 100px 100px rgba(255, 255, 255, 0.8);
        color: #409EFF;

        .title {
            width: 100%;
            font-size: 22px;

            .title_text {
                width: 100px;
                text-align-last: justify;
            }
        }

        .label {
            width: 100px;
            text-align-last: justify;
            cursor: default !important;
        }

        .qr-code {
            width: 100%;
        }

        .qr-code img {
            width: 180px;
            height: 180px;
        }

        .flex-space-around {
            display: flex;
            justify-content: space-around;
        }

        .el_button {
            width: 46%;
            margin: 0;
            background-color: rgba(255, 255, 255, 0);
            border: 1px solid #409EFF;
            color: var(--el-color);
        }

        .el_button:hover {
            border: 0;
            color: #fff;
            background-color: #409EFF;
        }

        .el_button:active {
            color: rgba(255, 255, 255, 0.8);
        }
    }
}
</style>