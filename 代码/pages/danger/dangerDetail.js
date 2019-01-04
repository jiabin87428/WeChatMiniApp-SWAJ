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
    yhlx: 0,
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
    level: "",
    // 隐患分类
    classify: "",    
    // 隐患描述
    desc: "",
    // 法律依据
    clause: "",
    // 可造成后果
    kzchg: "",
    // 整改建议
    advise: "",
    // 提交时间
    checkTime: "",
    // 整改期限
    doneTime: "",


    // 隐患处理参数
    // 整改负责人
    zgr: "",
    // 整改完成日期
    date: "请选择完成日期",
    // 整改完成情况
    zgcs: "",

    newaddImagelist: [],
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
    var editable = options.editable == null ? true : Boolean(options.editable)
    this.setData({
      yhid: yhid,
      yhzt: yhzt,
      editable: editable,
      yhlx: app.globalData.userInfo.yhlx,
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
          level: res.yhjb,
          // 隐患分类
          classify: res.yhfl,
          // 问题描述
          desc: res.wtms,
          // 对应条款
          clause: res.dytk,
          // 可造成后果
          kzchg: "",
          // 整改建议
          advise: res.zgjy == null ? '' : res.zgjy,
          // 提交时间
          checkTime: res.tjsj,
          // 整改期限
          doneTime: res.zgqx,
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

        if(that.data.yhlx == 3) {
          that.setData({
            imageViewHeight: Math.ceil((that.data.imageList.length + num) / 4) * (that.data.littleImageWidth + 8)
          })
        }
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
    } else if (viewId == "classify") {
      placeholder = "请输入隐患分类"
      inputstring = this.data.classify
    } else if (viewId == "advise") {
      if (this.data.yhlx != 3) {
        return
      }
      placeholder = "请输入整改建议"
      inputstring = this.data.advise
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

  // -------------管理用户编辑-------------
  // 选择隐患级别
  selectLevel: function (e) {
    if(this.data.yhlx != 3) {
      return
    }
    var viewId = e.currentTarget.id
    var that = this
    wx.showActionSheet({
      itemList: ['一般隐患', '重大隐患'],
      success: function (res) {
        if (res.tapIndex == 0) {// 一般隐患
          that.setData({
            level: '一般隐患'
          })
        } else if (res.tapIndex == 1) {// 重大隐患
          that.setData({
            level: '重大隐患'
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  // 选择隐患分类
  selectClassify: function (e) {
    if (this.data.yhlx != 3) {
      return
    }
    var viewId = e.currentTarget.id
    var that = this
    wx.showActionSheet({
      itemList: ['自行输入分类', '从分类库选择'],
      success: function (res) {
        if (res.tapIndex == 0) {// 自行输入分类
          that.jumpInput(e)
        } else if (res.tapIndex == 1) {// 从隐患库检索
          wx.navigateTo({
            url: '../danger/dangerClassify'
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  // 选择现场问题输入方式：通过模板选择or直接输入
  selectInputType: function (e) {
    if (this.data.yhlx != 3) {
      return
    }
    var viewId = e.currentTarget.id
    var that = this
    wx.showActionSheet({
      itemList: viewId == "clause" ? ['从隐患库选择', '自行输入问题', '从隐患库检索', '从法规库选择'] : ['从隐患库选择', '自行输入问题', '从隐患库检索'],
      success: function (res) {
        if (res.tapIndex == 0) {// 从模板选择
          wx.navigateTo({
            url: '../danger/dangerTypeSelect'
          })
        } else if (res.tapIndex == 1) {// 自行输入
          that.jumpInput(e)
        } else if (res.tapIndex == 2) {// 从隐患库检索
          wx.navigateTo({
            url: '../danger/dangerDetailSelect'
          })
        } else {// 法规库选择
          wx.navigateTo({
            url: '../danger/clauseList'
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  bindSubmitDateChange: function (e) {
    if (this.data.yhlx != 3) {
      return
    }
    this.setData({
      checkTime: e.detail.value
    })
  },
  // 添加图片
  addPhoto: function () {
    if (this.data.yhlx != 3) {
      return
    }
    var _this = this;
    wx.chooseImage({
      success: function (res) {
        _this.setData({
          imageList: _this.data.imageList.concat(res.tempFilePaths),
          newaddImagelist: _this.data.newaddImagelist.concat(res.tempFilePaths),
        })

        _this.setData({
          imageViewHeight: Math.ceil((_this.data.imageList.length + 1) / 4) * (_this.data.littleImageWidth + 8)
        })
      }
    })
  },
  // 删除图片
  deleteDangerImage: function (e) {
    if (this.data.yhlx != 3) {
      return
    }
    var _this = this
    var currentIdx = e.currentTarget.id;
    var list = _this.data.imageList;

    var item = list[currentIdx]
    var reg = RegExp(/www.gelure.com/);
    if (item.match(reg) == null) {// 不包含, 说明是新增的图片，这时候也要去newaddImagelist里找到并删除对应的
      var newlist = _this.data.newaddImagelist
      for (var i = 0; i < newlist.length; i++) {
        var newItem = newlist[i]
        if (item == newItem) {
          newlist.splice(i, 1)
          i--
        }
      }
      _this.setData({
        newaddImagelist: newlist
      })
    }

    list.splice(currentIdx, 1)
    _this.setData({
      imageList: list
    })
    _this.setData({
      imageViewHeight: Math.ceil((_this.data.imageList.length + 1) / 4) * (_this.data.littleImageWidth + 8)
    })
  },
  // 提交图片事件
  submitDangerImage: function () {
    app.uploadDIY('?yhid=' + this.data.yhid + '&zptype=zgqzp', this.data.newaddImagelist, 0, 0, 0, this.data.newaddImagelist.length, function (resultCode) {
      if (resultCode == '200') {
        wx.showToast({
          title: '成功',
          complete: setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        })
      }
    })
  },
  // 调用新增隐患接口
  submitYH: function () {
    var that = this
    var params = {
      "xmid": this.data.xmid,
      "xmmc": this.data.xmmc,
      "yhid": this.data.yhid,
      "userid": app.globalData.userInfo.userid,
      "qyid": this.data.qyid,
      "qymc": this.data.qymc,
      "yhjb": this.data.level,
      "yhfl": this.data.classify,
      "wtms": this.data.desc,
      "dytk": this.data.clause,
      "zgqx": this.data.doneTime,
      "zgjy": this.data.advise,
      "tjsj": this.data.checkTime,
      "yhzt": 1,
    }
    request.requestLoading(config.insertYh, params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
      if (res.repCode == '200') {
        if (that.data.newaddImagelist.length > 0) {
          that.submitDangerImage()
        } else {
          wx.showToast({
            title: res.repMsg,
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
      })
    })
  },
})