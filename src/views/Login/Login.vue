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
                                    <el-input @input="yhminput(form.psd.phone)" @change="yhmchange(form.psd.phone)"
                                        v-model="form.psd.phone" placeholder="请输入用户名" maxlength="11" type="text" />
                                    <div v-show="yhmCheck" class="checkInfo">{{ yhmCheckVal }}</div>
                                </div>
                                <div class="mt-15">
                                    <el-input @input="pswdinput" @change="pswdchange" v-model="form.psd.password"
                                        placeholder="请输入密码" maxlength="20" type="password" />
                                    <div v-show="pswdCheck" class="checkInfo">{{ pswdCheckVal }}</div>
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
                                        <el-input @input="yhminput(form.yzm.phone)" @change="yhmchange(form.yzm.phone)"
                                            v-model="form.yzm.phone" placeholder="请输入用户名" maxlength="11"
                                            minlength="11" />
                                        <div v-show="yhmCheck" class="checkInfo">{{ yhmCheckVal }}</div>
                                    </div>
                                    <div class="mt-15">
                                        <div class="just-center">
                                            <el-input @input="yzminput(form.yzm.smsCode)"
                                                @change="yzmchange(form.yzm.smsCode)" v-model="form.yzm.smsCode"
                                                placeholder="请输入验证码" maxlength="6" type="text" />
                                            <el-button class="bgc-button ml-10" @click="hqyzm"
                                                :disabled="isdisabled">{{ yzmButton }}</el-button>
                                        </div>
                                        <div v-show="yzmCheck" class="checkInfo">{{ yzmCheckVal }}</div>
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
                    <div class="form_box">
                        <div class="form_input">
                            <div class="mt-15">
                                <el-input @input="yhminput(form.setpswd.phone)" @change="yhmchange(form.setpswd.phone)"
                                    v-model="form.setpswd.phone" placeholder="请输入用户名" maxlength="11" minlength="11" />
                                <div v-show="yhmCheck" class="checkInfo">{{ yhmCheckVal }}</div>
                            </div>
                            <div class="mt-15">
                                <div class="just-center">
                                    <el-input @input="yzminput(form.setpswd.smsCode)"
                                        @change="yzmchange(form.setpswd.smsCode)" v-model="form.setpswd.smsCode"
                                        placeholder="请输入验证码" maxlength="6" type="text" />
                                    <el-button class="bgc-button ml-10" @click="hqyzm2"
                                        :disabled="isdisabled">{{ yzmButton }}</el-button>
                                </div>
                                <div v-show="yzmCheck" class="checkInfo">{{ yzmCheckVal }}</div>
                            </div>
                            <div class="mt-15">
                                <el-input @input="pswdinput(form.setpswd.password)"
                                    @change="pswdchange(form.setpswd.password)" v-model="form.setpswd.password"
                                    placeholder="请输入密码" maxlength="20" minlength="6" />
                                <div v-show="pswdCheck" class="checkInfo">{{ pswdCheckVal }}</div>
                            </div>
                        </div>
                        <div class="form_submit mt-15">
                            <el-button type="primary" @click="yzmok">确定</el-button>
                        </div>
                    </div>
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
import type { Form, psdLoginType, yzmLoginType, setPsdType } from '@/type/UserLogin';
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
// 修改密码页面form表单的数据
const setPswdForm = reactive({}) as setPsdType;
// 总  form 
const form = reactive({
    psd: psdForm,
    yzm: yzmForm,
    setpswd: setPswdForm,
}) as Form;
// isLoginStillIs 是判断是登录还是修改密码 默认是登录
const isLoginStillIs = ref(true);
// isdisabled 是判断是否禁用 button按钮的
const isdisabled = ref(true);
// num 是获取验证码按钮的倒计时
const num = ref(30);
const yzmButton = ref('获取验证码');
const activeName = ref('密码登录');
// yhmCheck 判断用户名校验提示的打开与关闭的
const yhmCheck = ref(false);
// yhmCheckVal 用户名校验提示信息
const yhmCheckVal = ref('');
// pswdCheck 判断密码校验提示的打开与关闭的
const pswdCheck = ref(false);
// pswdCheckVal 密码校验提示信息
const pswdCheckVal = ref('');
// yzmCheck 校验验证码提示信息是否展示的
const yzmCheck = ref(false);
// yzmCheckVal 校验验证码提示信息的
const yzmCheckVal = ref('');

