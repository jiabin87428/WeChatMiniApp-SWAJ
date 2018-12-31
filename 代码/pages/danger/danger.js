var app = getApp()
var request = require('../../utils/request.js')
var config = require('../../utils/config.js')
Page({
  data: {
    /**  
    * 页面配置  
    */
    scrollHeight: 0,
    searchViewHeight: 0,
    addDangerTitle: "隐患快报",
    addDangerDesc: "企业隐患自查自报",
    winWidth: 0,
    winHeight: 0,
    // 用户类型
    yhlx: 0,
    // tab切换    
    currentTab: 0,
    //用户名
    userName: "请登录",
    
    // 企业列表
    repCompany: [],
    // 企业搜索名称
    searchText: "",
  },
  onLoad: function () {
    var that = this;

    /**  
     * 获取系统信息  
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
          scrollHeight: res.windowHeight
        });
      }

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
    wx.navigateTo({
      url: '../danger/addDanger'
    })
  },
  // 点击隐患列表
  listClick: function () {
    wx.navigateTo({
      url: '../danger/dangerCheckList'
    })
  },
  // 点击新建项目
  addProjectClick: function (e) {
    wx.navigateTo({
      url: '../danger/addProject'
    })
  },
  // 点击查看项目列表
  projectListClick: function (e) {
    wx.navigateTo({
      url: '../danger/projectList?userid=' + app.globalData.userInfo.userid
    })
  },
  // 判断是否登录
  checkLogin: function () {
    var that = this
    if (app.globalData.userInfo == null) {
      return
    }
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        app.globalData.userInfo = res.data
        that.setData({
          addDangerTitle: "隐患快报",
          addDangerDesc: "企业隐患自查自报",
          yhlx: app.globalData.userInfo.yhlx
        })
        if (that.data.yhlx == 2) {
          that.setData({
            searchViewHeight: 40,
          })
          that.getQYList()
        }else{
          that.setData({
            searchViewHeight: 0,
          })
        }
      }, fail: function (res) {
        wx.navigateTo({
          url: '../login/chooseLoginType'
        })
      }
    })
  },

  // 获取企业列表
  getQYList: function () {
    var that = this
    var param = {
      "searchText": that.data.searchText,
      "userid": app.globalData.userInfo.userid,
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
  // 搜索
  searchCompany: function (e) {
    var that = this
    that.setData({
      searchText: e.detail.value,
    })
    that.getQYList()
  },
  // 选择企业加载企业隐患
  selectItem: function (e) {
    var item = {
      qyid: e.currentTarget.dataset.item.id + ""
    }
    wx.navigateTo({
      url: '../danger/dangerCheckList?item=' + JSON.stringify(item) + '&pageType=1'
    })
  },
})    