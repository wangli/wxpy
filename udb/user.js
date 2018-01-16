//用户基本信息
const user = {
  // 用户基本信息
  get info() {
    return wx.getStorageSync('user_info');
  },
  set info(_val) {
    wx.setStorageSync('user_info', _val)
  },
  // 用户编号（唯一编码）
  get sn() {
    return wx.getStorageSync('user_sn');
  },
  set sn(_val) {
    wx.setStorageSync('user_sn', _val)
  },
  // 登陆授权信息
  get token() {
    return wx.getStorageSync('user_token');
  },
  set token(_val) {
    wx.setStorageSync('user_token', _val)
  },
  // 用户角色
  get role() {
    return wx.getStorageSync('user_role');
  },
  set role(_val) {
    wx.setStorageSync('user_role', _val)
  }
}
module.exports = user
