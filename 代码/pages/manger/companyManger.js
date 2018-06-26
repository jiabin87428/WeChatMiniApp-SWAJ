// pages/manger/companyManger.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyList: null,
    companyPlace: null,
    companyType1: null,
    companyType2: null,
    companyName: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCompanyList()
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
    if (this.data.companyPlace != null || this.data.companyType1 != null || this.data.companyType2 != null){
      this.getCompanyList()
    }
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
  // 获取公司名称列表
  getCompanyList: function (e) {
    var that = this
    var searchData = null
    var placeId = ""
    var typeId = ""
    if (this.data.companyPlace != null) {
      placeId = that.data.companyPlace.id
    }
    if (this.data.companyType1 != null && this.data.companyType2 != null) {
      typeId = that.data.companyType2.id
    }
    searchData = {
      "companyName": that.data.companyName,
      "companyLocalid": placeId,
      "companyTypeid": typeId
    }
    app.getCompanyName(searchData, function (companyName) {
      that.setData({
        companyList: companyName
      })
    })
  },
  // 搜索公司名称列表
  searchClick: function (e) {
    var that = this
    that.setData({
      companyPlace: null,
      companyType1: null,
      companyType2: null,
      companyName: e.detail.value
    })
    app.getCompanyName({ "companyName": e.detail.value }, function (companyName) {
      that.setData({
        companyList: companyName
      })
    })
  },
  // 跳转筛选界面
  jumpFilter: function (e) {
    wx.navigateTo({
      url: '../manger/companyFilter?companyPlace=' + JSON.stringify(this.data.companyPlace) + '&companyType1=' + JSON.stringify(this.data.companyType1) + '&companyType2=' + JSON.stringify(this.data.companyType2)
    })
  },
  // 跳转企业信息页面
  jumpCompanyInfoPage: function (e) {
    wx.navigateTo({
      url: '../application/companyInfoList?qyid=' + e.currentTarget.dataset.id
    })
  }
})