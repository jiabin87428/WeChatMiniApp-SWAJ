// pages/check/dangerDetailSelect.js
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面用途：0-正常企业编辑新建用，1-加载企业隐患用
    pagetype: 0,
    scrollHeight: 0,
    bottomHeight: 70,
    searchText: "",
    userid: "",
    repCompany: [],

    editIndex: 0,
    delBtnWidth: 80,  //删除按钮宽度单位（rpx）m
    // 当前选中tab页 0-全部 1-未整改 2-已整改 3-草稿
    currentTab: 0,

    // 是否可以新建
    addable: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userid = options.userid
    var addable = options.addable == null ? true : options.addable
    var pagetype = options.pagetype == null ? 0 : options.pagetype
    that.setData({
      userid: userid,
      addable: addable,
      pagetype: pagetype
    });
    if (addable == true) {
      that.setData({
        bottomHeight: 70
      })
    }else {
      that.setData({
        bottomHeight: 0
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
    this.getQYList()
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
  // 新建企业
  addClick: function (e) {
    wx.navigateTo({
      url: '../me/companyEdit?userid=' + this.data.userid
    })
  },
  // 搜索
  searchCompany: function (e) {
    var that = this
    that.setData({
      searchText: e.detail.value,
    })
    that.getQYList()
  },
  // 获取项目列表
  getQYList: function () {
    var that = this
    var param = {
      "searchText": that.data.searchText,
      "userid": that.data.userid,
    }
    //调用接口
    request.requestLoading(config.getCompanyList, param, '正在加载数据', function (res) {
      console.log(res)
      if (res.repCompany != null) {
        that.setData({
          repCompany: res.repCompany
        })
      }
    }, function () {
      wx.showToast({
        title: '加载数据失败',
        icon: 'none'
      })
    })
  },

  // 选择企业进入编辑
  selectItem: function (e) {
    var that = this
    if (that.data.pagetype == 0) {
      wx.navigateTo({
        url: '../me/companyEdit?userid=' + that.data.userid + '&item=' + JSON.stringify(e.currentTarget.dataset.item)
      })
    }else {
      var item = {
        qyid: e.currentTarget.dataset.item.id + ""
      }
      wx.navigateTo({
        url: '../danger/dangerCheckList?item=' + JSON.stringify(item) + '&pageType=1'
      })
    }
  },

  // 删除企业
  deleteCompany: function (e) {
    var item = e.currentTarget.dataset.item
    var that = this
    var param = {
      "qyid": item.id,
    }
    //调用接口
    request.requestLoading(config.deleteCompany, param, '正在加载数据', function (res) {
      console.log(res)
      if (res.repCode == "200") {
        var newList = that.data.repCompany
        newList.splice(e.currentTarget.dataset.index, 1)
        that.setData({
          repCompany: newList
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
      var list = that.data.repCompany;
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        repCompany: list
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
      var list = that.data.repCompany;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        repCompany: list
      });
    }
  }
})