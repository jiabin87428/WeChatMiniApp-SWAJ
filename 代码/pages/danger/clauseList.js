// pages/check/dangerDetailSelect.js
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,
    searchName: "",
    type: "",
    repFlfg: [],
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

    var type = options.type == null ? "" : options.type
    var searchName = options.searchName == null ? "" : options.searchName
    this.setData({
      type: type,
      searchName: searchName
    })
    this.getAllFlfg()
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
  // 查询法律法规
  searchFlfg: function (e) {
    this.setData({
      searchName: e.detail.value
    })
    this.getAllFlfg()
  },
  // 获取所有法律法规列表
  getAllFlfg: function () {
    var that = this
    var param = {
      "searchName": that.data.searchName
    }
    //调用接口
    request.requestLoading(config.getAllFlfg, param, '正在加载数据', function (res) {
      console.log(res)
      if (res.repFlfg != null) {
        that.setData({
          repFlfg: res.repFlfg
        })
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
        icon: 'none'
      })
    })
  },

  // 选择并返回赋值
  selectItem: function (e) {
    var dataPage = 2
    var backNum = 1

    var pages = getCurrentPages();             //  获取页面栈
    var prevPage = pages[pages.length - dataPage];   // 上1个页面
    var item = e.currentTarget.dataset.item
    prevPage.setData({
      clause: item.name,
    })
    wx.navigateBack({
      delta: backNum
    })
  },
})