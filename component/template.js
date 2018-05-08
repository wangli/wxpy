// component/template.js
// 提示自动关闭延迟
var sid = null;
Component({
  properties: {
    toastTitle: {
      type: String,
      value: '',
      observer: 'toast'
    }
  },
  data: {
    show: true,
    toastShow: false,
    toastTxt: ""
  },
  methods: {
    showToast: function (newVal, oldVal) {
      if (newVal != oldVal) {
        if (sid) clearTimeout(sid);
        this.setData({ toastShow: true, toastTxt: newVal, show: false })
        sid = setTimeout(() => {
          this.setData({ toastShow: false, toastTxt: "" })
          clearTimeout(sid);
        }, 3000)
      }
    },
    hideToast: function () {
      this.setData({ toastShow: false });
    }
  }
})
