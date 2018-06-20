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
    sfyzg: "false",
    qyid: "",
    yhid: "",
    imageList: [],
    littleImageWidth: 0,
    imageViewHeight: 0,
    wcImageViewHeight: 100,

    // 整改后照片列表
    wcImageList:[],

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
    // 潜在隐患
    qzyh: "",
    // 整改期限
    xqzgrq: "",
    // 整改建议
    zgjy: "",
    // 提交时间
    tjsj: "",


    // 隐患处理参数
    // 整改负责人
    zgr: "",
    // 整改完成日期
    date: "",
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
    var sfyzg = options.sfyzg
    this.setData({
      yhid: yhid,
      sfyzg: sfyzg
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
        for (var i = 0; i < res.zplist.length; i++) {
          var id = config.loadYhPhoto + res.zplist[i].id
          var name = res.zplist[i].name
          if (name == 'zgqzp') {
            imgList.push(id)
          }else{
            wcImgList.push(id)
          }
        }
        that.setData({
          qyid: res.qyid,
          // 企业名称
          qymc: res.qymc,
          // 行业类型
          hylx: "",
          // 隐患类别
          yhlb: "",
          // 存在问题
          czwt: "",
          // 问题描述
          wtms: res.wtms,
          // 可造成后果
          kzchg: "",
          // 潜在隐患
          qzyh: res.qzyh == null ? '' : res.qzyh,
          // 整改期限
          xqzgrq: res.xqzgrq,
          // 整改建议
          zgjy: res.zgjy == null ? '' : res.zgjy,
          // 提交时间
          tjsj: res.tjsj,
          // 照片列表
          imageList: imgList,
          // 完成照片列表
          wcImageList: wcImgList,
          // 整改负责人
          zgr: res.zgfzr == null ? "" : res.zgfzr,
          // 整改完成日期
          date: res.zgwcrq == null ? "" : res.zgwcrq,
          // 整改完成情况
          zgcs: res.zgwcqk == null ? "" : res.zgwcqk
        });
        that.setData({
          imageViewHeight: Math.ceil((that.data.imageList.length) / 4) * (that.data.littleImageWidth + 8),
          wcImageViewHeight: Math.ceil((that.data.wcImageList.length + 1) / 4) * (that.data.littleImageWidth + 8)
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
      urls: _this.data.imageList // 需要预览的图片http链接列表
    })
  },
  // 添加图片
  addPhoto: function () {
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
      urls: _this.data.wcImageList // 需要预览的图片http链接列表
    })
  },
  // 删除图片
  deleteImage: function (e) {
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
    if (this.data.sfyzg == 'true') {
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
      "yhid": that.data.yhid,
      "sfyzg": "true",
      "qyid": that.data.qyid,
      "zgwcqk": that.data.zgcs,
      "zgfzr": that.data.zgr,
      "zgwcrq": that.data.date,
    }
    request.requestLoading(config.insertYh, params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
      if (res.repCode == '200') {
        that.submitImage()
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
  },
  // 提交图片事件
  submitImage: function () {
    app.uploadDIY('?yhid=' + this.data.yhid + '&zptype=zghzp', this.data.wcImageList, 0, 0, 0, this.data.wcImageList.length, function (resultCode) {
      if (resultCode == '200') {
        wx.showToast({
          title: '隐患处理成功',
          complete: wx.navigateBack({
            delta: 1
          })
        })
      }
    })
  },
})