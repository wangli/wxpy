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
  },
  toast: function (e) {
    A.S.toast(A.C(e).word);
  }
}));