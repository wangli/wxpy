// 接口是否需要更新状态
const DB = require('../udb/DB.js');
const apis = {};
const _o = {
   setApi(_val, _st) {
      apis[_val] = typeof (_st) != "undefined" ? _st : true;
   },
   api(_val) {
      return typeof (apis[_val]) == "undefined" ? true : apis[_val];
   },
   init(_keys) {
      if (typeof (_keys) == "string") {
         if (DB.category.selector(_keys)) apis[_keys] = false;
      } else {
         for (let k in _keys) {
            if (DB.category.selector(k)) apis[k] = false;
         }
      }
   }
};
module.exports = _o
