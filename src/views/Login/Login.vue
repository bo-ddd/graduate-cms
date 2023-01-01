<template>
    <div class="login">
        <div class="form flex-ja-center">
            <el-form :model="form" label-width="100px">
                <div class="form_title">{{ isLoginStillIs ? '登录' : "忘记密码" }}</div>
                <el-tabs v-if="isLoginStillIs" v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                    <el-tab-pane label="密码登录" name="密码登录">
                        <div class="form_box">
                            <div class="form_input">
                                <div class="mt-15">
                                    <el-input @input="iptchenge(form.psd)" @change="phoneIsok(form.psd)"
                                        v-model="form.psd.phone" placeholder="请输入用户名" maxlength="11" type="text" />
                                    <div v-show="isok" class="checkInfo">{{ phoneIsokValue }}</div>
                                </div>
                                <div class="mt-15">
                                    <el-input @input="psdchenge(form.psd)" @change="psdValueIsok(form.psd)"
                                        v-model="form.psd.password" placeholder="请输入密码" maxlength="20"
                                        type="password" />
                                    <div v-show="psdIsok" class="checkInfo">密码不能小于6位数</div>
                                </div>
                            </div>
                            <div class="nav mt-15">
                                <div class="cursor-p" style="text-align: center;" @click="navWjmm">忘记密码</div>
                            </div>
                            <div class="form_submit mt-15">
                                <el-button type="primary" @click="psdSubmit">登录</el-button>
                            </div>
                        </div>
                    </el-tab-pane>
                    <div>
                        <el-tab-pane label="验证码登录" name="验证码登录">
                            <div class="form_box">
                                <div class="form_input">
                                    <div class="mt-15">
                                        <el-input @input="iptchenge(form.yzm)" @change="phoneIsok(form.yzm)"
                                            v-model="form.yzm.phone" placeholder="请输入用户名" maxlength="11"
                                            minlength="11" />
                                        <div v-show="isok" class="checkInfo">{{ phoneIsokValue }}</div>
                                    </div>
                                    <div class="mt-15 just-center">
                                        <el-input v-model="form.yzm.smsCode" placeholder="请输入验证码" maxlength="6"
                                            type="password" />
                                        <!-- disabled -->
                                        <el-button class="bgc-button ml-10" @click="hqyzm"
                                            :disabled="isdisabled">{{ yzmButton }}</el-button>
                                    </div>
                                </div>
                                <div class="c-515a6e fs-12 mt-10">未注册的用户，登录成功后将自动注册为本招聘平台的企业用户。</div>
                                <div class="form_submit mt-15">
                                    <el-button type="primary" @click="yzmSubmit">登录</el-button>
                                </div>
                            </div>
                        </el-tab-pane>
                    </div>
                </el-tabs>
                <div v-else>
                    <el-tabs v-model="activeName2" class="demo-tabs" @tab-click="handleClick2">
                        <el-tab-pane label="手机号验证" name="手机号验证">
                            <div class="form_box">
                                <div class="form_input">
                                    <div class="mt-15">
                                        <el-input @input="iptchenge(form.psd)" @change="phoneIsok(form.psd)"
                                            v-model="form.psd.phone" placeholder="请输入用户名" maxlength="11"
                                            minlength="11" />
                                        <div v-show="isok" class="checkInfo">{{ phoneIsokValue }}</div>
                                    </div>
                                    <div class="mt-15 just-center">
                                        <!-- iptchenge2 判断验证码输入够4位数就隐藏校验提示   phoneIsok2 判断是否少于4位数 是否大于6位数  不对就提示-->
                                        <el-input @input="iptchenge2(setpswd)" @change="phoneIsok2(setpswd)"
                                            v-model="setpswd" placeholder="请输入验证码" maxlength="6" minlength='4'
                                            type="password" />
                                        <el-button class="bgc-button ml-10" @click="hqyzm"
                                            :disabled="isdisabled">{{ yzmButton }}</el-button>
                                    </div>
                                </div>
                                <div class="form_submit mt-15">
                                    <el-button type="primary" @click="yzmok">确定</el-button>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="重置密码" name="重置密码">
                            <div class="form_box">
                                <div class="form_input">
                                    <div class="mt-15">
                                        <el-input @input="iptchenge(form.psd)" @change="phoneIsok(form.psd)"
                                            v-model="form.psd.password" placeholder="请输入密码" maxlength="6"
                                            minlength="20" />
                                        <div v-show="isok" class="checkInfo">{{ phoneIsokValue }}</div>
                                    </div>
                                    <div class="mt-15 just-center">
                                        <el-input @change="ispswd(isokpswd)" v-model="isokpswd" placeholder="确认密码"
                                            maxlength="6" minlength="20" />
                                        <div v-show="isoswdok" class="checkInfo">{{ pswdok }}</div>
                                        <!-- pswdok 二次密码不对提示 -->
                                    </div>
                                </div>
                                <div class="form_submit mt-15">
                                    <el-button type="primary" @click="setPassword">修改</el-button>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入
