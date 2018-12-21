//index.js
//获取应用实例
const app = getApp()

var request = require('../../utils/request.js')
var config = require('../../utils/config.js')

Page({
  data: {
    motto: 'Hello World',
    // 使用用户名密码登录
    userName:'',
    passWord:''
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
  // 登录
  login: function (e) {
    var params = {
      "username": this.data.userName,
      "password": this.data.passWord
    }
    request.requestLoading(config.login, params, '正在登录', function (res)     {
      //res就是我们请求接口返回的数据
      console.log(res)
      if (res.repCode == '200') {
        wx.setStorage({
          key: "userInfo",
          data: res
        })
        wx.navigateBack({
          delta: 1
        })
      }
    }, function () {
      wx.showToast({
        title: '登录失败',
        icon: 'none'
      })
    })
  },
  // 注册
  registerClick: function (e) {
    wx.navigateTo({
      url: '../register/register'
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
