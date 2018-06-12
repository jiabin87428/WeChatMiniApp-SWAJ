// pages/me/editMe.js
var app = getApp()
var config = require('../../utils/config.js')
var request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 修改的参数
    // 企业ID
    qyid: '',
    // 企业全称
    companyName: '企业名称',
    // 企业属地
    companyPlace: { name: '' },
    // 企业类型1
    companyType1: {name: ''},
    // 企业类型2
    companyType2: { name: '' },
    // 联系人
    contact: '企业联系人',
    // 联系方式
    phone: '联系方式',
    // 邮箱
    email: '邮箱',
    // 企业地址
    address: '企业地址',

    // 属地ID
    companyLocalid: '',
    // 类型ID
    companyTypeid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkLogin()
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
  // 跳转输入页面
  jumpInput: function (e) {
    var viewId = e.currentTarget.id;
    var placeholder = ""
    var inputstring = ""
    if (viewId == "companyName") {
      placeholder = "请输入企业名称"
      inputstring = this.data.companyName
    } else if (viewId == "contact") {
      placeholder = "请输入联系人"
      inputstring = this.data.contact
    } else if (viewId == "phone") {
      placeholder = "请输入联系方式"
      inputstring = this.data.phone
    } else if (viewId == "email") {
      placeholder = "请输入邮箱"
      inputstring = this.data.email
    } else if (viewId == "address") {
      placeholder = "请输入企业地址"
      inputstring = this.data.address
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
  // 判断是否登录
  checkLogin: function () {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        app.globalData.userInfo = res.data
        if (app.globalData.userInfo.repIsqy == '否') {
          that.setData({
            qyid: app.globalData.userInfo.repRecordid,
          })
        } else {
          that.setData({
            qyid: app.globalData.userInfo.repRecordid,
            companyName: app.globalData.userInfo.repName,
            companyPlace: { name: app.globalData.userInfo.companyLocal},
            companyLocalid: app.globalData.userInfo.companyLocalid,
            companyType1: { name: app.globalData.userInfo.companyType},
            companyTypeid: app.globalData.userInfo.companyTypeid,
            contact: app.globalData.userInfo.inChargePerson,
            phone: app.globalData.userInfo.mobile,
            email: app.globalData.userInfo.email,
            address: app.globalData.userInfo.address,
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
  // 提交按钮
  submit: function (e) {
    var that = this
    var params = {
      "yhid": this.data.qyid,
      "companyName": this.data.companyName,
      "companyLocalid": this.data.companyLocalid,
      "companyLocal": this.data.companyPlace.name,
      "companyTypeid": this.data.companyTypeid,
      "companyType": this.data.companyType1.name + this.data.companyType2.name,
      "inChargePerson": this.data.contact,
      "email": this.data.email,
      "mobile": this.data.phone,
      "address": this.data.address
    }
    request.requestLoading(config.updateQyxx, params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
      if (res.repCode == '200') {
        wx.showToast({
          title: '修改成功',
        })
      } else {
        wx.showToast({
          title: res.repMsg,
        })
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  }
})