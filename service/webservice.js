// web service api 业务处理
// 此模块用于扩展updata功能
module.exports = {
   //请求数据
   getAbc() {
      return this.getTData('/abc');
   },
   // 城市
   getStorageCf() {
      return this.getTDataStorage({ url: '/cf/asdfasdf' });
   }
}