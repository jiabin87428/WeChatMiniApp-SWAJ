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
    companyList: [],
    orgid: "",
    // 需要返回的级数
    backPageNum: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var orgid = options.orgid
    var backNum = options.backNum
    if (orgid != null) {
      var newNum = that.data.backPageNum + parseInt(backNum)
      that.setData({
        backPageNum: newNum
      })
    }
    if (backNum != null) {
      that.setData({
        orgid: orgid
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
    this.getCompanyList()
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
    this.getCompanyList()
  },
  // 内容检索
  infoSearch: function (e) {
    wx.navigateTo({
      url: '../laws/lawsInfoSearch'
    })
  },
  // 获取法律分类列表
  getCompanyList: function () {
    var that = this
    var param = {
      "userid": app.globalData.userInfo.userid,
      "orgid": that.data.orgid
    }
    //调用应用实例的方法获取全局数据
    app.getCompanyPlace(param, function (companyPlace) {
      var allList = [
        {
          "hasChild": "N",
          "id": that.data.orgid,
          "name": "全部"
        }
      ]
      that.setData({
        companyList: allList.concat(companyPlace)
      })
    })
  },

  // 选择并返回赋值
  selectItem: function (e) {
    var that = this
    var item = e.currentTarget.dataset.item
    if (item.hasChild == "Y") {
      wx.navigateTo({
        url: '../index/fliter?orgid=' + item.id + '&backNum=' + that.data.backPageNum
      })
    } else {
      var pages = getCurrentPages()
      var indexPage = pages[pages.length - that.data.backPageNum - 1]
      indexPage.setData({
        orgid: that.data.orgid
      })
      wx.navigateBack({
        delta: that.data.backPageNum
      })
    }
  },
})