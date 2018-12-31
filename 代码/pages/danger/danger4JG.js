var app = getApp()
Page({
  data: {
    /**  
    * 页面配置  
    */
    addDangerTitle: "隐患快报",
    addDangerDesc: "企业隐患自查自报",
    winWidth: 0,
    winHeight: 0,
    // 用户类型
    yhlx: 0,
    // tab切换    
    currentTab: 0,
    //用户名
    userName: "请登录",
    item: null
  },
  onLoad: function (options) {
    var that = this;
    var item = JSON.parse(options.item)
    that.setData({
      item: item
    })
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
  // 点击用户头像
  userClick: function () {
    wx.navigateTo({
      url: '../login/chooseLoginType'
    })
  },
  // 点击添加隐患
  addClick: function () {
    if (this.data.item != null && this.data.item.xmzt == "1") {
      wx.showToast({
        title: '已归档项目不能新建隐患',
        icon: 'none',
      })
      return
    }
    wx.navigateTo({
      url: '../danger/addDanger?item=' + JSON.stringify(this.data.item) 
    })
  },
  // 点击隐患列表
  listClick: function () {
    wx.navigateTo({
      url: '../danger/dangerCheckList?item=' + JSON.stringify(this.data.item) + '&pageType=0'
    })
  },
  // 查看项目详情
  projectClick: function (e) {
    wx.navigateTo({
      url: '../danger/addProject?item=' + JSON.stringify(this.data.item)
    })
  },
  // 点击查看项目列表
  projectListClick: function (e) {
    wx.navigateTo({
      url: '../danger/projectList?userid=' + app.globalData.userInfo.userid
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