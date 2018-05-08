
const config = {
  get v() {
    return "0.1.4";
  },
  get host() {
    return "http://192.168.1.244";
  },
  get juheKey() {
    // juhe.cn的key
    return "79d43fad867513f606f81a506f71d7d4";
  },
  // 全局默认页面地址
  dPage: {
    index: "/pages/index/index",//首页
    login: "/pages/login/login",//登陆页
    P404: ""//没有找到信息页面
  },
  // 全局常用接口
  dApi: {
    sms: "/api/user/sendSMSCaptcha",
    upImage: "/upfile/image",
    upSound: "/upfile/sound"
  },
  // 无效验证登陆的接口
  filterApi: {
    "/api/apiVersion/getApiVersionList": true,//接口版本
  }
}
module.exports = config