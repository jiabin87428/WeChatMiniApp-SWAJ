// pages/me/me.js
var app = getApp()
var config = require('../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否企业用户
    isqy: 'false',
    // 企业ID
    qyid: '',
    // 用户头像链接
    logo: '',
    roleName:'企业用户',
    // 企业用户显示
    // 企业全称
    showCompanyName: '企业名称',
    // 企业属地
    showCompanyPlace: null,
    // 企业类型
    showCompanyType: '企业类型',
    // 联系人
    showContact: '企业联系人',
    // 联系方式
    showPhone: '联系方式',
    // 邮箱
    showEmail: '邮箱',
    // 企业地址
    showAddress: '企业地址',

    // 监管用户显示
    // 姓名
    name: '姓名',
    // 性别
    sex: '性别',
    // 岗位
    job: '岗位',
    // 所在部门
    dep: '所在部门',
    // 联系手机
    mobile: '联系手机',
    // 邮箱
    email: '邮箱'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.checkLogin()
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

  // 用户点击换头像
  changeLogo: function (e) {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      success: function (res) {
        that.setData({
          logo: res.tempFilePaths[0]
        })
        app.uploadDIY('?qyid=' + that.data.qyid, [that.data.logo], 0, 0, 0, 1, function (resultCode) {
          if (resultCode == '200') {
            that.checkLogin()
          }
        })
      }
    })
  },
  // 退出登录
  loginOut: function () {
    var that = this
    wx.removeStorage({
      key: 'userInfo',
      success: function (res) {
        app.checkLogin()
      }
    })
  },
  // 判断是否登录
  checkLogin: function () {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        app.globalData.userInfo = res.data
        if (app.globalData.userInfo.repIsqy == 'false') {
          that.setData({
            isqy: 'false',
            roleName: '监管用户',
            qyid: app.globalData.userInfo.repRecordid,
            logo: config.logoImg + app.globalData.userInfo.repRecordid,
            showCompanyName: app.globalData.userInfo.repName,
            showCompanyPlace: "",
            showCompanyType: "",
            showContact: "",
            showPhone: "",
            showEmail: "",
            showAddress: "",

            name: app.globalData.userInfo.name == null ? '' : app.globalData.userInfo.name,
            // 性别
            sex: app.globalData.userInfo.sex == null ? '' : app.globalData.userInfo.sex,
            // 岗位
            job: app.globalData.userInfo.job == null ? '' : app.globalData.userInfo.job,
            // 所在部门
            dep: app.globalData.userInfo.dep == null ? '' : app.globalData.userInfo.dep,
            // 联系手机
            mobile: app.globalData.userInfo.mobile == null ? '' : app.globalData.userInfo.mobile,
            // 邮箱
            email: app.globalData.userInfo.email == null ? '' : app.globalData.userInfo.email
          })
        } else {
          that.setData({
            isqy: 'true',
            qyid: app.globalData.userInfo.repRecordid,
            logo: config.logoImg + app.globalData.userInfo.repRecordid,
            roleName: '企业用户',
            showCompanyName: app.globalData.userInfo.repName,
            showCompanyPlace: app.globalData.userInfo.companyLocal,
            showCompanyType: app.globalData.userInfo.companyType,
            showContact: app.globalData.userInfo.inChargePerson,
            showPhone: app.globalData.userInfo.mobile,
            showEmail: app.globalData.userInfo.email,
            showAddress: app.globalData.userInfo.address,

            name: '',
            sex: '',
            job: '',
            dep: '',
            mobile: '',
            email: ''
          })
        }
        console.log(app.globalData.userInfo)
      }, fail: function (res) {
        wx.navigateTo({
          url: '../login/login'
        })
      }
    })
  },
  // 跳转设置页面
  jumpSetting: function (e) {
    wx.navigateTo({
      url: '../me/editMe'
    })
  }
})