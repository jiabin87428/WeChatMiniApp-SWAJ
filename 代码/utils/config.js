// config.js
/**
  * 小程序后端接口配置文件
  */
var host = "https://www.gelure.com"  //域名要在小程序的管理平台配置好，如果出现调用时报错，无效的域名，可在微信开发工具左边点项目-》配置信息-》看一下配置的域名【request合法域名】有没有刷新下来，没有的话就点下面的刷新

var config = {
 
  // 下面的地址配合 Server 工作
  host,
  // 登录
  login: `${host}/wxlogin.so`,

  // 注册
  register: `${host}/register.so?action=Register`,

  // 企业名称列表
  getCompanyName: `${host}/getXx.so?action=getQyList`,

  // 企业属地接口
  getLocal: `${host}/getXx.so?action=getLocal`,

  // 企业类型
  getType: `${host}/getXx.so?action=getType`,

  // 隐患列表
  getYhList: `${host}/getXx.so?action=getYhList`,

  // 隐患详情
  getOneYh: `${host}/getXx.so?action=getOneYh`,

  // 统计接口
  getTj: `${host}/getXx.so?action=getTj`,

  // 插入隐患
  insertYh: `${host}/getXx.so?action=insertYh`,

  // 上传图片接口
  uploadImg: `${host}/uploadImg`,

  // 头像默认链接
  logoImg: `${host}/getXx.so?action=loadQyxxPhoto&qyid=`,

  // 加载隐患图片头部链接-小图
  loadYhPhoto: `${host}/getXx.so?action=loadYhPhoto&attid=`,
  // 加载隐患图片头部链接-大图
  loadBigPhoto: `${host}/getXx.so?action=loadPhoto&attid=`,

  // 修改企业信息
  updateQyxx: `${host}/getXx.so?action=updateQyxx`,

  // 获取企业信息
  getQyxx: `${host}/getXx.so?action=getQyxx`
};
//对外把对象config返回
module.exports = config