// pages/application/standardInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 企业id
    qyid: "",

    // 标准化证书编号
    bzhzsbh: "",
    // 标准化等级
    bzhdj: "",
    // 所属行业
    sshy: "",
    // 所属专业
    sszy: "",
    // 发证日期
    fzrq: "",
    // 有效期限
    yxqx: "",
    // 撤销日期
    cxrq: "",
    // 评审组织单位名称
    pszzdwmc: "",
    // 评审单位名称
    psdwmc: "",
    // 证书颁发单位名称
    zsbfdwmc: "",
    // 自评报告

    // 标准等级证书图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var qyid = options.qyid
    that.setData({
      qyid: qyid
    })

    that.getQyxx()
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
  getQyxx: function () {
    var that = this
    var params = {
      "qyid": this.data.qyid
    }
    request.requestLoading(config.getQyxx, params, '正在加载数据', function (res) {
      that.setData({
        // 标准化证书编号
        bzhzsbh: res.bzhzsbh == null ? "" : res.bzhzsbh,
        // 标准化等级
        bzhdj: res.bzhdj == null ? "" : res.bzhdj,
        // 所属行业
        sshy: res.sshy == null ? "" : res.sshy,
        // 所属专业
        sszy: res.sszy == null ? "" : res.sszy,
        // 发证日期
        fzrq: res.fzrq == null ? "" : res.fzrq,
        // 有效期限
        yxqx: res.yxqx == null ? "" : res.yxqx,
        // 撤销日期
        cxrq: res.cxrq == null ? "" : res.cxrq,
        // 评审组织单位名称
        pszzdwmc: res.pszzdwmc == null ? "" : res.pszzdwmc,
        // 评审单位名称
        psdwmc: res.psdwmc == null ? "" : res.psdwmc,
        // 证书颁发单位名称
        zsbfdwmc: res.zsbfdwmc == null ? "" : res.zsbfdwmc,
    // 自评报告

    // 标准等级证书图片
      })
    })
  },
})