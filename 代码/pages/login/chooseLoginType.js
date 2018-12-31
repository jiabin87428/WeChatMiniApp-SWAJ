//index.js
//获取应用实例
const app = getApp()

var request = require('../../utils/request.js')
var config = require('../../utils/config.js')

Page({
  data: {
    motto: 'Hello World',
    // 使用用户名密码登录
    userName: '',
    passWord: ''
  },
  // 拿到用户名  
  getUserName: function (e) {
    var val = e.detail.value;
    this.setData({
      userName: val
    });
  },
  // 拿到密码  
  getPassWord: function (e) {
    var val = e.detail.value;
    this.setData({
      passWord: val
    });
  },
  // 微信登录
  weChartLogin: function (e) {
    // wx.showToast({
    //   title: "正在开发，请先使用用户名登录",
    //   icon: 'none'
    // })
    wx.login({
      success: function (res) {
        var code = res.code;
        if (code) {
          console.log('获取用户登录凭证：' + code);
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    });
  },
  // 用户名登录
  userNameLogin: function (e) {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  onLoad: function () {

  },
  /**
   *  监听页面显示，
   *    当从当前页面调转到另一个页面
   *    另一个页面销毁时会再次执行
   */
  onShow: function () {
    console.log("111111")
  },
  /**
  * 生命周期函数--监听页面隐藏
  */
  onHide: function () {

    console.log("333333")
  },
})
