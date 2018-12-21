// pages/common/inputPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewId:"",
    placeholder:"请输入",
    // 输入内容
    inputstring:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var viewId = options.id
    var placeholder = options.placeholder
    var inputstring = options.inputstring
    this.setData({
      viewId: viewId,
      placeholder: placeholder,
      inputstring: inputstring
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
  /**
   * 确定点击事件 
   */
  okClick: function () {
    var pages = getCurrentPages();             //  获取页面栈
    var prevPage = pages[pages.length - 2];   // 上一个页面
    if (this.data.viewId == "companyName") {
      prevPage.setData({
        companyName: this.data.inputstring
      })
    } else if (this.data.viewId == "problem") {
      prevPage.setData({
        problem: this.data.inputstring
      })
    } else if (this.data.viewId == "desc") {
      prevPage.setData({
        desc: this.data.inputstring
      })
    } else if (this.data.viewId == "result") {
      prevPage.setData({
        result: this.data.inputstring
      })
    } else if (this.data.viewId == "advise") {
      prevPage.setData({
        advise: this.data.inputstring
      })
    } else if (this.data.viewId == "zgr") {
      prevPage.setData({
        zgr: this.data.inputstring
      })
    } else if (this.data.viewId == "zgcs") {
      prevPage.setData({
        zgcs: this.data.inputstring
      })
    } else if (this.data.viewId == "contact") {
      prevPage.setData({
        contact: this.data.inputstring
      })
    } else if (this.data.viewId == "phone") {
      prevPage.setData({
        phone: this.data.inputstring
      })
    } else if (this.data.viewId == "email") {
      prevPage.setData({
        email: this.data.inputstring
      })
    } else if (this.data.viewId == "address") {
      prevPage.setData({
        address: this.data.inputstring
      })
    } else if (this.data.viewId == "name") {
      prevPage.setData({
        name: this.data.inputstring
      })
    } else if (this.data.viewId == "sex") {
      prevPage.setData({
        sex: this.data.inputstring
      })
    } else if (this.data.viewId == "job") {
      prevPage.setData({
        job: this.data.inputstring
      })
    } else if (this.data.viewId == "dep") {
      prevPage.setData({
        dep: this.data.inputstring
      })
    } else if (this.data.viewId == "jgEmail") {
      prevPage.setData({
        email: this.data.inputstring
      })
    } else if (this.data.viewId == "mobile") {
      prevPage.setData({
        mobile: this.data.inputstring
      })
    }
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 输入框输入事件
   */
  bindinput: function (e) {
    this.setData({
      inputstring: e.detail.value
    });
  }
})