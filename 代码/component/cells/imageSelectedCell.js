// component/cells/imageSelectedCell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageList: [],
    littleImageWidth:0,
    imageViewHeight:100
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {
    let screenWidth = wx.getSystemInfoSync().windowWidth
    this.setData({
      littleImageWidth: (screenWidth-50)/4
    })
    var _this = this;
  },
  moved: function () {

  },
  detached: function () {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    addPhoto: function() {
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
    }
  }
})
