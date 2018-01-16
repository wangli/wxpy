// 接口是否需要更新状态
const apis = {};
const _o = {
    setApi(_val, _st) {
        apis[_val] = typeof (_st) != "undefined" ? _st : true;
    },
    api(_val) {
        return typeof (apis[_val]) == "undefined" ? true : apis[_val];
    }
};
module.exports = _o
