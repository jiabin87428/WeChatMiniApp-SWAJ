//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    useUserName: false,    //使用用户名登录
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  showUserModel: function () {
    wx.showModal({
      title: '11',
      content: JSON.stringify(this.data.userInfo),
    })
  },
  // 使用企业用户登录
  loadUserNameLogin: function (e) {
    this.setData({
      useUserName: true
    })
  },
  // 注册
  registerClick: function (e) {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  // 退出登录
  loginOut: function (e) {
    var _this = this
    wx.removeStorage({
      key: 'userInfo',
      success: function(res) {
        app.globalData.userInfo = null
        _this.setData({
          userInfo: {},
          hasUserInfo: false,
          useUserName: false
        })
      },
    })
  },
  gotoLogin: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
   *  监听页面显示，
   *    当从当前页面调转到另一个页面
   *    另一个页面销毁时会再次执行
   */
  onShow: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      this.setData({
        userInfo: {},
        hasUserInfo: false
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo,
    })
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  } 
})
