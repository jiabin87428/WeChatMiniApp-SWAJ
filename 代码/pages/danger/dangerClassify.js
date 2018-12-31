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
    repOrg: [],
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
    this.getDangerClassify()
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
    this.getDangerClassify()
  },
  // 获取类别
  getDangerClassify: function () {
    var param = {
      "searchName": this.data.searchName
    }
    var that = this
    //调用接口
    request.requestLoading(config.getDangerClassify, param, '正在加载数据', function (res) {
      console.log(res)
      if (res.repOrg != null) {
        that.setData({
          repOrg: res.repOrg
        })
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },
  // 选择类别
  selectClassify: function (e) {
    var dataPage = 2
    var backNum = 1
    var pages = getCurrentPages();             //  获取页面栈
    var prevPage = pages[pages.length - dataPage];   // 上1个页面
    var item = e.currentTarget.dataset.item
    prevPage.setData({
      classify: item.name
    })
    wx.navigateBack({
      delta: backNum
    })
  },
})