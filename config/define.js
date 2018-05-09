// 状态类描述定义
const state = require('state.js')
module.exports = {
  DF: {
    OrderStatus: {
      '-1': '已取消',
      '已取消': '-1',
      '0': '待发货',
      '待发货': '0',
      '1': '待收货',
      '待收货': '1',
      '2': '已完成',
      '已完成': '2'
    }
  },
  STATE:state
}