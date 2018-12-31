// pages/me/changePassword.js
var util = require('../../utils/util.js');
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPass: "",
    newPass1: "",
    newPass2: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  // 设置老密码
  setOldPass: function (e){
    this.setData({
      oldPass: e.detail.value
    })
  },
  // 设置老密码1
  setNewPass1: function (e) {
    this.setData({
      newPass1: e.detail.value
    })
  },
  // 设置老密码2
  setNewPass2: function (e) {
    this.setData({
      newPass2: e.detail.value
    })
  },
  // 保存新密码
  submit: function (e) {
    var that = this
    if(that.data.newPass1 != that.data.newPass2) {
      wx.showToast({
        title: "两次新密码输入不一致",
        icon: 'none'
      })
      return
    }

    var param = {
      "userid": app.globalData.userInfo.userid,
      "oldPassword": that.data.oldPass,
      "newPassword": that.data.newPass1,
    }
    //调用接口
    request.requestLoading(config.getType, param, '正在加载数据', function (res) {
      if (res.repCode == '200') {
        wx.showToast({
          title: res.repMsg,
          complete: setTimeout(function () {
            wx.navigateBack({
              delta: 1
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
        title: '加载数据失败',
      })
    })
  },
})