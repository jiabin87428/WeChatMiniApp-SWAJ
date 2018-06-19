// pages/application/application.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isqy: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkLogin()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 点击隐患列表
  listClick: function () {
    if (!this.checkLogin()) {
      wx.navigateTo({
        url: '../login/login'
      })
      return
    } else {
      wx.navigateTo({
        url: '../manger/manger'
      })
    }
  },
  // 判断是否登录
  checkLogin: function () {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        app.globalData.userInfo = res.data
        if (app.globalData.userInfo.repIsqy == 'false') {
          that.setData({
            isqy: false
          })
        } else {
          that.setData({
            isqy: true
          })
        }
        console.log(app.globalData.userInfo)
      }, fail: function (res) {
        wx.navigateTo({
          url: '../login/login'
        })
      }
    })
  },
})