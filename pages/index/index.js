//index.js
//获取应用实例
const A = getApp();
Page(A.assignPage({
   data: {
      citys: [],
      weather: { today: { date_y: "..." } }
   },
   onLoad: function (options) {
      wx.showLoading({
         title: '加载中',
      });
      A.updata.getPCategory().then(res => {
         this.setData({ citys: res });
         wx.hideLoading()
      }, err => {
         wx.hideLoading()
      });
      wx.getLocation({
         type: 'wgs84',
         success: res => {
            A.updata.getWeatherDetail(res.longitude, res.latitude).then(data => {
               this.setData({ weather: data });
            }, err => {
               let er = { today: { date_y: "获取当前位置失败" } };
               this.setData({ weather: er });
            })
         }
      })
   }
}));