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
    dangerList: [
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
      { "title": "整改通知（中国远洋海运集团有限公司）" },
    ]
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
     * 滑动切换tab  
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /**  
   * 点击tab切换  
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }

    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  /** 
   * 点击分享 
   */
  onShareAppMessage: function () {
    return {
      title: '装逼小程序',
      path: '/page/user?id=123'
    }
  },// 点击添加隐患
  addDangerClick: function () {
    wx.navigateTo({
      url: '../danger/addDanger'
    })
  },
  // 点击查看隐患详情
  getDetail: function () {
    wx.navigateTo({
      url: '../danger/dangerDetail'
    })
  },
  // 判断是否登录
  checkLogin: function () {
    if (app.globalData.userInfo) {
      return true
    }
    return false
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
})    