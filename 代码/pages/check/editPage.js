// pages/check/editPage.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewId : '',
    // 当前编辑的项目
    currentEdit : '',

    // 返回对象
    returnObj : {},

    // 日期
    date : '请选择日期',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var viewId = options.id
    var data = options.data
    this.setData({
      viewId: viewId,
      returnObj: JSON.parse(data),
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

  // 单选
  radioChange: function (e) {
    this.data.returnObj[e.currentTarget.id] = e.detail.value
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  // 选择日期
  bindDateChange: function (e) {
    var obj = this.data.returnObj
    obj[e.currentTarget.id] = e.detail.value
    this.setData({
      date: e.detail.value,
      returnObj: obj
    })
  },

  // 选择等级
  pickLevel: function (e) {
    var that = this
    wx.showActionSheet({
      itemList: ['一级', '二级', '三级'],
      success: function (res) {
        // console.log(res.tapIndex)
        var list = ['一级', '二级', '三级']
        var obj = that.data.returnObj
        obj[e.currentTarget.id] = list[res.tapIndex]
        that.setData({
          returnObj: obj
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  // 保存
  submit: function (e) {
    var pages = getCurrentPages();             //  获取页面栈
    var prevPage = pages[pages.length - 2];   // 上一个页面
    var key = this.data.viewId
    // prevPage.data.params[[key]] = this.data.returnObj
    // prevPage.data.assign(this.data.returnObj)
    var obj = util.mergeObject(prevPage.data.params, this.data.returnObj)
    prevPage.setData({
      params: obj
    })
    wx.navigateBack({
      delta: 1
    })
  }
})