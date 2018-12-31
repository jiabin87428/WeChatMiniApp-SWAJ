// pages/check/safetyManage.js
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否可编辑
    editable : 'true',

    // 企业ID
    qyid: '',

    // 对象数组
    params : {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var qyid = options.qyid
    var params = options.data
    this.setData({
      qyid: qyid,
      params: JSON.parse(params)
    })
    this.data.params['qyid'] = qyid
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
    console.log('1111')
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
    // wx.showModal({
    //   title: '提示',
    //   content: '有未保存的信息，是否继续退出？',
    //   success: function (res) {
    //     if (res.confirm) {
    //       var that = this

    //     } else if (res.cancel) {

    //     }
    //   }
    // })
    this.saveInfo(false)
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
  
  // 跳转编辑页面
  jumpEdit: function (e) {
    var viewId = e.currentTarget.id;
    // var data = this.data.params[viewId];
    // if (data == null) {
    //   data = {}
    // }
    wx.navigateTo({
      url: '../check/editPage?id=' + viewId + '&data=' + JSON.stringify(this.data.params)
    })
  },

  // 保存安全信息
  submit: function (e) {
    var that = this
    this.saveInfo(true)
  },
  // 保存
  saveInfo: function (needBack) {
    //调用接口
    request.requestLoading(config.updateBaseInfoAndSaftyInfo, this.data.params, '正在加载数据', function (res) {
      console.log(res)
      if (res != null) {
        if (needBack == true) {
          if (res.repCode == null || res.repCode != '500') {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      } else {
        wx.showToast({
          title: res.repMsg,
        })
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },
})