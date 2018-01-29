//index.js
//获取应用实例
const A = getApp();
Page(A.assignPage({
   data: {
      inputShowed: false,
      citys: [],
      items: [],
      kword: "",
      weather: { today: { date_y: "..." } }
   },
   onLoad: function (options) {
      wx.showLoading({
         title: '加载中',
      });
      A.updata.getPCategory().then(res => {
         this.setData({ citys: res, items: res });
         // 两千多行数据渲染有点满，loading延迟关闭
         setTimeout(() => { wx.hideLoading() }, 1500);
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
   },
   onShareAppMessage:function(res){
      
   },
   focusInput: function (e) {
      this.setData({ inputShowed: true });
   },
   blurInput: function (e) {
      this.setData({ inputShowed: false });
   },
   formSubmit: function (e) {
      this.filter(e.detail.value.kword);
      this.setData({ inputShowed: false });
   },
   submitData(e) {
      this.filter(e.detail.value);
   },
   filter: function (_kword) {
      console.log(_kword);
      if (this.trim(_kword) != "") {
         let data = this.data.citys.filter(val => {
            return val.province == _kword || val.city == _kword || val.district == _kword;
         });
         console.log(data);
         this.setData({ items: data });
      } else {
         this.setData({ items: this.data.citys });
      }
   },
   trim: function (s) {
      return s.replace(/(^\s*)|(\s*$)/g, "");
   }
}));