// 获取验证码接口
async function getSendSms(params: any) {
    // type=0 修改密码   type=1 登录
    const res: any = await use.sendSms({
        iphone: params.phone,
        smsType: params.type
    })
}
// 密码登录页面的 忘记密码按钮事件
function navWjmm() {
    form.yzm.phone = '';
    form.yzm.smsCode = '';
    isLoginStillIs.value = false;
    removeFome()
};
// 实时验证用户名长度
function yhminput(data: any) {
    if (data.length == 11) {
        yhmCheck.value = false;
        yhmCheckVal.value = '';
        isdisabled.value = false;
    } else if (data.length < 11) {
        isdisabled.value = true;
    }
};
// 失去焦点验证用户名长度
function yhmchange(data: any) {
    if (data.length < 11) {
        yhmCheck.value = true;
        yhmCheckVal.value = '用户名不能小于11位！';
    }
};
// 实时验证密码长度
function pswdinput(data: any) {
    if (data.length == 6) {
        pswdCheck.value = false;
        pswdCheckVal.value = '';
    }
};
// 失去焦点验证密码长度
function pswdchange(data: any) {
    if (data.length < 6) {
        pswdCheck.value = true;
        pswdCheckVal.value = '密码不能小于6位！';
    }
};
// 实时验证验证码长度
function yzminput(data: any) {
    if (data.length == 4) {
        yzmCheck.value = false;
        yzmCheckVal.value = '';
    }
};
// 失去焦点验证验证码长度
function yzmchange(data: any) {
    if (data.length < 4) {
        yzmCheck.value = true;
        yzmCheckVal.value = '密码不能小于4位！';
    }
};
// 标签页点击事件
const handleClick = (tab: TabsPaneContext, event: Event) => {
    if (activeName.value == '验证码登录' || activeName.value == '密码登录') {
        yhmCheck.value = false;
        yhmCheckVal.value = '';
        pswdCheck.value = false;
        pswdCheckVal.value = '';
        yzmCheck.value = false;
        yzmCheckVal.value = '';
    }
};
// 获取验证码
function hqyzm() {
    num.value = 30;
    // 获取验证码按钮是否禁用的
    isdisabled.value = true;
    let params = {
        type: 1,
        phone: form.yzm.phone
    }
    // 获取验证码的接口
    getSendSms(params)
    // 获取验证码的接口完成
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
};
// 修改密码的获取验证码
function hqyzm2() {
    num.value = 30;
    // 获取验证码按钮是否禁用的
    isdisabled.value = true;
    let params = {
        type: 1,
        phone: form.setpswd.phone
    }
    // 获取验证码的接口
    getSendSms(params)
    // 获取验证码的接口完成
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
};
// psdFormCheck 密码登录的校验
const psdFormCheck = function (form: psdLoginType) {
    let res: MessageProps = {
        message: '',
        type: 'warning'
    };
    if (form.phone == '' || form.phone == undefined) {
        res.message = `用户名不能为空!`;
        return res;
    } else if (form.phone.length < 11 || form.phone.length > 11) {
        res.message = `用户名错误！`;
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
};
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
};;
// psdSubmit 点击密码登录按钮的方法
const psdSubmit = function () {
    let res = psdFormCheck(form.psd as psdLoginType);
    if (res.type == 'success') {
        form.psd.loginType = 0;
        login(form.psd);
        removeFome()
    } else {
        ElMessage.warning(res.message)
    }
};
// 验证码登录的方法
const yzmSubmit = function () {
    let res = yzmFormCheck(form.yzm as yzmLoginType);
    if (res.type == 'success') {
        form.yzm.loginType = 1;
        login(form.yzm);
    } else {
        ElMessage.warning(res.message)
    }
};
// 修改密码确定按钮的方法
const yzmok = function () {
    setPassword();
};
// 修改密码的校验
function setPsdCheck(params: setPsdType) {
    let res: MessageProps = {
        message: '',
        type: 'warning'
    };
    if (params.phone == '' || params.phone == undefined) {
        res.message = `用户名不能为空!`;
        return res;
    } else if (params.password == '' || params.password == undefined) {
        res.message = `密码不能为空!`;
        return res;
    } else if (params.phone.length < 11 || params.phone.length > 11) {
        res.message = `用户名不能少于11位!`;
        return res;
    } else if (params.smsCode == "" || params.smsCode == undefined) {
        res.message = `验证码不能为空!`;
        return res;
    } else if (params.password.length < 6 || params.password.length > 20) {
        res.message = `密码不能少于6位且不能大于20位!`;
        return res;
    } else if (params.smsCode.length < 4 || params.smsCode.length > 6) {
        res.message = `验证码不能少于4位且不能大于6位!`;
        return res;
    } else {
        res.type = 'success';
        res.message = '登录成功';
    };
    return res;
};
// 登录的方法
async function login(params: psdLoginType | yzmLoginType) {
    const res: any = await use.login(params);
    if (res.data) {
        sessionStorage.setItem('token', res.data);
        let num = 1;
        ElMessage.success('登录成功！');
        let timer = setInterval(() => {
            num--;
            if (num == 0) {
                clearInterval(timer)
                nav('/userAdmin');
                removeFome()
            }
        }, 1000)
    } else {
        ElMessage.warning(res.msg)
    }
};
// 修改密码的方法
async function setPassword() {
    form.setpswd.loginType = 3;
    const checkRes = setPsdCheck(form.setpswd as setPsdType);
    if (checkRes.type == 'success') {
        const res = await use.login(form.setpswd);
        if (res.data) {
            sessionStorage.setItem('token', res.data);
            let num = 1;
            ElMessage.success('修改成功！');
            let timer = setInterval(() => {
                num--;
                if (num == 0) {
                    clearInterval(timer)
                    nav('/userAdmin');
                    removeFome();
                }
            }, 1000);
        }
    } else {
        ElMessage.warning(checkRes.message);
    }
};
// 跳转页面的方法
const nav = (name: string) => {
    router.push(name);
};
// 格式化form表单
function removeFome() {
    form.psd.loginType = NaN;
    form.psd.password = '';
    form.psd.phone = '';
    form.yzm.phone = '';
    form.yzm.smsCode = '';
    form.yzm.loginType = NaN;
    form.setpswd.loginType = NaN;
    form.setpswd.password = '';
    form.setpswd.phone = '';
    form.setpswd.smsCode = '';
    yhmCheck.value = false;
    yhmCheckVal.value = '';
    pswdCheck.value = false;
    pswdCheckVal.value = '';
    yzmCheck.value = false;
    yzmCheckVal.value = '';
};
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
    border-radius: 10px;
    // box-shadow: 0px 0px 100px 0PX rgb(255, 255, 255);
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