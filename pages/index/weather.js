// pages/index/weather.js
const A = getApp();
Page(A.assignPage({
   data: {
      inputShowed: false,
      weather: {}
   },
   onLoad: function (options) {
      this.getProject(options.cname);
   },
   focusInput: function (e) {
      this.setData({ inputShowed: true });
   },
   blurInput: function (e) {
      this.setData({ inputShowed: false });
   },
   formSubmit: function (e) {
      this.getProject(e.detail.value.cname);
      this.setData({ inputShowed: false });
   },
   // 提交数据 
   submitData(e) {
      this.getProject(e.detail.value);
   },
   getProject(cname) {
      wx.showLoading({ title: '加载中' });
      A.updata.getChannelDetail(cname).then(res => {
         this.setData({ weather: res })
         wx.hideLoading()
      }, err => {
         wx.hideLoading()
      });
   }
}));