import { ref } from 'vue'
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import type { Form, psdLoginType, yzmLoginType } from '@/type/UserLogin';
import type MessageProps from '@/type/ElMessage';
import type { TabsPaneContext } from 'element-plus'
import { useLoginStores } from '@/stores/login'


// 声明变量
// 路由
const router = useRouter();
// 接口
const use = useLoginStores();
// // 登录的form表单绑定的参数
const psdForm = reactive({}) as psdLoginType;
// // 验证码登录的数据
const yzmForm = reactive({}) as yzmLoginType;
// 总  form 
const form = reactive({
    psd: psdForm,
    yzm: yzmForm,
}) as Form;
// isLoginStillIs 是判断是登录还是修改密码 默认是登录
const isLoginStillIs = ref(true);
const isdisabled = ref(true);
const isok = ref(false);
const psdIsok = ref(false);
const phoneIsokValue = ref('');
const num = ref(30);
const yzmButton = ref('获取验证码');

const activeName = ref('密码登录');
const activeName2 = ref('手机号验证');
// 确认密码的值
const isokpswd = ref('');
// 确认密码不对 的话 校验提示打开与否
const isoswdok = ref(false);
// pswdok 确认密码不对的提示
const pswdok = ref('');
// 修改密码的验证码绑定的 setpswd
const setpswd = ref('');




function navWjmm() {
    isLoginStillIs.value = false;
}

function phoneIsok(form: psdLoginType | yzmLoginType) {
    if (form.phone.length < 11) {
        isok.value = true;
        phoneIsokValue.value = '用户名不能小于11位数！'
    } else if (form.phone.length == 11) {
        isok.value = false;
    }
}
function iptchenge(form: psdLoginType | yzmLoginType) {
    if (num.value == 30) {
        if (form.phone.length == 11) {
            isdisabled.value = false;
        }
    } else {
        isdisabled.value = true;
    }
}

function psdValueIsok(form: psdLoginType) {
    if (form.password.length < 6) {
        psdIsok.value = true;
    } else {
        psdIsok.value = false;
    }
}
function psdchenge(form: psdLoginType) {
    if (form.password.length == 6) {
        psdIsok.value = false;
    }
}
function iptchenge2(data: any) {
    if (data.length >= 4) {
        isoswdok.value = false;
    }
}
function phoneIsok2(data: any) {
    if (data.length < 4) {
        isoswdok.value = true;
        phoneIsokValue.value = '请输入正确的验证码！'
    }
}
function ispswd(data: any) {
    if (data.length == 4) {
        isoswdok.value = false;
        if (form.psd.password != data) {
            isoswdok.value = true;
            pswdok.value = '二次输入密码不正确！'
        }
    }
}

// 方法
// 标签页点击事件
const handleClick = (tab: TabsPaneContext, event: Event) => {
    isok.value = false;
}
// 获取验证码
const hqyzm = () => {
    isdisabled.value = true;
    yzmButton.value = `请在30秒后重新获取`;
    let timer = setInterval(() => {
        num.value--;
        yzmButton.value = `请在${num.value}秒后重新获取`;
        if (num.value == 0) {
            clearInterval(timer)
            isdisabled.value = false;
            yzmButton.value = `获取验证码`;
        }
    }, 1000)
}

