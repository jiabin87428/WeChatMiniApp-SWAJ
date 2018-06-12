var request = require('./utils/request.js')
var config = require('./utils/config.js')

//app.js
App({
  // 判断是否登录
  checkLogin: function () {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.globalData.userInfo = res.data
        
        if (that.globalData.userInfo.repIsqy == '否') {
          that.setData({
            isqy: false
          })
        } else {
          that.setData({
            isqy: true
          })
        }

      }, fail: function (res) {
        that.globalData.userInfo = null
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
  // 获取企业名称
  getCompanyName: function (searchObj,cb) {
    var that = this
    if (this.globalData.companyName && searchObj == null) {
      typeof cb == "function" && cb(this.globalData.companyName)
    } else {
      //调用接口
      request.requestLoading(config.getCompanyName, searchObj, '正在加载数据', function (res) {
        console.log(res)
        if (searchObj == null) {
          that.globalData.companyName = res.repCompany
          typeof cb == "function" && cb(that.globalData.companyName)
        }else{
          typeof cb == "function" && cb(res.repCompany)
        }
      }, function () {
        wx.showToast({
          title: '加载数据失败',
        })
      })
    }
  },
  // 获取企业属地
  getCompanyPlace: function (searchObj,cb) {
    var that = this
    if (this.globalData.companyPlace && searchObj == null) {
      typeof cb == "function" && cb(this.globalData.companyPlace)
    } else {
      //调用接口
      request.requestLoading(config.getLocal, searchObj, '正在加载数据', function (res) {
        console.log(res)
        if (searchObj == null) {
          that.globalData.companyPlace = res.repLocal
          typeof cb == "function" && cb(that.globalData.companyPlace)
        } else {
          typeof cb == "function" && cb(res.repLocal)
        }
      }, function () {
        wx.showToast({
          title: '加载数据失败',
        })
      })
    }
  },
  // 获取企业类型
  getCompanyType: function (id,cb) {
    var that = this
    var cType = null
    if (id == null) {
      cType = this.globalData.companyType1
    }else {
      cType = this.globalData.companyType2
    }
    if (cType) {
      typeof cb == "function" && cb(cType)
    } else {
      //调用接口
      request.requestLoading(config.getType, id, '正在加载数据', function (res) {
        console.log(res)
        cType = res.repType
        typeof cb == "function" && cb(cType)
      }, function () {
        wx.showToast({
          title: '加载数据失败',
        })
      })
    }
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 获取本地用信息
    // wx.getStorage({
    //   key: 'userInfo',
    //   success: function (res) {
    //     this.globalData.userInfo = res.data
    //   },
    // })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        // if (res.authSetting['scope.userInfo']) {
        //   // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //   wx.getUserInfo({
        //     success: res => {
        //       // 可以将 res 发送给后台解码出 unionId
        //       this.globalData.userInfo = res.userInfo

        //       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //       // 所以此处加入 callback 以防止这种情况
        //       if (this.userInfoReadyCallback) {
        //         this.userInfoReadyCallback(res)
        //       }
        //     }
        //   })
        // }
      }
    })
  },
  // 上传图片
  uploadDIY(params, filePaths, successUp, failUp, i, length, cb) {
    wx.uploadFile({
      url: config.uploadImg + params,
      filePath: filePaths[i],
      name: 'fileData',
      formData: {

      },
      success: (resp) => {
        successUp++;
      },
      fail: (res) => {
        failUp++;
      },
      complete: () => {
        i++;
        if (i == length) {
          // wx.showToast({
          //   title: '总共' + successUp + '张上传成功,' + failUp + '张上传失败！',
          //   icon: 'none',
          //   duration: 2000
          // })
          typeof cb == "function" && cb('200')
        }
        else {  //递归调用uploadDIY函数
          this.uploadDIY(params,filePaths, successUp, failUp, i, length);
        }
      },
    });
  },
  globalData: {
    /** 
    行业类型
    @param id   类型id
    @param name 类型名称  
    */
    industryType: [
      { id: "1001", name: "仓储物流" },
      { id: "1002", name: "城镇燃气" },
      { id: "1003", name: "人员密集场所" },
      { id: "1004", name: "危险化学品" },
      { id: "1005", name: "工贸" },
      { id: "1006", name: "非煤矿山" },
      { id: "1007", name: "煤矿" },
      { id: "1008", name: "烟花爆竹" },
      { id: "1009", name: "民爆" },
      { id: "1010", name: "道路交通" },
      { id: "1011", name: "水上交通" },
      { id: "1012", name: "建筑施工" }
    ],
    /** 
    隐患大类
    @param id   大类id
    @param name 大类名称  
    */
    dangerType1: [
      { id: "2001", name: "其他" },
      { id: "2002", name: "基础管理" },
      { id: "2003", name: "现场管理" }
    ],
    /** 
    隐患小类
    @param id       小类id
    @param superId  对应大类id
    @param name     小类名称  
    */
    dangerType2: [
      { id: "3001", superId: "2001", name: "其他" },
      { id: "3002", superId: "2002", name: "资质证照" },
      { id: "3003", superId: "2002", name: "安全生产管理机构及人员" },
      { id: "3004", superId: "2002", name: "安全生产责任制" },
      { id: "3005", superId: "2002", name: "安全生产管理制度" },
      { id: "3006", superId: "2002", name: "安全操作规程" },
      { id: "3007", superId: "2002", name: "教育培训" },
      { id: "3008", superId: "2002", name: "安全生产管理档案" },
      { id: "3009", superId: "2002", name: "安全生产投入" },
      { id: "3010", superId: "2002", name: "应急管理" },
      { id: "3011", superId: "2002", name: "特种设备基础管理" },
      { id: "3012", superId: "2002", name: "职业卫生基础管理" },
      { id: "3013", superId: "2002", name: "相关方基础管理" },
      { id: "3014", superId: "2002", name: "其他基础管理" },
      { id: "3015", superId: "2003", name: "特种设备现场管理" },
      { id: "3016", superId: "2003", name: "生产设备设施及工艺" },
      { id: "3017", superId: "2003", name: "场所环境" },
      { id: "3018", superId: "2003", name: "从业人员操作行为" },
      { id: "3019", superId: "2003", name: "消防安全" },
      { id: "3020", superId: "2003", name: "用电安全" },
      { id: "3021", superId: "2003", name: "职业卫生现场安全" },
      { id: "3022", superId: "2003", name: "有限空间现场安全" },
      { id: "3023", superId: "2003", name: "辅助动力系统" },
      { id: "3024", superId: "2003", name: "相关方现场管理" },
      { id: "3025", superId: "2003", name: "其他现场管理" },
    ],
    /** 
    存在问题
    @param id   问题id
    @param name 问题名称  
    */
    problemType: [
      { id: "4001", name: "其他" }
    ],
    /** 
    潜在隐患
    @param id   事故id
    @param name 事故名称  
    */
    dangerType: [
      { id: "5001", name: "火药爆炸" },
      { id: "5002", name: "物体打击" },
      { id: "5003", name: "车辆伤害" },
      { id: "5004", name: "机械伤害" },
      { id: "5005", name: "起重伤害" },
      { id: "5006", name: "触电" },
      { id: "5007", name: "淹溺" },
      { id: "5008", name: "灼烫" },
      { id: "5009", name: "火灾" },
      { id: "5010", name: "高处坠落" },
      { id: "5011", name: "坍塌" },
      { id: "5012", name: "冒顶片帮" },
      { id: "5013", name: "透水" },
      { id: "5014", name: "放炮" },
      { id: "5015", name: "瓦斯爆炸" },
      { id: "5016", name: "锅炉爆炸" },
      { id: "5017", name: "容器爆炸" },
      { id: "5018", name: "其他爆炸" },
      { id: "5019", name: "中毒和窒息" },
      { id: "5020", name: "其他伤害" },
    ],
    /** 
    整改类型
    @param id   类型id
    @param name 类型名称
    */
    rectifyType: [
      { id: "6001", name: "立即整改" },
      { id: "6002", name: "限期整改" },
      { id: "6003", name: "停业停产整顿" },
      { id: "6004", name: "其他" }
    ],
    // 企业名称
    companyName: null,
    // 用户信息
    userInfo: null,
    // 企业属地
    companyPlace: null,
    // 企业一级类型
    companyType1: null,
    // 企业二级类型
    companyType2: null,
    // 是否企业用户
    isqy: true,
  }
})