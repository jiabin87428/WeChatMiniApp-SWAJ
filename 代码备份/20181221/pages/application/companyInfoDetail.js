// pages/me/editMe.js
var app = getApp()
var config = require('../../utils/config.js')
var request = require('../../utils/request.js')
var amapFile = require('../../libs/amap-wx.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**  
            * 页面配置  
            */
    winWidth: 0,
    winHeight: 0,
    // Cell高度+底部标题高度+按钮高度
    titleHeight: 356,
    // 地图上的标记
    markers: [],

    // 是否可编辑
    editable: 'false',
    // 修改的参数
    // 企业ID
    qyid: '',
    // 企业全称
    companyName: '企业名称',
    // 企业属地
    companyPlace: '',
    // 企业类型
    companyType: '',
    // 联系人
    contact: '企业联系人',
    // 联系方式
    phone: '联系方式',
    // 邮箱
    email: '邮箱',
    // 企业地址
    address: '企业地址',

    longitude: '0',
    latitude: '0',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    /**  
         * 获取系统信息  
         */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

    var myAmapFun = new amapFile.AMapWX({ key: 'f28afe6170399e78d1f7e1b672c1fa49' });
    var qyid = options.qyid
    that.setData({
      qyid: qyid
    })

    that.getQyxx()
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
  getQyxx: function () {
    var that = this
    var params = {
      "qyid": this.data.qyid
    }
    request.requestLoading(config.getQyxx, params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
      var mark = [{
        iconPath: "../../assets/company_position.png",
        id: 99999,
        latitude: res.mapy,
        longitude: res.mapx,
        width: 30,
        height: 30,
      }]
      that.setData({
        companyName: res.repName,
        companyPlace: res.companyLocal,
        companyType: res.companyLocal,
        contact: res.inChargePerson,
        phone: res.mobile,
        email: res.email,
        address: res.address,
        longitude: res.mapx,
        latitude: res.mapy,
        markers: mark
      })
    })
  },
  // 提交按钮
  submit: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
  // 跳转地图坐标选择
  jumpLocation: function (e) {
    wx.navigateTo({
      url: '../common/chooseLocation?longitude=' + this.data.longitude + '&latitude=' + this.data.latitude
    })
  }
})