
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var amapFile = require('../../libs/amap-wx.js');

var app = getApp()
Page({
  data: {
    /**  
        * 页面配置  
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换    
    currentTab: 0,
    // 是否企业用户
    isqy: true,
    // 顶部统计栏高度
    titleHeight: 144,
    // 地图上的标记
    markers: [],
    latitude: '',
    longitude: '',
    // 当前定位地址
    currentLocation: '尚未获得定位信息',

    // MARK:企业用
    // 隐患总数
    yhzs: 0,
    // 已整改隐患数
    yzgyhs: 0,
    // 未整改隐患数
    wzgyhs: 0,

    // MARK:非企业用
    // 企业总数
    qyzs: 0,
    // 企业隐患总数
    qyyhzs: 0,
    // 企业已整改隐患
    qyyzgyh: 0,
    // 企业未整改隐患
    qywzgyh: 0
  },
  onLoad: function (e) {
    var that = this;

    /**  
     * 获取系统信息  
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

    var myAmapFun = new amapFile.AMapWX({ key: 'f28afe6170399e78d1f7e1b672c1fa49' });
    myAmapFun.getRegeo({
      success: function (data) {
        that.setData({
          markers: data
        })
        if (data.length > 0) {
          that.setData({
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            currentLocation: '您正在：' + data[0].name
          })
        }
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
    
  },
  /**
   *  监听页面显示，
   *    当从当前页面调转到另一个页面
   *    另一个页面销毁时会再次执行
   */
  onShow: function () {
    this.checkLogin()
  },
  // 点击用户头像
  userClick: function () {
    wx.navigateTo({
      url: '../login/login'
    })
  },
  // 点击添加隐患
  addClick: function () {
    if(!this.checkLogin()) {
      wx.navigateTo({
        url: '../login/login'
      })
      return
    }else{
      wx.navigateTo({
        url: '../danger/addDanger'
      })
    }
  },
  // 点击隐患列表
  listClick: function () {
    if(!this.checkLogin()) {
      wx.navigateTo({
        url: '../login/login'
      })
      return
    } else {
      wx.navigateTo({
        url: '../danger/dangerList'
      })
    }
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
            isqy : false,
            titleHeight: 192
          })
        }else {
          that.setData({
            isqy : true,
            titleHeight: 144
          })
        }
        console.log(app.globalData.userInfo)
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

  // 获取统计数据
  getStatistics: function () {
    var that = this
    var params = {
      "repIsqy": app.globalData.userInfo.repIsqy,
      "repRecordid": app.globalData.userInfo.repRecordid
    }
    request.requestLoading(config.getTj, params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      console.log(res)
      if (res.repCode != null && res.repCode == 500){
        return
      }
      that.setData({
        yhzs: res.yhzs,
        yzgyhs: res.yzgyhs,
        wzgyhs: res.wzgyhs
      })
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },
  // 添加隐患
  addClick: function (e) {
    wx.navigateTo({
      url: '../danger/addDanger'
    })
  }
})    