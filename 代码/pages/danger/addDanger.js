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
    imageList: [],
    littleImageWidth: 0,
    imageViewHeight: 100,
    // 是否企业用户
    isqy: true,

    // 提交时间
    time:"",
    // 当前位置
    address:"",
    // 企业名称
    companyName: null,
    // 隐患位置
    latitude: "0",
    longitude: "0",
    // 隐患描述
    desc: "",
    // 潜在隐患
    danger: null,
    // 整改类型
    rectifyType: "",
    // 整改期限
    date: "",
    // 整改建议
    advise: "",

    // 显示潜在事故字符串
    dangerString: "",

    // 第一次提交后返回的隐患id，用户上传图片用
    dangerId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCurrentAddress()
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
    this.checkLogin()


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
  // 跳转地图坐标选择
  jumpLocation: function (e) {
    wx.navigateTo({
      url: '../common/chooseLocation'
    })
  },
  // 跳转单选列表
  jumpRadio: function (e) {
    var viewId = e.currentTarget.id;
    var sourceData = null
    var selected = null

    if (viewId == "companyName") {
      selected = this.data.companyName
      //调用应用实例的方法获取全局数据
      app.getCompanyName(null, function (companyName) {
        sourceData = companyName
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
  // 提交事件
  submitClick: function (e) {
    var that = this
    var companyName = ""
    if (this.data.isqy == true) {
      companyName = app.globalData.userInfo.repName
    }else {
      companyName = this.data.companyName.name
    }
    var params = {
      "yhid": "",
      "qyid": app.globalData.userInfo.repRecordid,
      "qymc": companyName,
      "wtms": this.data.desc,
      "qzyh": this.data.dangerString,
      "zglx": this.data.rectifyType.name,
      "zgqx": this.data.date,
      "zgjy": this.data.advise,
      "tjsj": this.data.time,
      "dqwz": this.data.address,
      "sfyzg": "false",
      "zgwcqk": "",
      "zgfzr": "",
      "zgwcrq": "",
      "repIsqy": app.globalData.userInfo.repIsqy,
      "mapx": this.data.longitude,
      "mapy": this.data.latitude
    }
    request.requestLoading(config.insertYh, params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
      if (res.repCode == '200') {
        that.setData({
          dangerId: res.recordid
        })
        that.submitImage()
      }else {
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
  // 提交图片事件
  submitImage: function() {
    app.uploadDIY('?yhid=' + this.data.dangerId + '&zptype=zgqzp', this.data.imageList, 0, 0, 0, this.data.imageList.length, function (resultCode) {
      if (resultCode == '200') {
        wx.showToast({
          title: '新建成功',
          complete: setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        })
      }
    })
  },
  // 高德地图获取当前地址
  getCurrentAddress: function() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: 'f28afe6170399e78d1f7e1b672c1fa49' });
    myAmapFun.getRegeo({
      success: function (data) {
        if (data.length > 0) {
          let item = data[0]
          console.log(item.name)
          that.setData ({
            address:item.name
          })
        }
      },
      fail: function (info) {
        //失败回调
        console.log(info)
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
            isqy: false
          })
        } else {
          that.setData({
            isqy: true
          })
        }
      }, fail: function (res) {
        wx.navigateTo({
          url: '../login/login'
        })
      }
    })
    // if (app.globalData.userInfo) {
    //   return true
    // }
    // return false
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
})