// psdFormCheck 密码登录的校验
const psdFormCheck = function (form: psdLoginType) {
    let res: MessageProps = {
        message: '',
        type: 'warning'
    };
    if (form.phone == '' || form.phone == undefined) {
        res.message = `手机号不能为空!`;
        return res;
    } else if (form.phone.length < 6 || form.phone.length > 20) {
        res.message = `手机号不能少于6位且不能大于20位!`;
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
// yzmFormCheck 验证码登录的校验
const yzmFormCheck = function (form: yzmLoginType) {
    let res: MessageProps = {
        message: '',
        type: 'warning'
    };
    if (form.phone == '' || form.phone == undefined) {
        res.message = `手机号不能为空!`;
        return res;
    } else if (form.phone.length < 11 || form.phone.length > 11) {
        res.message = `手机号不能少于11位!`;
        return res;
    } else if (form.smsCode == "" || form.smsCode == undefined) {
        res.type = 'warning';
        res.message = `验证码不能为空!`;
        return res;
    } else if (form.smsCode.length < 4 || form.smsCode.length > 6) {
        res.message = `验证码不能少于4位且不能大于6位!`;
        return res;
    } else {
        res.type = 'success';
        res.message = '登录成功';
    };
    return res;
}

// psdSubmit 点击密码登录按钮的方法
const psdSubmit = function () {
    let res = psdFormCheck(form.psd as psdLoginType);
    if (res.type == 'success') {
        form.psd.loginType = 0;
        login(form.psd);
    } else {
        ElMessage.warning(res.message)
    }
};
const yzmSubmit = function () {
    let res = yzmFormCheck(form.yzm as yzmLoginType);
    if (res.type == 'success') {
        console.log(form.yzm);
        form.yzm.loginType = 1;
        login(form.yzm);
    } else {
        ElMessage.warning(res.message)
    }
};
// 修改密码第一步确定按钮的方法
const yzmok = function () {
    if (form.psd.phone.length == 11) {
        if (setpswd.value.length == 4 || setpswd.value.length == 6) {
            activeName2.value = '重置密码';
        }
    }
};

const handleClick2 = (tab: TabsPaneContext, event: Event) => {
    isok.value = false;
}


// 登录的方法
async function login(params: psdLoginType | yzmLoginType) {
    const res = await use.login(params);
    if (res.data) {
        sessionStorage.setItem('token', res.data);
        let num = 1;
        ElMessage.success('登录成功！');
        let timer = setInterval(() => {
            num--;
            if (num == 0) {
                clearInterval(timer)
                nav('/userAdmin');
            }
        }, 1000)
    } else {
        ElMessage.warning(res.msg)
    }
}
// 修改面模的方法
async function setPassword() {
    const res = await use.login({
        loginType: 3,
        phone: form.psd.phone,
        password: form.psd.password,
    });
    if (res.data) {
        console.log(res.data);
    }
}

// 跳转页面的方法
const nav = (name: string) => {
    router.push(name);
}
</script>

<style scoped lang="scss">
:deep(.el-tabs__nav) {
    float: none;
    display: flex;
    justify-content: space-around;
}

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

.checkInfo {
    font-size: 12px;
    color: rgba(255, 0, 0, 0.8);
    margin: 5px 10px;
}

.login {
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/images/login-bgd.png');
    background-repeat: no-repeat;
    background-size: cover;
}

.ml-10 {
    margin-left: 10px;
}

.form {
    width: 100vw;
    height: 100vh;

    .form_title {
        text-align: center;
        font-size: 20px;
    }

    .form_box {
        width: 300px;

        .form_input {
            .label {
                width: 80px;
                text-align: justify;
                text-justify: distribute-all-lines; // 这行必加，兼容ie浏览器
                text-align-last: justify;
            }
        }

        .bgc-button {
            background-color: rgba(255, 255, 255, 0.342);
        }
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