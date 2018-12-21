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
    sslist: [],
    // 下载进度
    progress: 0,
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
  searchInfo: function (e) {
    this.setData({
      searchName: e.detail.value
    })
    this.getLawsDetails()
  },
  // 获取法律分类列表
  getLawsDetails: function () {
    var that = this
    var param = {
      "fgnr": that.data.searchName
    }
    //调用接口
    request.requestLoading(config.searchLawsInfo, param, '正在加载数据', function (res) {
      console.log(res)
      if (res.sslist != null) {
        that.setData({
          sslist: res.sslist
        })
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
        icon: 'none'
      })
    })
  },

  // 下载文档并查看
  downLoadAndView: function (e) {
    var item = e.currentTarget.dataset.item
    var fileId = item.attid
    var fileType = fileId.split('.')[1];
    const downloadTask = wx.downloadFile({
      url: config.downLoadFile + fileId,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          fileType: fileType,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: function (res) {
            wx.showToast({
              title: res.errMsg,
              icon: 'none'
            })
          }
        })
      }
    })

    downloadTask.onProgressUpdate((res) => {
      this.setData({
        progress: res.progress
      })
      // console.log('下载进度', res.progress)
      // console.log('已经下载的数据长度', res.totalBytesWritten)
      // console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)

    })
  },
})