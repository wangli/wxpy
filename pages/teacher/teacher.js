//index.js
//获取应用实例
const A = getApp();
Page(A.assignPage({
   data: {
      items: [
         { word: 'hello' }
      ]
   },
   onLoad: function (options) {
      A.updata.postTData({url:"/abc"}).then(res => {
         this.setData({ items: res.items });
      }, err => {
         console.log(err);
      })
      
   },
   toast: function (e) {
      A.S.toast(A.C(e).word);
   }
}));