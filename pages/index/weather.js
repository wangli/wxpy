// pages/index/weather.js
const A = getApp();
Page(A.assignPage({
   data: {
      weather: {}
   },
   onLoad: function (options) {
      wx.showLoading({ title: '加载中' });
      A.updata.getChannelDetail(options.cname).then(res => {
         this.setData({ weather: res })
         wx.hideLoading()
      }, err => {
         wx.hideLoading()
      });
   }
}));