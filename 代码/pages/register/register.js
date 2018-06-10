var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var amapFile = require('../../libs/amap-wx.js');
var app = getApp()

// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 企业全称
    companyName: "",
    // 企业简称
    shortName: "",
    contactName: "",
    contactEmail: "",
    password: "",
    comformPassword: "",
    phone: "",
    companyPlace: [],
    companyType1: [],
    companyType2: [],
    address: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCurrentAddress()
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
    console.log("111111")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

    console.log("222222")
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
  // Input输入监听  
  textInput: function (e) {
    var val = e.detail.value;
    var inputId = e.currentTarget.id;
    if (inputId == "companyName") {
      this.setData({
        companyName: val
      });
    }
    if (inputId == "shortName") {
      this.setData({
        shortName: val
      });
    }
    if (inputId == "contactName") {
      this.setData({
        contactName: val
      });
    }
    if (inputId == "contactEmail") {
      this.setData({
        contactEmail: val
      });
    }
    if (inputId == "password") {
      this.setData({
        password: val
      });
    }
    if (inputId == "comformPassword") {
      this.setData({
        comformPassword: val
      });
    }
    if (inputId == "phone") {
      this.setData({
        phone: val
      });
    }
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
      app.getCompanyPlace(null,function (companyPlace) {
        sourceData = companyPlace
        that.jumpRadioPage(viewId, sourceData, selected)
      })
    } else if (viewId == "companyType1") {
      selected = this.data.companyType1
      //调用应用实例的方法获取全局数据
      app.getCompanyType(null,function (companyType) {
        sourceData = companyType
        that.jumpRadioPage(viewId, sourceData, selected)
      })
    } else if (viewId == "dangerType2") {
      sourceData = app.globalData.dangerType2
      selected = this.data.dangerType2
    } else if (viewId == "problem") {
      sourceData = app.globalData.problemType
      selected = this.data.problem
    }
  },
  jumpRadioPage: function (viewId, sourceData, selected) {
    wx.navigateTo({
      url: '../common/selectRadioList?id=' + viewId + '&data=' + JSON.stringify(sourceData) + '&selected=' + JSON.stringify(selected)
    })
  },
  // 跳转多选列表
  jumpCheckBox: function (e) {
    var viewId = e.currentTarget.id;
    var sourceData = null
    var selected = null
    if (viewId == "danger") {
      sourceData = app.globalData.dangerType
      selected = this.data.danger
    }
    wx.navigateTo({
      url: '../common/selectCheckList?id=' + viewId + '&data=' + JSON.stringify(sourceData) + '&selected=' + JSON.stringify(selected)
    })
  },
  // 高德地图获取当前地址
  getCurrentAddress: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'f28afe6170399e78d1f7e1b672c1fa49' });
    myAmapFun.getRegeo({
      success: function (data) {
        if (data.length > 0) {
          let item = data[0]
          console.log(item.name)
          that.setData({
            address: item.name
          })
        }
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
  },
  // 注册
  submitClick: function (e) {
    var params = {
      "companyName": this.data.companyName,
      "shortName": this.data.shortName,
      "companyLocalid": this.data.companyPlace.id,
      "companyLocal": this.data.companyPlace.name,
      "companyTypeid": this.data.companyType2.id,
      "companyType": this.data.companyType1.name + '/' + this.data.companyType2.name,
      "inChargePerson": this.data.contactName,
      "email": this.data.contactEmail,
      "password": this.data.password,
      "mobile": this.data.phone,
      "address": this.data.address
    }
    request.requestLoading(config.register, params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
      if (res.repCode == '200') {
        wx.showToast({
          title: '注册成功',
        })
        wx.navigateBack({
          delta: 1
        })
      }else {
        wx.showToast({
          title: '注册失败',
        })
      }
    }, function () {
      wx.showToast({
        title: '注册失败',
      })
    })
  }
})