const SMP = require('simple');
module.exports = {
   //扩展Page页面默认方法
   assignPage: function (_page) {
      let page = {
         //page中，页面显示后事件
         onShow: function () {
            if (this.data.ReviewPage) {
               this.setData({ ReviewPage: false });
               this.wcShow();
            }
         },
         // 自定义显示处理方法，主要用于配合onShow方法，默认用于页面的数据刷新
         wcShow: function () { },
         //组件上触发跳转事件
         //参考  bindtap="goPage" data-upage="channle/channles"
         //upage是属性名
         goPage: (_evt) => {
            SMP.G(SMP.C(_evt).upage);
         },
         // 返回上一页
         goBack: (_review, _delta) => {
            _review = _review || false;
            _delta = _delta || "";
            SMP.G("navigateBack://" + _delta, _review);
         },
         // 返回上一页并设置上一页的reviewPage状态
         goBackR: (_delta) => {
            SMP.G("navigateBack://" + (_delta || ""), true);
         },
         // reviewParentData设置上级页面数据需要更新
         setRPdata: (_val) => {
            SMP.getParentPage().setData({ ReviewPage: _val || true });
         }
      };
      // 初始化data数据
      _page.data = Object.assign({
         // ReviewPage，是否刷新当前页面数据，主要作用在于返回到当前页面时，根据次状态更新信息
         // 如新增修改数据后退页面处理
         ReviewPage: true
      }, _page.data);
      // 合并扩展
      Object.assign(page, _page);
      return page;
   }
}