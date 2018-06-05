// pages/danger/addDanger.js
// 在需要使用的js文件中，导入js  
var util = require('../../utils/util.js');
var request = require('../../utils/request.js')
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    littleImageWidth: 0,
    imageViewHeight: 100,
    time:"",
    // 企业名称
    companyName: "",
    // 行业类型
    industryType: null,
    // 隐患大类
    dangerType1: null,
    // 隐患小类
    dangerType2: null,
    // 存在问题
    problem: null,
    // 问题描述
    desc: "",
    // 可能造成后沟
    result: "",
    // 潜在事故
    danger: null,
    // 整改建议
    advise: "",

    // 显示潜在事故字符串
    dangerString: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let screenWidth = wx.getSystemInfoSync().windowWidth
    this.setData({
      littleImageWidth: (screenWidth - 50) / 4
    })

    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      time: time
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
    if (this.data.danger != null) {
      this.setData({
        dangerString: ""
      })
      for (var i = 0; i < this.data.danger.length; i++) {
        var name = this.data.danger[i].name
        this.setData({
          dangerString: this.data.dangerString + " " + name
        })
      }
    }
    console.log('123')
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
  // 添加图片
  addPhoto: function () {
    var _this = this;
    wx.chooseImage({
      success: function (res) {
        _this.setData({
          imageList: _this.data.imageList.concat(res.tempFilePaths),
        })

        _this.setData({
          imageViewHeight: Math.ceil((_this.data.imageList.length + 1) / 4) * (_this.data.littleImageWidth + 8)
        })

        // wx.getImageInfo({
        //   src: res.tempFilePaths[0],
        //   success: function (res) {
        //     console.log(res.width)
        //     console.log(res.height)
        //   }
        // })
      }
    })
  },
  // 浏览图片
  viewPhoto: function (e) {
    var _this = this
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: _this.data.imageList // 需要预览的图片http链接列表
    })
  },
  // 删除图片
  deleteImage: function (e) {
    var _this = this
    var currentIdx = e.currentTarget.id;
    var list = _this.data.imageList;
    list.splice(currentIdx,1)
    _this.setData({
      imageList: list
    })
    _this.setData({
      imageViewHeight: Math.ceil((_this.data.imageList.length + 1) / 4) * (_this.data.littleImageWidth + 8)
    })
  },
  // 跳转输入页面
  jumpInput: function (e) {
    var viewId = e.currentTarget.id;
    var placeholder = ""
    var inputstring = ""
    if (viewId == "companyName") {
      placeholder = "请输入企业名称"
      inputstring = this.data.companyName
    } else if (viewId == "problem") {
      placeholder = "请输入存在问题"
      inputstring = this.data.problem
    } else if (viewId == "desc") {
      placeholder = "请输入问题描述"
      inputstring = this.data.desc
    } else if (viewId == "result") {
      placeholder = "请输入可能造成的后果"
      inputstring = this.data.result
    } else if (viewId == "advise") {
      placeholder = "请输入整改建议"
      inputstring = this.data.advise
    }
    wx.navigateTo({
      url: '../common/inputPage?id=' + viewId + '&placeholder=' + placeholder + '&inputstring=' + inputstring
    })
  },
  // 跳转单选列表
  jumpRadio: function (e) {
    var viewId = e.currentTarget.id;
    var sourceData = null
    var selected = null
    if (viewId == "industryType") {
      sourceData = app.globalData.industryType
      selected = this.data.industryType
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
      sourceData = app.globalData.industryType
      selected = this.data.danger
    }
    wx.navigateTo({
      url: '../common/selectCheckList?id=' + viewId + '&data=' + JSON.stringify(sourceData) + '&selected=' + JSON.stringify(selected)
    })
  },
  // 提交事件
  submitClick: function (e) {
    request.requestLoading('http://www.kuaidi100.com/query?type=yuantong&postid=11111111111', '', '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  }
})