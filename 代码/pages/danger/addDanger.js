// pages/danger/addDanger.js
// 在需要使用的js文件中，导入js  
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    littleImageWidth: 0,
    imageViewHeight: 100,
    time:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let screenWidth = wx.getSystemInfoSync().windowWidth
    this.setData({
      littleImageWidth: (screenWidth - 50) / 4
    })

    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      time: time
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
  addPhoto: function () {
    var _this = this;
    wx.chooseImage({
      success: function (res) {
        _this.setData({
          imageList: _this.data.imageList.concat(res.tempFilePaths),
        })

        _this.setData({
          imageViewHeight: Math.ceil((_this.data.imageList.length + 1) / 4) * (_this.data.littleImageWidth + 8)
        })

        // wx.getImageInfo({
        //   src: res.tempFilePaths[0],
        //   success: function (res) {
        //     console.log(res.width)
        //     console.log(res.height)
        //   }
        // })
      }
    })
  },
  viewPhoto: function (e) {
    var _this = this
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: _this.data.imageList // 需要预览的图片http链接列表
    })
  },
  deleteImage: function (e) {
    var _this = this
    var currentIdx = e.currentTarget.id;
    var list = _this.data.imageList;
    list.splice(currentIdx,1)
    _this.setData({
      imageList: list
    })
    _this.setData({
      imageViewHeight: Math.ceil((_this.data.imageList.length + 1) / 4) * (_this.data.littleImageWidth + 8)
    })
  }
})