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
    selected: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var viewId = options.id
    var data = options.data
    var selected = options.selected
    
    if (selected != "null") {
      var selectedArr = JSON.parse(selected)
      // for (var i = 0; i < JSON.parse(data).length; i++) {
      //   this.data.selected[JSON.parse(data)[i].id] = false
      // }
      var sele = {}
      for (var i = 0; i < selectedArr.length; i++) {
        // this.data.selected[selectedArr[i].id] = true
        sele[selectedArr[i].id] = true
      }
      this.setData({
        selected: sele
      })
    }

    this.setData({
      viewId: viewId,
      sourceList: JSON.parse(data),
      // selected: JSON.parse(selected)
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
   * checkBox发生change事件
   */
  checkboxChange: function (e) {
    this.data.selected = []
    for(var i=0;i<e.detail.value.length;i++){
      var idx = e.detail.value[i]
      this.data.selected.push(this.data.sourceList[idx])
    }
  },
  // 确定按钮
  submitClick: function () {
    var pages = getCurrentPages();             //  获取页面栈
    var prevPage = pages[pages.length - 2];   // 上一个页面
    if (this.data.viewId == "danger") {
      prevPage.setData({
        danger: this.data.selected
      })
    }
    wx.navigateBack({
      delta: pages.length - 2
    })
  }
})