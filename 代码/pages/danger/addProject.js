// pages/danger/addDanger.js
// 在需要使用的js文件中，导入js  
var util = require('../../utils/util.js');
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var amapFile = require('../../libs/amap-wx.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 项目对象
    item: null,
    // 用户类型
    yhlx: 0,
    // 企业名称
    companyName: null,
    // 项目名称
    projectName: "",
    // 项目编号
    projectNumber: "",
    // 项目负责人
    projectInCharge: "",
    // 项目id
    xmid: "",
    // 项目状态
    xmzt: "",
    // 检查日期
    checkTime: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.item != null) {
      var item = JSON.parse(options.item)
      var companyObj = {
        "name": item.qymc,
        "id": item.qyid
      }
      this.setData({
        item: item,
        companyName: companyObj,
        projectName: item.xmmc,
        projectNumber: item.xmbh,
        projectInCharge: item.xmfzr,
        xmid: item.xmid,
        xmzt: item.xmzt,
      })
    }
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
  // 跳转输入页面
  jumpInput: function (e) {
    if (this.data.xmzt == "1") {
      return
    }
    var viewId = e.currentTarget.id;
    var placeholder = ""
    var inputstring = ""
    if (viewId == "companyName") {
      placeholder = "请输入企业名称"
      inputstring = this.data.companyName
    } else if (viewId == "projectName") {
      placeholder = "请输入项目名称"
      inputstring = this.data.projectName
    } else if (viewId == "projectNumber") {
      placeholder = "请输入项目编号"
      inputstring = this.data.projectNumber
    } else if (viewId == "projectInCharge") {
      placeholder = "请输入项目负责人"
      inputstring = this.data.projectInCharge
    }
    wx.navigateTo({
      url: '../common/inputPage?id=' + viewId + '&placeholder=' + placeholder + '&inputstring=' + inputstring
    })
  },
  // 跳转单选列表
  jumpRadio: function (e) {
    if (this.data.xmzt == "1") {
      return
    }
    var viewId = e.currentTarget.id;
    var sourceData = null
    var selected = null

    if (viewId == "companyName") {
      selected = this.data.companyName
      var param = {
        "userid": app.globalData.userInfo.userid
      }
      //调用应用实例的方法获取全局数据
      app.getCompanyName(param, function (companyName) {
        sourceData = companyName == null ? [] : companyName
        wx.navigateTo({
          url: '../common/selectRadioList?id=' + viewId + '&data=' + JSON.stringify(sourceData) + '&selected=' + JSON.stringify(selected)
        })
      })
    }

    if (viewId == "rectifyType") {
      selected = this.data.rectifyType
      sourceData = app.globalData.rectifyType
      wx.navigateTo({
        url: '../common/selectRadioList?id=' + viewId + '&data=' + JSON.stringify(sourceData) + '&selected=' + JSON.stringify(selected)
      })
    }
  },
  // 隐患处理
  jumpDanger: function (e) {
    wx.navigateTo({
      url: '../danger/dangerCheckList?item=' + JSON.stringify(this.data.item) + '&pageType=0'
    })
  },
  // 新建隐患
  addDanger: function (e) {
    if (this.data.item != null && this.data.item.xmzt == "1") {
      wx.showToast({
        title: '已归档项目不能新建隐患',
        icon: 'none',
      })
      return
    }
    wx.navigateTo({
      url: '../danger/addDanger?item=' + JSON.stringify(this.data.item)
    })
  },
  // 提交事件
  submitClick: function (e) {
    this.setData({
      xmzt: "0"
    })
    this.editProject()
  },
  // 归档
  fileClick: function (e) {
    this.setData({
      xmzt: "1"
    })
    this.editProject()
  },
  editProject: function () {
    if (this.checkInput() == false) {
      return
    }
    var that = this
    var companyName = this.data.companyName.name
    var qyid = this.data.companyName.id
    var params = {
      "xmid": that.data.xmid,
      "userid": app.globalData.userInfo.userid,
      "qyid": qyid,
      "qymc": companyName,
      "xmmc": that.data.projectName,
      "xmbh": that.data.projectNumber,
      "xmfzr": that.data.projectInCharge,
      "xmzt": that.data.xmzt,
      "jcrq": that.data.checkTime,
    }
    request.requestLoading(config.createProjcet, params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
      if (res.repCode == '200') {
        wx.showToast({
          title: res.repMsg,
          complete: setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        })
      } else {
        wx.showToast({
          title: res.repMsg,
          icon: 'none'
        })
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },
  // 判断必填项
  checkInput: function () {
    var showText = ""
    if (this.data.companyName == "") {
      showText = "请输入企业名称"
    }
    if (this.data.projectName == "") {
      showText = "请输入项目名称"
    }
    // if (this.data.projectNumber == "") {
    //   showText = "请输入项目编号"
    // }
    // if (this.data.projectInCharge == "") {
    //   showText = "请输入项目负责人"
    // }
    if (app.globalData.userInfo.yhlx != "0") {
      if (this.data.companyName == null) {
        showText = "请选择企业"
      }
    }

    if (showText != "") {
      wx.showToast({
        title: showText,
        icon: 'none'
      })
      return false
    } else {
      return true
    }
  },
  // 判断是否登录
  checkLogin: function () {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        app.globalData.userInfo = res.data
        that.setData({
          yhlx: app.globalData.userInfo.yhlx
        })
      }, fail: function (res) {
        wx.navigateTo({
          url: '../login/chooseLoginType'
        })
      }
    })
  },
  // 选择时间
  bindDateChange: function (e) {
    this.setData({
      checkTime: e.detail.value
    })
  },
})