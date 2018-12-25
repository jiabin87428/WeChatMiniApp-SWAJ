// pages/danger/dangerDetail.js
var util = require('../../utils/util.js');
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editable: true,
    yhzt: "",
    qyid: "",
    yhid: "",
    // 缩略图
    imageList: [],
    // 高清图
    bigImageList: [],
    littleImageWidth: 0,
    imageViewHeight: 0,
    wcImageViewHeight: 100,

    // 整改后照片列表 - 缩略图
    wcImageList:[],
    // 高清图
    bigWcImgList: [],

    // 隐患详情显示参数
    // 项目id
    xmid: "",
    // 项目名称
    xmmc: "",
    // 项目状态
    xmzt: "",
    // 企业名称
    qymc: "",
    // 隐患级别
    yhjb: "",
    // 隐患分类
    yhfl: "",    
    // 问题描述
    wtms: "",
    // 法律依据
    clause: "",
    // 可造成后果
    kzchg: "",
    // 整改建议
    zgjy: "",
    // 提交时间
    tjsj: "",
    // 整改期限
    zgqx: "",


    // 隐患处理参数
    // 整改负责人
    zgr: "",
    // 整改完成日期
    date: "请选择完成日期",
    // 整改完成情况
    zgcs: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let screenWidth = wx.getSystemInfoSync().windowWidth
    this.setData({
      littleImageWidth: (screenWidth - 50) / 4
    })

    var yhid = options.yhid
    var yhzt = options.yhzt
    var editable = options.editable == null ? true : false
    this.setData({
      yhid: yhid,
      yhzt: yhzt,
      editable: editable
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
      if (res.repCode == null || res.repCode != '500') {
        var imgList = []
        var wcImgList = []
        var bigImgList = []
        var bigWcImgList = []
        for (var i = 0; i < res.zplist.length; i++) {
          var id = config.loadYhPhoto + res.zplist[i].id
          var bigId = config.loadBigPhoto + res.zplist[i].id
          var name = res.zplist[i].name
          if (name == 'zgqzp') {
            imgList.push(id)
            bigImgList.push(bigId)
          }else{
            wcImgList.push(id)
            bigWcImgList.push(bigId)
          }
        }
        var zgqx = res.zgwcrq
        if (zgqx == "") {
          if (res.xmzt != "1" && res.yhzt != "0") {
            zgqx = "请选择完成日期"
          }
        }
        that.setData({
          xmid: res.xmid,
          xmmc: res.xmmc,
          xmzt: res.xmzt,
          qyid: res.qyid,
          // 企业名称
          qymc: res.qymc,
          // 隐患级别
          yhjb: res.yhjb,
          // 隐患分类
          yhfl: res.yhfl,
          // 问题描述
          wtms: res.wtms,
          // 对应条款
          clause: res.dytk,
          // 可造成后果
          kzchg: "",
          // 整改建议
          zgjy: res.zgjy == null ? '' : res.zgjy,
          // 提交时间
          tjsj: res.tjsj,
          // 整改期限
          zgqx: res.zgqx,
          // 照片列表
          imageList: imgList,
          // 完成照片列表
          wcImageList: wcImgList,
          // 高清图
          bigImgList: bigImgList,
          // 完成高清图
          bigWcImgList: bigWcImgList,
          // 整改负责人
          zgr: res.zgfzr == null ? "" : res.zgfzr,
          // 整改完成日期
          date: zgqx,
          // 整改完成情况
          zgcs: res.zgwcqk == null ? "" : res.zgwcqk
        });
        var num = 1
        if (that.data.yhzt == "0" || that.data.xmzt == "1") {
          num = 0
        }
        that.setData({
          imageViewHeight: Math.ceil((that.data.imageList.length) / 4) * (that.data.littleImageWidth + 8),
          wcImageViewHeight: Math.ceil((that.data.wcImageList.length + num) / 4) * (that.data.littleImageWidth + 8)
        })
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
  // 浏览图片
  viewPhoto: function (e) {
    var _this = this
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: _this.data.bigImgList // 需要预览的图片http链接列表
    })
  },
  // 添加图片
  addPhoto: function () {
    if (this.data.xmzt == '1' || this.data.editable == false) {
      return
    }
    var _this = this;
    wx.chooseImage({
      success: function (res) {
        _this.setData({
          wcImageList: _this.data.wcImageList.concat(res.tempFilePaths),
        })

        _this.setData({
          wcImageViewHeight: Math.ceil((_this.data.wcImageList.length + 1) / 4) * (_this.data.littleImageWidth + 8)
        })
      }
    })
  },
  // 浏览整改后图片
  viewWcPhoto: function (e) {
    var _this = this
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: _this.data.bigWcImgList // 需要预览的图片http链接列表
    })
  },
  // 删除图片
  deleteImage: function (e) {
    if (this.data.editable == false) {
      return
    }
    var _this = this
    var currentIdx = e.currentTarget.id;
    var list = _this.data.wcImageList;
    list.splice(currentIdx, 1)
    _this.setData({
      wcImageList: list
    })
    _this.setData({
      wcImageViewHeight: Math.ceil((_this.data.wcImageList.length + 1) / 4) * (_this.data.littleImageWidth + 8)
    })
  },
  // 跳转输入页面
  jumpInput: function (e) {
    if (this.data.editable == false) {
      return
    }
    if (this.data.xmzt == '1') {
      return
    }
    if (this.data.yhzt == '0') {
      return
    }
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

  // 提交隐患
  submitClick: function (e) {
    var that = this
    var params = {
      "xmid": that.data.xmid,
      "xmmc": that.data.xmmc,
      "yhid": that.data.yhid,
      "yhzt": "0",
      "qyid": that.data.qyid,
      "zgwcqk": that.data.zgcs,
      "zgfzr": that.data.zgr,
      "zgwcrq": that.data.date == "请选择完成日期" ? "" : that.data.date,
    }
    request.requestLoading(config.insertYh, params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
      if (res.repCode == '200') {
        if (that.data.wcImageList.length > 0) {
          that.submitImage()
        }else {
          wx.showToast({
            title: '隐患处理成功',
            complete: setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1500)
          })
        }
      } else {
        wx.showToast({
          title: res.repMsg,
          icon: 'none'
        })
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
        icon: 'none'
      })
    })
  },
  // 提交图片事件
  submitImage: function () {
    app.uploadDIY('?yhid=' + this.data.yhid + '&zptype=zghzp', this.data.wcImageList, 0, 0, 0, this.data.wcImageList.length, function (resultCode) {
      if (resultCode == '200') {
        wx.showToast({
          title: '隐患处理成功',
          complete: setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        })
      }
    })
  },
})