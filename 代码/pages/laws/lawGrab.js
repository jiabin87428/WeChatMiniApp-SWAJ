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
    repFglist: [],

    // 当前页
    pageNum: 1,
    // 每页显示条数
    pageRows: 20,
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
    this.getLawGrabList()
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

  refreshList: function (e) {

    // 下拉刷新
    // if (!this.loading) {
    //   this.setData({
    //     pageNum: 1
    //   })
    //   this.getLawGrabList()
    // }
  },

  loadMore: function (e) {
    if (!this.loading) {
      var newPage = this.data.pageNum + 1
      this.setData({
        pageNum: newPage
      })
      this.getLawGrabList()
    }
  },

  didScroll: function (e) {
    if (e.detail.scrollTop < -100) {
      // 下拉刷新
      if (!this.loading) {
        this.setData({
          pageNum: 1
        })
        this.getLawGrabList()
      }
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 搜索抓取法规
  searchLaw: function (e) {
    this.setData({
      searchName: e.detail.value,
      pageNum: 1
    })
    this.getLawGrabList()
  },
  // 获取法律分类列表
  getLawGrabList: function () {
    var that = this
    var param = {
      "pageNum": that.data.pageNum,
      "pageRows": that.data.pageRows,
      "searchText": that.data.searchName
    }
    //调用接口
    request.requestLoading(config.getGrabLaws, param, '正在加载数据', function (res) {
      console.log(res)
      if (res.repFglist != null) {
        var newList = []
        if (that.data.pageNum == 1) {
          newList = res.repFglist
        }else {
          newList = that.data.repFglist.concat(res.repFglist)
        }
        that.setData({
          repFglist: newList
        })
      }
      that.loading = false
      wx.stopPullDownRefresh()
    }, function () {
      wx.showToast({
        title: '加载数据失败',
        icon: 'none'
      })
      that.loading = false
      wx.stopPullDownRefresh()
    })
  },

  // 选择并返回赋值
  selectItem: function (e) {
    var item = e.currentTarget.dataset.item
    // wx.navigateTo({
    //   url: '../common/webView?url=' + item.titleUrl
    // })
  },
})