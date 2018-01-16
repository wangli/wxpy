// 服务器通信业务
const SMP = require('simple');
const config = require('config');
const Review = require('review.js');
const DB = require('../udb/DB.js');
module.exports = {
   //get数据基础列表
   getTData(_url) {
      return new Promise(function (resolve, reject) {
         let _object = {
            url: _url,
            method: "GET",
            data: { key: config.juheKey },
            success: res => {
               if (res.data.error_code == 0) {
                  if (typeof (_object.data["page_index"]) == "undefined") {
                     resolve(res.data.result);
                  } else {
                     resolve(res.data);
                  }
               } else {
                  reject(res.data);
               }
            },
            fail: r => {
               reject(r);
            }
         };
         if (typeof (_url) == "object") {
            if (_url['data']) _url['data'] = Object.assign(_object.data, _url['data']);
            Object.assign(_object, _url);
         }
         SMP.R(_object);
      });
   },
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
   //城市列表
   getPCategory() {
      return this.getTDataStorage('/weather/citys');
   },
   // 城市天气
   getChannelDetail(_cityname) {
      return this.getTData({ url: '/weather/index', data: { cityname: _cityname } });
   },
   // 城市天气根据定位
   getWeatherDetail(lon, lat) {
      return this.getTData({ url: '/weather/geo', data: { lon: lon, lat: lat } });
   }
}