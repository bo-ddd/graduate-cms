<template>
    <div class="login">
        <div class="form">
            <el-form :model="form" label-width="100px">
                <div class="form_title">登录</div>
                <div class="form_input">
                    <el-form-item label="USERNAME">
                        <el-input type="text" v-model="form.username" />
                    </el-form-item>
                    <el-form-item label="PASSWORD">
                        <el-input type="password" v-model="form.password" />
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
interface Form {
    username: string,
    password: string,
};
const form: Form = reactive({
    username: '',
    password: '',
});
const submit = function () {
    console.log(form);
};
</script>

<style scoped lang="scss">
:deep(.el-form) {
    padding: 18px 30PX;
    border: 1px solid var(--el-border-color);
    color: #409EFF;
    background-color: rgba(255, 255, 255, 0.4);
}
:deep(.el-form-item__label){
    color: #409EFF;
}
.login{
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/imanges/5.png');
    background-repeat: no-repeat;
    background-size:cover;
}
:deep(.el-input){
    background-color: red;
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
        margin-bottom: 18px;
    }

    .form_submit {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-button{
            width: 35%;
        }
    }
}
</style>