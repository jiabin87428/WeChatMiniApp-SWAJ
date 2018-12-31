// pages/check/safetyManage.js
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,
    // 搜索文字
    searchName: "",
    // 对象数组
    repLb: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    this.getDangerTypes()
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
  // 查询类别
  searchLB: function (e) {
    this.setData({
      searchName: e.detail.value
    })
    this.getDangerTypes()
  },
  // 获取类别
  getDangerTypes: function() {
    var param = {
      "searchName": this.data.searchName
    }
    var that = this
    //调用接口
    request.requestLoading(config.getCategory, param, '正在加载数据', function (res) {
      console.log(res)
      if (res.repLb != null) {
        that.setData({
          repLb: res.repLb
        })
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },
  // 跳转编辑页面
  jumpDetail: function (e) {
    var item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../danger/dangerDetailSelect?type=' + item.lb + '&searchName=' + this.data.searchName
    })
  },

  // 保存安全信息
  submit: function (e) {
    var that = this
    //调用接口
    request.requestLoading(config.updateBaseInfoAndSaftyInfo, this.data.params, '正在加载数据', function (res) {
      console.log(res)
      if (res != null) {
        if (res.repCode == null || res.repCode != '500') {
          wx.navigateBack({
            delta: 1
          })
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