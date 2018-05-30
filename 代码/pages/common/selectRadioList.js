// pages/common/selectRadioList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewId: "",
    // 数据源
    sourceList: null,
    // 选中的项
    selected: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var viewId = options.id
    var data = options.data
    var selected = options.selected
    this.setData({
      viewId: viewId,
      sourceList: JSON.parse(data),
      selected: JSON.parse(selected)
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
  /**
   * radio发生change事件
   */
  radioChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.name)
    var pages = getCurrentPages();             //  获取页面栈
    var prevPage = pages[pages.length - 2];   // 上一个页面
    if (this.data.viewId == "industryType") {
      prevPage.setData({
        industryType: this.data.sourceList[e.detail.value]
      })
    } else if (this.data.viewId == "dangerType1") {
      prevPage.setData({
        dangerType1: this.data.sourceList[e.detail.value]
      })
    } else if (this.data.viewId == "dangerType2") {
      prevPage.setData({
        dangerType2: this.data.sourceList[e.detail.value]
      })
    } else if (this.data.viewId == "problem") {
      prevPage.setData({
        problem: this.data.sourceList[e.detail.value]
      })
    }
    wx.navigateBack({
      delta: pages.length - 2
    })
  }
})