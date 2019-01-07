// pages/me/addCompanyAccount.js
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qyid: "",
    userName: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var qyid = options.qyid
    that.setData({
      qyid: qyid,
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

  // 拿到用户名  
  getUserName: function (e) {
    var val = e.detail.value;
    this.setData({
      userName: val
    });
  }, 
  // 保存企业账号
  saveClick: function (e) {
    var params = {
      "qyid": this.data.qyid,
      "usercode": this.data.userName
    }
    request.requestLoading(config.createAccount, params, '正在新增', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
      if (res.repCode == '200') {
        wx.showToast({
          title: res.repMsg,
          complete: setTimeout(function () {
            wx.navigateBack({
              delta: 3
            })
          }, 1500)
        })
      } else {
        wx.showToast({
          title: res.repMsg,
          icon: 'none'
        })
      }
    }, function () {
      wx.showToast({
        title: '新增失败',
        icon: 'none'
      })
    })
  },
})