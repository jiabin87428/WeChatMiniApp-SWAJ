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
    repFgfl: [],
    categoryid: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var categoryid = options.categoryid
    if (categoryid != null) {
      that.setData({
        categoryid: categoryid
      })
    }
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
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
    this.getLawTypesList()
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
  // 查询常见隐患
  searchYH: function (e) {
    this.setData({
      searchName: e.detail.value
    })
    this.getLawTypesList()
  },
  // 内容检索
  infoSearch: function (e) {
    wx.navigateTo({
      url: '../laws/lawsInfoSearch'
    })
  },
  // 获取法律分类列表
  getLawTypesList: function () {
    var that = this
    var param = {
      "categoryid": that.data.categoryid,
      "flName": that.data.searchName
    }
    //调用接口
    request.requestLoading(config.getLawsType, param, '正在加载数据', function (res) {
      console.log(res)
      if (res.repFgfl != null) {
        that.setData({
          repFgfl: res.repFgfl
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
    var item = e.currentTarget.dataset.item
    if (item.hasChild == "Y") {
      wx.navigateTo({
        url: '../laws/lawList?categoryid=' + item.id
      })
    }else {
      wx.navigateTo({
        url: '../laws/lawsDetail?type=' + item.id
      })
    }
  },
})