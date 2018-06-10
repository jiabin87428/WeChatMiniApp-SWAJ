// pages/me/me.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roleName:'企业用户',
    // 页面显示参数
    // 企业全称
    companyName: '上海歌略软件科技有限公司',
    // 企业属地
    companyPlace: null,
    // 企业类型
    companyType: '测试类型',
    // 联系人
    contact: '王娇龙',
    // 联系方式
    phone: '13900000000',
    // 邮箱
    email: 'gelure@contact.com',
    // 企业地址
    address: '上海市浦东新区XX路100号',
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
    } else if (viewId == "companyType1") {
      selected = this.data.companyType1
      //调用应用实例的方法获取全局数据
      app.getCompanyType(null, function (companyType) {
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
        that.getStatistics()
        if (app.globalData.userInfo.repIsqy == '否') {
          that.setData({
            roleName: '监管用户',
          })
        } else {
          that.setData({
            roleName: '企业用户',
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
})