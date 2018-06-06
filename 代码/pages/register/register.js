var app = getApp()

// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyName: "",
    contactName: "",
    contactEmail: "",
    password: "",
    comformPassword: "",
    phone: "",
    companyPlace: null,
    companyType: null,
    range: null,
    address: ""
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
    console.log("111111")
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
  // Input输入监听  
  textInput: function (e) {
    var val = e.detail.value;
    var inputId = e.currentTarget.id;
    if (inputId == "companyName") {
      this.setData({
        companyName: val
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
      app.getCompanyPlace(function (companyPlace) {
        sourceData = companyPlace
        that.jumpRadioPage(viewId, sourceData, selected)
        // //更新数据
        // that.setData({
        //   companyPlace: companyPlace
        // })
      })
    } else if (viewId == "dangerType1") {
      sourceData = app.globalData.dangerType1
      selected = this.data.dangerType1
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
})