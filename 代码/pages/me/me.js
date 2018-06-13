// pages/me/me.js
var app = getApp()
var config = require('../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 企业ID
    qyid: '',
    // 用户头像链接
    logo: '',
    roleName:'企业用户',
    // 页面显示参数
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

  // 跳转输入页面
  jumpInput: function (e) {
    var viewId = e.currentTarget.id;
    var placeholder = ""
    var inputstring = ""
    if (viewId == "companyName") {
      placeholder = "请输入企业名称"
      inputstring = this.data.showCompanyName
    } else if (viewId == "contact") {
      placeholder = "请输入联系人"
      inputstring = this.data.showContact
    } else if (viewId == "phone") {
      placeholder = "请输入联系方式"
      inputstring = this.data.showPhone
    } else if (viewId == "email") {
      placeholder = "请输入邮箱"
      inputstring = this.data.showEmail
    } else if (viewId == "address") {
      placeholder = "请输入企业地址"
      inputstring = this.data.showAddress
    }
    wx.navigateTo({
      url: '../common/inputPage?id=' + viewId + '&placeholder=' + placeholder + '&inputstring=' + inputstring
    })
  },
  // 跳转单选列表
  jumpRadio: function (e) {
    var that = this
    var viewId = e.currentTarget.id;
    var sourceData = null
    var selected = null
    if (viewId == "companyPlace") {
      selected = this.data.companyPlace
      //调用应用实例的方法获取全局数据
      app.getCompanyPlace(null, function (companyPlace) {
        sourceData = companyPlace
        that.jumpRadioPage(viewId, sourceData, selected)
      })
    } else if (viewId == "companyType") {
      selected = null
      //调用应用实例的方法获取全局数据
      app.getCompanyType(null, function (companyType) {
        sourceData = companyType
        that.jumpRadioPage(viewId, sourceData, selected)
      })
    }
  },
  jumpRadioPage: function (viewId, sourceData, selected) {
    wx.navigateTo({
      url: '../common/selectRadioList?id=' + viewId + '&data=' + JSON.stringify(sourceData) + '&selected=' + JSON.stringify(selected)
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
        if (app.globalData.userInfo.repIsqy == '否') {
          that.setData({
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
          })
        } else {
          that.setData({
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