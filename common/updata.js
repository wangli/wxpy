// 服务器通信业务
const SMP = require('simple');
const config = require('../config/config');
const Review = require('review.js');
const DB = require('../udb/DB.js');
const webservice = require('../service/webservice.js')
module.exports = {
   //get数据基础列表
   getTData: SMP.RS,
   // 获取需要本地存储的get数据
   getTDataStorage(_url) {
      return new Promise((resolve, reject) => {
         if (DB.category.selector(_url) && !Review.api(_url)) {
            // 如果本地存在数据，并无更新要求
            resolve(DB.category.selector(_url));
         } else {
            // 请求接口数据
            this.getTData(_url).then(data => {
               // 存储数据到本地
               DB.category.set(_url, data);
               // 设置接口更新状态
               Review.setApi(_url, false);
               resolve(data);
            }, err => {
               reject(err);
            });
         }
      })
   },
   // post提交数据
   postTData(_obj) {
      if (typeof _obj['url'] != "undefined" && typeof _obj['data'] != "undefined") {
         return SMP.RS({ data: _obj['data'], url: _obj['url'], method: 'POST' });
      } else {
         return new Promise((resolve, reject) => {
            reject("error data");
         })
      }
   },
   ...webservice
}