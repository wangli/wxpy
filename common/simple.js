// 全局常用方法
const config = require('config.js');
const user = require('../udb/user.js');
const DB = require('../udb/DB.js');
const D = require('define.js')
//返回组件对象的dataset值
const C = _obj => {
   return _obj.currentTarget.dataset;
}
// 一些任务处理全局变量
const B = {
   islogin: false //用于url请求时是否挑战到登陆页
};
//跳转处理
const G = (_url, _reviewPage) => {
   var _uArr = _url.split("://");
   if (_uArr.length > 1) {
      // 当前跳转处理页面是否在登陆
      if (_uArr[1] == config.dPage.login && B.islogin) {
         return;
      } else if (_uArr[1] == config.dPage.login) {
         B.islogin = true;
      } else {
         B.islogin = false;
      }
      switch (_uArr[0]) {
         case "navigateTo":
            wx.navigateTo({ url: _uArr[1] });
            break;
         case "redirectTo":
            wx.redirectTo({ url: _uArr[1] });
            break;
         case "switchTab":
            wx.switchTab({ url: _uArr[1] });
            break;
         case "navigateBack":
            // 获取打开中的所有页面
            let pages = getCurrentPages();
            if (pages.length > 1) {
               if (_reviewPage) {
                  pages[pages.length - 2].setData({ ReviewPage: true });
               }
            }
            wx.navigateBack({ delta: _uArr[1] });
            break;
         default:
            wx.redirectTo({ url: _uArr[1] });
      }
   } else {
      wx.navigateTo({ url: _uArr[0] })
   }
}
//数据交互提示
const S = {
   T: _obj => {
      let _o = {
         image: "/assets/images/alert.png",
         duration: 3000
      }
      Object.assign(_o, _obj);
      wx.showToast(_o);
   },
   OK: _obj => {
      let _o = {
         icon: 'success',
         duration: 3000,
      }
      Object.assign(_o, _obj);
      wx.showToast(_o);
   },
   loading: _obj => {
      wx.showLoading({ title: 'loading.' })
   }
}
//发起网络请求
const R = _obj => {
   if (typeof (_obj.url != "undefined")) {
      // 拼接url
      _obj.url = config.host + _obj.url;
      // 获取success方法并处理
      if (typeof (_obj.success != "undefined")) {
         _obj["_success"] = _obj.success;
         delete _obj.success;
      }
      // 获取fail方法并处理
      if (typeof (_obj.fail != "undefined")) {
         _obj["_fail"] = _obj.fail;
         delete _obj.fail;
      }
      // 默认参数设置
      let _o = {
         url: config.host,
         method: "POST",
         header: {},
         success: res => {
            _o._success(res);
         },
         fail: err => {
            wx.hideLoading();
            _o._fail(err);
         }
      }
      // 合并传入的参数对象
      Object.assign(_o, _obj);
      // 提交数据
      wx.request(_o);
   }
}
//发起支付请求
const P = _obj => {
   wx.requestPayment(_obj);
}

// 获取当前页面前的页面,_index值是大小表示距离页面位置层级，如 1 表示邻近上一级，2表示上一级的上一级，以此类推
const getParentPage = _index => {
   _index = _index || 1;
   let pages = getCurrentPages();
   if (pages.length > 1) {
      return pages[pages.length - _index - 1];
   } else {
      return pages[0];
   }
}
//拷贝对象
function clone(origin) {
   return Object.assign({}, origin);
}
// 上传图片文件
const upFile = _obj => {
   return new Promise(function (resolve, reject) {
      wx.chooseImage({
         count: 1, // 数量
         sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
         success: (res) => {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths
            wx.uploadFile({
               url: config.host + config.dApi.upFile, //仅为示例，非真实的接口地址
               filePath: tempFilePaths[0],
               header: {
                  "token": user.token
               },
               name: 'tmp_name',
               success: (res) => {
                  var data = JSON.parse(res.data);
                  resolve(data);
               },
               fail: (err) => {
                  console.log(data);
                  reject(JSON.parse(err));
               }
            })
         },
         fail: (err) => {
            reject(err);
         }
      })
   });
}
//发送手机验证码
const sendSMS = _mobile => {
   return new Promise(function (resolve, reject) {
      R({
         url: config.dApi.sms,
         data: { mobile: _mobile },
         success: r => {
            resolve(r.data);
         },
         fail: r => {
            reject(r.data);
         }
      })
   });
}
//微信小程序登录,获取code
const wxLogin = _obj => {
   return new Promise(function (resolve, reject) {
      wx.login({
         success: res => {
            if (res.code) {
               resolve(res.code);
               // ...........从服务端验证获取token
            } else {
               reject(res);
            }
         },
         fail: res => {
            reject(res);
         }
      })
   });
}
//格式化时间
const DateFormat = (_val, _fmt) => {
   var _fmt = _fmt || "YYYY-MM-DD";
   var fDate = new Date();
   if (typeof _val == "number" || typeof _val == "string") {
      //秒补充为微秒
      _val = (parseInt(_val) < 10000000000) ? parseInt(_val) * 1000 : parseInt(_val);
      fDate = new Date(_val);
   } else if (_val instanceof Date) {
      fDate = _val;
   }
   var o = {
      "M+": fDate.getMonth() + 1, //月份 
      "D+": fDate.getDate(), //日 
      "h+": fDate.getHours(), //小时 
      "m+": fDate.getMinutes(), //分 
      "s+": fDate.getSeconds(), //秒 
      "q+": Math.floor((fDate.getMonth() + 3) / 3), //季度 
      "S": fDate.getMilliseconds() //毫秒 
   };
   if (/(Y+)/.test(_fmt)) {
      _fmt = _fmt.replace(RegExp.$1, (fDate.getFullYear() + "").substr(4 - RegExp.$1.length));
   }
   for (var k in o) {
      if (new RegExp("(" + k + ")").test(_fmt)) {
         _fmt = _fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
   }
   return _fmt;
}

// base64数据处理
const formatData = {
   // 字符串转为ArrayBuffer数据对象
   STB(_str) {
      var out = new ArrayBuffer(_str.length);
      var u16a = new Uint8Array(out);
      var strs = _str.split("");
      for (let i = 0; i < strs.length; i++) {
         u16a[i] = strs[i].charCodeAt();
      }
      return u16a;
   },
   // ArrayBuffer数据对象转字符串
   BTS(_buf) {
      var out = "";
      var u8 = new Uint8Array(_buf);
      for (let i = 0; i < u8.length; i++) {
         out += String.fromCharCode(u8[i]);
      }
      return out;
   },
   // 字符串转base64
   stringToBase64(_str) {
      return wx.arrayBufferToBase64(formatData.STB(_str));
   },
   // base64转字符串
   base64ToString(_str) {
      return formatData.BTS(wx.base64ToArrayBuffer(_str));
   }
}

module.exports = { B, C, D, G, S, R, P, sendSMS, wxLogin, upFile, formatData, DateFormat, getParentPage }
