var util = require('../../utils/util.js');
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
    // 用户类型
    yhlx: 0,
    // 顶部统计栏高度
    titleHeight: 144,
    // 地图上的标记
    markers: [],
    latitude: 0,
    longitude: 0,
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
    // 法律法规总数
    flfgzs: 0,
    // 隐患库总数
    yhkzs: 0,

    // MARK:监管用户用
    qysl: 0,
    yhzs: 0,
    yzg: 0,
    startDate: "",
    endDate: "",

    // 组织ID-用于查询地图目标范围内坐标点
    orgid: ""
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

    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatDate(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      startDate: time,
      endDate: time
    });

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
      url: '../login/chooseLoginType'
    })
  },
  // 点击添加隐患
  addClick: function () {
    if (!this.checkLogin()) {
      wx.navigateTo({
        url: '../login/chooseLoginType'
      })
      return
    } else {
      wx.navigateTo({
        url: '../danger/addDanger'
      })
    }
  },
  // 点击隐患列表
  listClick: function () {
    if (!this.checkLogin()) {
      wx.navigateTo({
        url: '../login/chooseLoginType'
      })
      return
    } else {
      wx.navigateTo({
        url: '../danger/dangerList'
      })
    }
  },
  // 开始时间变更
  startDateChange: function (e) {
    this.setData({
      startDate: e.detail.value
    })
    this.getStatistics()
  },
  // 结束时间变更
  endDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
    this.getStatistics()
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
        that.getStatistics()
        if (app.globalData.userInfo != null) {
          var callout = {
            content: app.globalData.userInfo.name,
            color: '#FFFFFF',
            bgColor: '#018B0D',
            borderRadius: 5,
            padding: 5,
            display: 'ALWAYS'
          }
          var mark = [{
            iconPath: "../../assets/company_position.png",
            id: 99999,
            latitude: app.globalData.userInfo.mapy,
            longitude: app.globalData.userInfo.mapx,
            width: 30,
            height: 30,
            callout: callout
          }]
          if (app.globalData.userInfo.yhlx == '1') {
            that.setData({
              // longitude: app.globalData.userInfo.mapx,
              // latitude: app.globalData.userInfo.mapy,
              titleHeight: 116,
              markers: mark
            })
          } else if (app.globalData.userInfo.yhlx == '2' ||
                      app.globalData.userInfo.yhlx == '3') {
            that.setData({
              // longitude: app.globalData.userInfo.mapx,
              // latitude: app.globalData.userInfo.mapy,
              titleHeight: 192,
              markers: mark
            })
          } else {
            that.setData({
              // longitude: app.globalData.userInfo.mapx,
              // latitude: app.globalData.userInfo.mapy,
              currentLocation: app.globalData.userInfo.dep,
              titleHeight: 68,
              markers: mark
            })
          }
        }
        if (that.data.latitude == 0 && that.data.longitude == 0) {
          that.getCurrentLocation()
        }
        console.log(app.globalData.userInfo)
      }, fail: function (res) {
        wx.navigateTo({
          url: '../login/chooseLoginType'
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
      "userid": app.globalData.userInfo.userid,
      "beginTime": that.data.yhlx == "1" ? that.data.startDate : "",
      "endTime": that.data.yhlx == "1" ? that.data.endDate : "",
      "orgid": that.data.orgid
    }
    request.requestLoading(config.getTj, params, '正在加载数据', function (res) {
      //res就是我们请求接口返回的数据
      // console.log(res)
      if (res.repCode == "200") {
        var markList = that.data.markers
        if (app.globalData.userInfo.yhlx == '1' || app.globalData.userInfo.yhlx == '2' || app.globalData.userInfo.yhlx == '3') {
          if (res.sxqy != null && res.sxqy != "") {
            var sxlongitude = 0
            var sxlatitude = 0
            if (res.list.length > 0) {
              var item = res.list[0]
              sxlongitude = parseFloat(item.mapx)
              sxlatitude = parseFloat(item.mapy)
              if (sxlongitude != 0 && sxlatitude != 0) {
                that.setData({
                  longitude: sxlongitude,
                  latitude: sxlatitude
                })
              }
            }
            that.setData({
              currentLocation: "当前筛选区域:" + res.sxqy
            })
          }else {
            that.setData({
              currentLocation: "当前筛选区域: 全部"
            })
          }
          for (var i = 0; i < res.list.length; i++) {
            var item = res.list[i]
            var bgColor = "#0083FF"
            var textColor = "#FFFFFF"
            var iconPath = "../../assets/point_D.png"
            if(item.fxdj == "A(红色)"){
              bgColor = "#FF0000"
              iconPath = "../../assets/point_A.png"
            }else if(item.fxdj == "B(橙色)"){
              bgColor = "#FF8800"
              iconPath = "../../assets/point_B.png"
            } else if (item.fxdj == "C(黄色)") {
              bgColor = "#FFFF00"
              iconPath = "../../assets/point_C.png"
              textColor = "#898989"
            } else if (item.fxdj == "D(蓝色)") {
              bgColor = "#0083FF"
              iconPath = "../../assets/point_D.png"
            }
            console.log(bgColor)
            var callout = {
              content: item.qymc + '(隐患总数：' + item.yhsl + ')',
              color: textColor,
              bgColor: bgColor,
              borderRadius: 5,
              padding: 5,
              display: 'ALWAYS'
            }
            var mark = {
              id: item.qyid,
              latitude: item.mapy,
              longitude: item.mapx,
              iconPath: iconPath,
              width: 25,
              height: 30,
              callout: callout
            }
            markList.push(mark)
          }
          that.setData({
            markers: markList,
            flfgzs: res.flfgzs == null ? 0 : res.flfgzs,
            yhkzs: res.yhkzs == null ? 0 : res.yhkzs,
            qysl: res.qysl == null ? 0 : res.qysl,
            yhzs: res.yhzs == null ? 0 : res.yhzs,
            yzg: res.yzg == null ? 0 : res.yzg,
          })
        } else {
          for (var i = 0; i < res.list.length; i++) {
            var item = res.list[i]
            var color = ''
            if (item.zgzt == '0') {// 已整改
              color = '#0A6BDA'
            } else if (item.zgzt == '1') {// 未整改
              color = '#FF6B2D'
            } else {// 草稿
              color = '#2FD065'
            }
            var icon = ''
            if (item.zgzt == '0') {// 已整改
              icon = '../../assets/danger_done.png'
            } else if (item.zgzt == '1') {// 未整改
              icon = '../../assets/danger_undo.png'
            } else {// 草稿
              icon = '../../assets/danger_draft.png'
            }

            var callout = {
              content: item.yhms,
              color: '#FFFFFF',
              bgColor: color,
              borderRadius: 5,
              padding: 5,
              display: 'ALWAYS'
            }
            var mark = {
              id: i,
              latitude: item.mapy == "" ? 0 : item.mapy,
              longitude: item.mapx == "" ? 0 : item.mapx,
              iconPath: icon,
              width: 22,
              height: 30,
              callout: callout,
              yhid: item.yhid,
              zgzt: item.zgzt
            }
            markList.push(mark)
          }
          that.setData({
            markers: markList,
            yhzs: res.yhzs,
            yzgyhs: res.yzg,
            wzgyhs: res.wzg
          })
        }
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
        icon: 'none'
      })
    })
  },
  // 添加隐患
  filterClick: function (e) {
    wx.navigateTo({
      url: '../index/fliter'
    })
  },
  // 获取当前位置
  getCurrentLocation: function (e) {
    var that = this
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
  // maker点击事件
  markertap(e) {
    // wx.showToast({
    //   title: e.markerId + "",
    //   icon: 'none'
    // })
    //暂时不加点击事件
    // if (app.globalData.userInfo.yhlx == '1') { // 监管用户
    //   if (e.markerId != '99999') { // 点击的不是监管用户本身
    //     wx.navigateTo({
    //       url: '../application/companyInfoList?qyid=' + e.markerId
    //     })
    //   }
    // }else {// 企业用户
    //   if (e.markerId != '99999') { // 点击的不是企业本身的坐标点
    //     var mark = this.data.markers[e.markerId+1]
    //     this.getDetail(mark.yhid, mark.zgzt)
    //   }
    // }
  },
  // 气泡点击事件
  callouttap(e){
    if (app.globalData.userInfo.yhlx == "0"){ // 企业用户
      if (e.markerId != '99999') { // 点击的不是企业本身的坐标点
        var mark = this.data.markers[e.markerId + 1]
        this.getDetail(mark.yhid, mark.zgzt)
      }
    } else if (app.globalData.userInfo.yhlx == "2" || app.globalData.userInfo.yhlx == "3") {// 监管(政府)/管理者
      var item = {
        qyid: e.markerId + ""
      }
      var pagetype = 0
      if (app.globalData.userInfo.yhlx == "2") {
        pagetype = 1
      } else if (app.globalData.userInfo.yhlx == "3") {
        pagetype = 2
      }
      wx.navigateTo({
        url: '../danger/dangerCheckList?item=' + JSON.stringify(item) + '&pageType=' + pagetype
      })
    }
  },
  // 查看隐患详情
  getDetail: function (dangerId, zgzt) {
    wx.navigateTo({
      url: '../danger/dangerDetail?yhid=' + dangerId + '&zgzt=' + zgzt
    })
  },

  // 跳转企业列表
  jumpCompanyList: function (e) {
    wx.navigateTo({
      url: '../me/companyList?userid=' + app.globalData.userInfo.userid + '&addable=false'
    })
  },
  // 跳转企业列表 - 加载企业隐患用
  jumpYHList: function (e) {
    var pagetype = 0
    if (app.globalData.userInfo.yhlx == "2") {
      pagetype = 1
    } else if (app.globalData.userInfo.yhlx == "3") {
      pagetype = 2
    }
    wx.navigateTo({
      url: '../me/companyList?userid=' + app.globalData.userInfo.userid + '&addable=false&pagetype=' + pagetype
    })
  },
})    