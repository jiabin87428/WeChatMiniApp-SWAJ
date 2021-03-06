var app = getApp()
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
// pages/danger/dangerCheckList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: 0,
    // 隐患列表
    dangerList: [],
    // 项目id
    xmid: "",

    editIndex: 0,
    delBtnWidth: 80//删除按钮宽度单位（rpx）
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var xmid = options.xmid
    if (xmid != null) {
      that.setData({
        xmid: xmid
      })
    }
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
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
  // 搜索
  searchDanger: function (e) {
    var that = this
    var params = {
      "userid": app.globalData.userInfo.userid,
      "xmid": that.data.xmid,
      "searchText": e.detail.value,
      "yhzt": ""
    }
    this.reqDangerList(params)
  },
  // 点击查看隐患详情
  getDetail: function (e) {
    if (e.currentTarget.dataset.name == "2") {// 草稿状态
      wx.navigateTo({
        url: '../danger/addDanger?item=' + JSON.stringify(e.currentTarget.dataset.item)
      })
    } else {// 已整改 未整改
      wx.navigateTo({
        url: '../danger/dangerDetail?yhid=' + e.currentTarget.dataset.id + '&yhzt=' + e.currentTarget.dataset.name
      })
    }
  },
  // 获取隐患列表
  reqDangerList: function (searchObj, cb) {
    var that = this
    //调用接口
    request.requestLoading(config.getYhList, searchObj, '正在加载数据', function (res) {
      console.log(res)
      if (res.repYhList != null) {
        that.setData({
          dangerList: res.repYhList
        })
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
  // 删除隐患
  deleteYH: function (e) {
    var item = e.currentTarget.dataset.item
    var that = this
    var param = {
      "yhid": item.yhid,
    }
    //调用接口
    request.requestLoading(config.deleteYH, param, '正在加载数据', function (res) {
      console.log(res)
      if (res.repCode == "200") {
        var newList = that.data.dangerList
        newList.splice(e.currentTarget.dataset.index, 1)
        that.setData({
          dangerList: newList
        })
        wx.showToast({
          title: res.repMsg
        })
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
        icon: 'none'
      })
    })
  },
  //手指刚放到屏幕触发
  touchS: function (e) {
    console.log("touchS" + e);
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function (e) {
    console.log("touchM:" + e);
    var that = this
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "margin-left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "margin-left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "margin-left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;
      var list = that.data.dangerList;
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        dangerList: list
      });
    }
  },
  touchE: function (e) {
    console.log("touchE" + e);
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = that.data.dangerList;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        dangerList: list
      });
    }
  }
})