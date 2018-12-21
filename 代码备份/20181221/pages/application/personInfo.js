// pages/application/personInfo.js
var app = getApp()
var config = require('../../utils/config.js')
var request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 企业id
    qyid: "",

    // 主要负责人
    zyfzr: "",
    // 主要负责人固定电话
    zyfzrgddh: "",
    // 主要负责人手机
    zyfzryddh: "",
    // 主要负责人邮箱
    zyfzrdzyx: "",
    // 从业人员数量
    cyrysl: "",
    // 特种作业人员数量
    tzzyrysl: "",
    // 专职安全生产管理人员数量
    zzaqglrysl: "",
    // 兼职安全生产管理人员数量
    jzaqglrysl: "",
    // 专职应急管理人员数量
    zzyjglrysl: "",
    // 注册安全工程师人员数量
    zcaqgcsrysl: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
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
      that.setData({
        // 主要负责人
        zyfzr: res.zyfzr == null ? "" : res.zyfzr,
        // 主要负责人固定电话
        zyfzrgddh: res.zyfzrgddh == null ? "" : res.zyfzrgddh,
        // 主要负责人手机
        zyfzryddh: res.zyfzryddh == null ? "" : res.zyfzryddh,
        // 主要负责人邮箱
        zyfzrdzyx: res.zyfzrdzyx == null ? "" : res.zyfzrdzyx,
        // 从业人员数量
        cyrysl: res.cyrysl == null ? "" : res.cyrysl,
        // 特种作业人员数量
        tzzyrysl: res.tzzyrysl == null ? "" : res.tzzyrysl,
        // 专职安全生产管理人员数量
        zzaqglrysl: res.zzaqglrysl == null ? "" : res.zzaqglrysl,
        // 兼职安全生产管理人员数量
        jzaqglrysl: res.jzaqglrysl == null ? "" : res.jzaqglrysl,
        // 专职应急管理人员数量
        zzyjglrysl: res.zzyjglrysl == null ? "" : res.zzyjglrysl,
        // 注册安全工程师人员数量
        zcaqgcsrysl: res.zcaqgcsrysl == null ? "" : res.zcaqgcsrysl,
      })
    })
  },
})