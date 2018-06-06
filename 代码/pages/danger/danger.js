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
    userName: "请登录"
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
    
  },
  // 点击用户头像
  userClick: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  // 点击添加隐患
  addClick: function () {
    wx.navigateTo({
      url: '../danger/addDanger'
    })
    // if (!this.checkLogin()) {
    //   wx.navigateTo({
    //     url: '../login/login'
    //   })
    //   return
    // } else {
    //   wx.navigateTo({
    //     url: '../danger/addDanger'
    //   })
    // }
  },
  // 点击隐患列表
  listClick: function () {
    wx.navigateTo({
      url: '../danger/dangerCheckList'
    })
    // if (!this.checkLogin()) {
    //   wx.navigateTo({
    //     url: '../login/login'
    //   })
    //   return
    // } else {
    //   wx.navigateTo({
    //     url: '../danger/dangerList'
    //   })
    // }
  },

  // 判断是否登录
  checkLogin: function () {
    if (app.globalData.userInfo) {
      return true
    }
    return false
  }
})    