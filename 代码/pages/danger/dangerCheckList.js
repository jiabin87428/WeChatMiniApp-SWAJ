var app = getApp()
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
// pages/danger/dangerCheckList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,
    // 隐患列表
    dangerList: [
      // {
      //   "qymc": "欢天喜地鞭炮销售店",
      //   "recordid": "B2A63870974F4913A7FE215A56B0B2B8", 
      //   "yhfxrq": "2018-05-06", 
      //   "yhnr": "业人员教育培训试试"        
      // },{
      //   "qymc": "欢天喜地鞭炮销售店",
      //   "recordid": "FEF1112ACE414874B3F71F17B44D0433",
      //   "yhfxrq": "2018-05-03",
      //   "yhnr": "需要培训"
      //   }
    ]
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
    var that = this
    var params = {
      "repIsqy": app.globalData.userInfo.repIsqy,
      "repRecordid": app.globalData.userInfo.repRecordid
    }
    this.reqDangerList(params)
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
  // 点击查看隐患详情
  getDetail: function () {
    wx.navigateTo({
      url: '../danger/dangerDetail'
    })
  },
  // 获取隐患列表
  reqDangerList: function (searchObj, cb) {
    var that = this
    //调用接口
    request.requestLoading(config.getYhList, searchObj, '正在加载数据', function (res) {
      console.log(res)
      if (res.repCode == '200') {
        that.setData({
          dangerList: res.repYhList
        })
      }else {
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