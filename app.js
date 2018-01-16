//app.js
// 本地存储数据
const DB = require('/udb/DB.js');
// APP常用配置
const config = require('/common/config.js');
// 网络数据通信
const updata = require('/common/updata.js');
// 页面更新方法处理
const review = require('/common/review.js');
// APP常用方法接口
const _smp = require('/common/simple.js');
// APP方法，Page页面通用配置
const _ass = require('/common/assign.js');
// APP授权处理
const _aoz = require('/common/authorize.js');
// 初始化APP参数
const _app = {
   // 存储全局数据变量
   GData: {},
   onLaunch: function () {
      //授权初始化
   },
   onShow: function () {
      
      // 监听网络情况
      wx.onNetworkStatusChange((res) => {
         if (!res.isConnected) {
            this.S.T({ title: "网络不正常" });
         }
      });
      wx.getNetworkType({
         success: (res) => {
            if (res.networkType == "none") {
               this.S.T({ title: "网络不正常" });
            }
         }
      })
   },
   config, DB, updata, review
}
//扩展App对象方法
Object.assign(_app, _smp, _ass);
// 注册App
App(_app);