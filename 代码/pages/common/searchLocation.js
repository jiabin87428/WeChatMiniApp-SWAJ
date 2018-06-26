// pages/common/searchLocation.js
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var amapFile = require('../../libs/amap-wx.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    /**  
     * 获取系统信息  
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
        });
      }
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
  bindInput: function (e) {
    var _this = this;
    var keywords = e.detail.value;
    var myAmap = new amapFile.AMapWX({ key: 'f28afe6170399e78d1f7e1b672c1fa49' });
    myAmap.getInputtips({
      keywords: keywords,
      location: '',
      success: function (res) {
        if (res && res.tips) {
          _this.setData({
            isShow: true,
            tips: res.tips
          });
        }
      }
    })
  },
  bindSearch: function (e) {
    var keywords = e.currentTarget.dataset.keywords;
    var location = e.currentTarget.dataset.location.split(',');

    this.setData({
      isShow: false,
      longitude: location[0],
      latitude: location[1],
    })

    var pages = getCurrentPages();             //  获取页面栈
    var prevPage = pages[pages.length - 2];   // 上一个页面
    prevPage.setData({
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      keyword: e.currentTarget.dataset.keywords,
      address: e.currentTarget.dataset.address
    })
    wx.navigateBack({
      delta: 1
    })
  }
})