// pages/danger/dangerDetail.js
var util = require('../../utils/util.js');
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yhid: "",
    imageList: [],
    imageViewHeight: 0,

    // 隐患详情显示参数
    // 企业名称
    qymc: "",
    // 行业类型
    hylx: "",
    // 隐患类别
    yhlb: "",
    // 存在问题
    czwt: "",
    // 问题描述
    wtms: "",
    // 可造成后果
    kzchg: "",
    // 潜在事故
    qzsg: "",
    // 整改建议
    zgjy: "",
    // 提交时间
    tjsj: "",
    // 提交位置
    tjwz: "",


    // 隐患处理参数
    // 整改人
    zgr: "",
    // 整改完成日期
    date: "",
    // 整改措施
    zgcs: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var yhid = options.yhid
    this.setData({
      yhid: yhid
    })

    this.getDetail()
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatDate(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      date: time
    });
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
  // 查询隐患详情
  getDetail: function (e) {
    var that = this
    var params = {
      "yhid": that.data.yhid
    }
    request.requestLoading(config.getOneYh, params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res);
      if (res.repCode == '200') {
        that.setData({
          dangerId: res.recordid
        });
        that.submitImage();
      } else {
        wx.showToast({
          title: res.repMsg
        });
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败'
      });
    });
  },
  // 跳转输入页面
  jumpInput: function (e) {
    var viewId = e.currentTarget.id;
    var placeholder = ""
    var inputstring = ""
    if (viewId == "zgr") {
      placeholder = "请输入整改人"
      inputstring = this.data.zgr
    } else if (viewId == "zgcs") {
      placeholder = "请输入整改措施"
      inputstring = this.data.zgcs
    }
    wx.navigateTo({
      url: '../common/inputPage?id=' + viewId + '&placeholder=' + placeholder + '&inputstring=' + inputstring
    })
  },
  // 选择时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
})