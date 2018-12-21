var app = getApp()
Page({
  data: {
    /**  
    * 页面配置  
    */
    winWidth: 0,
    winHeight: 0,
    // 用户类型
    yhlx: 0,
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
    this.checkLogin()
  },
  // 获取法规清单
  getList: function () {
    wx.navigateTo({
      url: '../laws/lawList'
    })
  },
  // 法律抓取
  grabClick: function () {
    wx.navigateTo({
      url: '../laws/lawGrab'
    })
  },

  // 判断是否登录
  checkLogin: function () {
    if (app.globalData.userInfo) {
      return true
    }
    return false
  },
  // 判断是否登录
  checkLogin: function () {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        app.globalData.userInfo = res.data
        that.setData({
          addDangerTitle: "隐患快报",
          addDangerDesc: "企业隐患自查自报",
          yhlx: app.globalData.userInfo.yhlx
        })
      }, fail: function (res) {
        wx.navigateTo({
          url: '../login/chooseLoginType'
        })
      }
    })
  },
})    