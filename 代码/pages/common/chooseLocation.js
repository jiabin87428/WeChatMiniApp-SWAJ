var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var amapFile = require('../../libs/amap-wx.js');
var app = getApp()
// pages/common/chooseLocation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**  
        * 页面配置  
        */
    winWidth: 0,
    winHeight: 0,
    latitude: "",
    longitude: "",
    keyword:"搜索地址",

    markers: [],
    markerId: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    /**  
     * 获取系统信息  
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          controls: [{
            id: 1,
            iconPath: '../../assets/ic_position.png',
            position: {
              left: res.windowWidth / 2 - 15,
              top: (res.windowHeight - 177)/2,
              width: 30,
              height: 30
            },
            clickable: true
          }]
        });
      }
    })

    var myAmapFun = new amapFile.AMapWX({ key: 'f28afe6170399e78d1f7e1b672c1fa49' });
    myAmapFun.getRegeo({
      success: function (data) {
        // that.setData({
        //   markers: data
        // })
        if (data.length > 0) {
          that.setData({
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            // currentLocation: '经度：' + data[0].longitude + '，纬度：' + data[0].latitude
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
  //获取中间点的经纬度，并mark出来
  getLngLat: function () {
    var that = this;
    this.mapCtx = wx.createMapContext("map");
    this.mapCtx.getCenterLocation({
      success: function (res) {

        that.setData({
          longitude: res.longitude, 
          latitude: res.latitude,
          // currentLocation: '经度：' + res.longitude + '，纬度：' + res.latitude
          // , markers: [
          //   {
          //     id: 0
          //     , iconPath: "../../assets/ic_position.png"
          //     , longitude: res.longitude
          //     , latitude: res.latitude
          //     , width: 30
          //     , height: 30
          //   }
          // ]
        })
      }
    })
  }
  , regionchange(e) {
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置
    if(e.type == 'end') {
      this.getLngLat()
    }
  },
  // 反查地址
  getLocationInfo: function () {
    var that = this
    //console.log("获取当前经纬度：" + JSON.stringify(res));
    //发送请求通过经纬度反查地址信息  
    var getAddressUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + that.data.latitude + "," + that.data.longitude + "&key=f28afe6170399e78d1f7e1b672c1fa49&get_poi=1";
    request.requestLoading(getAddressUrl, null, '正在加载数据', function (res) {
      //console.log(JSON.stringify(res));
      that.setData({
        currentLocation: JSON.stringify(res)
      })
    }, function () {
      wx.showToast({
        title: '加载数据失败',
      })
    })
  },
  jumpSearch: function (e) {
    wx.navigateTo({
      url: '../common/searchLocation'
    })
  },
  bindInput: function (e) {
    var _this = this;
    var keywords = e.detail.value;
    var myAmap = new amapFile.AMapWX({ key: 'f28afe6170399e78d1f7e1b672c1fa49' });
    myAmap.getInputtips({
      keywords: keywords,
      location: '',
      success: function (res) {
        if (res && res.tips) {
          _this.setData({
            isShow: true,
            tips: res.tips
          });
        }
      }
    })
  },
  bindSearch: function (e) {
    var keywords = e.target.dataset.keywords;
    var location = e.target.dataset.location.split(',');

    this.setData({
      isShow: false,
      longitude: location[0],
      latitude: location[1],
    })
  },
  submitClick: function (e) {
    var pages = getCurrentPages();             //  获取页面栈
    var prevPage = pages[pages.length - 2];   // 上一个页面
    prevPage.setData({
      longitude: this.data.longitude,
      latitude: this.data.latitude,
    })
    wx.navigateBack({
      delta: 1
    })
  }
})