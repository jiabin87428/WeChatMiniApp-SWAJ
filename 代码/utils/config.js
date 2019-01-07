// config.js
/**
  * 小程序后端接口配置文件
  */
var host = "https://www.gelure.com"  //域名要在小程序的管理平台配置好，如果出现调用时报错，无效的域名，可在微信开发工具左边点项目-》配置信息-》看一下配置的域名【request合法域名】有没有刷新下来，没有的话就点下面的刷新

var config = {

  // 下面的地址配合 Server 工作
  host,
  // 登录
  login: `${host}/wxlogin.do`,

  // 注册
  register: `${host}/register.do?action=Register`,

  // 修改密码
  changePassword: `${host}/getXx.do?action=updatePwd`,

  // 企业名称列表
  getCompanyName: `${host}/getXx.do?action=getQyList`,

  // 企业属地接口
  getLocal: `${host}/getXx.do?action=getLocal`,

  // 企业类型
  getType: `${host}/getXx.do?action=getType`,

  // 隐患列表
  getYhList: `${host}/getXx.do?action=getYhList`,

  // 获取企业隐患列表
  getQyyhList: `${host}/getXx.do?action=getQyyhList`,

  // 隐患详情
  getOneYh: `${host}/getXx.do?action=getOneYh`,

  // 统计接口
  getTj: `${host}/getXx.do?action=getTj`,

  // 插入隐患
  insertYh: `${host}/getXx.do?action=insertYh`,

  // 上传图片接口
  uploadImg: `${host}/uploadImg`,

  // 头像默认链接
  logoImg: `${host}/getXx.do?action=loadQyxxPhoto&qyid=`,

  // 加载隐患图片头部链接-小图
  loadYhPhoto: `${host}/getXx.do?action=loadYhPhoto&attid=`,
  // 加载隐患图片头部链接-大图
  loadBigPhoto: `${host}/getXx.do?action=loadPhoto&attid=`,

  // 修改企业信息
  updateQyxx: `${host}/getXx.do?action=updateQyxx`,

  // 获取企业信息
  getQyxx: `${host}/getXx.do?action=getQyxx`,

  //-----------纪杰------------

  // 获取任务列表
  getRw: `${host}/getXx.do?action=getRw&`,

  // 获取企业信息和企业安全生产管理现状
  getBaseAndSaftyInfo: `${host}/getXx.do?action=getQyxx&qyid=`,

  // 更新企业基本信息和安全生产信息
  updateBaseInfoAndSaftyInfo: `${host}/getXx.do?action=updateQyxx`,

  // 更新任务信息
  updateRw: `${host}/getXx.do?action=updateRw`,

  // 获取设备信息
  getSb: `${host}/getXx.do?action=getSb&qyid=`,

  // // 获取区、街道（总共有3层：市、区、镇）
  // getLocal: `${host}/getXx.do?action=getLocal&orgid=`,

  // 获取模板隐患类别
  getCategory: `${host}/getXx.do?action=getLb`,

  // 根据模版隐患类别获取详情隐患列表
  getDangerType: `${host}/getXx.do?action=getCjwt`,

  // 获取隐患分类
  getDangerClassify: `${host}/getXx.do?action=getYhfl`,

  // 获取法律法规分类
  getLawsType: `${host}/getXx.do?action=getFgfl`,

  // 根据分类获取法律法规详情文书
  getLawsDetail: `${host}/getXx.do?action=getFlfg`,

  // 法律法规内容检索
  searchLawsInfo: `${host}/getXx.do?action=showWj`,

  // 获取全部法律法规-新建隐患从法规库选择对应条款
  getAllFlfg: `${host}/getXx.do?action=getAllFlfg`,

  // 新建项目
  createProjcet: `${host}/getXx.do?action=insertXm`,
  // 获取项目列表
  getProjectList: `${host}/getXx.do?action=getXmlist`,
  // 获取项目详情
  getProjectDetail: `${host}/getXx.do?action=getOneXm&xmid=`,

  // 获取法规抓取文件
  getGrabLaws: `${host}/getXx.do?action=getFglist`,

  // 删除隐患
  deleteYH: `${host}/getXx.do?action=delYh`,
  // 删除项目
  deleteProject: `${host}/getXx.do?action=delXm`,

  // 获取企业列表
  getCompanyList: `${host}/getXx.do?action=getQyList`,
  // 新建/编辑企业
  editCompany: `${host}/getXx.do?action=insertQy`,
  // 删除企业
  deleteCompany: `${host}/getXx.do?action=delQy`,
  // 重置企业密码
  resetCompanyPassword: `${host}/getXx.do?action=resetPwd`,
  // 获取企业报告
  getBgList: `${host}/getXx.do?action=getBgList`,
  // 企业编辑，新建账号
  createAccount: `${host}/getXx.do?action=register`,

  // 下载文件
  downLoadFile: `${host}/getfile?fileid=`,
};
//对外把对象config返回
module.exports = config