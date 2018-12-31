// pages/application/application.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isqy: false,
    screenWidth: 0,
    screenHeight: 0,
    menuName: '企业管理',
    subTitle: '可根据企业类型、企业属地查询'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      screenWidth: wx.getSystemInfoSync().windowWidth,
      screenHeight: wx.getSystemInfoSync().windowHeight
    })
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
    this.checkLogin()
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
    if (this.data.isqy == false) {// 监管用户
      wx.navigateTo({
        url: '../manger/companyManger'
      })
    } else {// 企业用户
      wx.navigateTo({
        url: '../application/companyInfoList?qyid=' + app.globalData.userInfo.userid
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
            isqy: false,
            menuName: "企业管理",
            subTitle: "可根据企业类型、企业属地查询"
          })
        } else {
          that.setData({
            isqy: true,
            menuName: "企业信息",
            subTitle: "查询企业基本信息"
          })
        }
        console.log(app.globalData.userInfo)
      }, fail: function (res) {
        wx.navigateTo({
          url: '../login/chooseLoginType'
        })
      }
    })
  },
})