
/**
   * @param params 登录、修改密码
   * @returns loginType (integer): 登录方式 0密码登录 1短信 2注册 3重置密码 ,
   * @returns password (string, optional): 密码 ,
   * @returns phone (string): 手机号 ,
   * @returns smsCode (string, optional): 验证码,
   */
export interface psdLoginType {
    loginType: number,//登录方式 0密码登录 1短信 2注册 3重置密码
    password: string,
    phone: string,
}
export interface yzmLoginType {
    loginType: number,//登录方式 0密码登录 1短信 2注册 3重置密码
    phone: string,
    smsCode: string,
}
export interface Form {
    psd: psdLoginType,
    yzm: yzmLoginType,
}