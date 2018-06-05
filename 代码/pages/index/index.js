
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')

var app = getApp()
Page({
  data: {
    /**  
        * 页面配置  
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换    
    currentTab: 0,
    //用户名
    userName:"请登录"
  },
  onLoad: function () {
    var that = this;

    /**  
     * 获取系统信息  
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /**
   *  监听页面显示，
   *    当从当前页面调转到另一个页面
   *    另一个页面销毁时会再次执行
   */
  onShow: function () {
    this.getStatistics()
    if (this.checkLogin()) {
      this.setData({
        userName: app.globalData.userInfo.nickName
      })
    }else {
      // 暂时注销
      // wx.navigateTo({
      //   url: '../login/login'
      // })
      this.setData({
        userName: "请登录"
      })
    }
  },
  // 点击用户头像
  userClick: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  // 点击添加隐患
  addClick: function () {
    if(!this.checkLogin()) {
      wx.navigateTo({
        url: '../login/login'
      })
      return
    }else{
      wx.navigateTo({
        url: '../danger/addDanger'
      })
    }
  },
  // 点击隐患列表
  listClick: function () {
    if(!this.checkLogin()) {
      wx.navigateTo({
        url: '../login/login'
      })
      return
    } else {
      wx.navigateTo({
        url: '../danger/dangerList'
      })
    }
  },

  // 判断是否登录
  checkLogin: function () {
    if (app.globalData.userInfo) {
      return true
    }
    return false
  },

  // 获取统计数据
  getStatistics: function () {
    var params = {
      // "repIsqy": "是",
      // "repRecordid": " 9B3C1758E6F148659A30C31A4810A702"
      "username": "root",
      "password": "111111"
    }
    request.requestLoading(config.login, params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  }
})    