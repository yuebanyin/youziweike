// 本地服务器:局域网测试使用
// const WxApiRoot = 'http://192.168.3.140:43334/';  // 本地
const WxApiRoot = 'https://yz-frontapi.szdy1688.cn/'; // 正式
//
// 云平台部署时使用
// var WxApiRoot = 'https://shop.andmedia.cn/wx/';

const apiPrefix = 'Api/Client/V2/';

export const Api = {
  IndexUrl: `${apiPrefix}Index/Init`, //首页 页面初始化
  CategoryInitUrl: `${apiPrefix}Index/CategoryInit`, //子分类 页面初始化
  SubCategoryUrl: `${apiPrefix}Index/SubCategory`, //获取子分类 页面信息
  MoreListUrl: `${apiPrefix}Index/MoreList`, //主页 更多推荐 列表
  SubMoreListUrl: `${apiPrefix}Index/SubMoreList`, //子分类 更多推荐 列表
  BonusList: `${apiPrefix}Index/BonusList`, //直播 猜你喜欢 推荐列表

  HotSearchUrl: `${apiPrefix}Search/HotSearch`, // 搜索-热搜词条
  LiveRoomUrl: `${apiPrefix}Search/LiveRoom`, // 搜索-热搜词条
  ChannelUrl: `${apiPrefix}Search/Channel`, // 搜索-热搜词条
  ContentUrl: `${apiPrefix}Search/Content`, // 搜索-热搜词条
  OfficialInit: `${apiPrefix}Official/Init`, // 官号（直播间）页面初始化
  OfficialDetail: `${apiPrefix}Official/Detail`, // 官号 详情

  AuthLoginByWeixin: `${apiPrefix}Login/MiniProgram`, //微信登录
  GetVCode: `${apiPrefix}Login/GetVCode`, //获取验证码
  AuthLoginByCode: `${apiPrefix}Login/VCode`, //用户验证码登录

  Detail: `${apiPrefix}Content/Detail`, //内容详情

  WebsocketId: `${WxApiRoot}socket`, // 获得id socket signalr 相关
  // WebsocketId: WxApiRoot + 'socket/negotiate?negotiateVersion=1' // 获得id

  Bonus: `${apiPrefix}Content/Bonus`, //特惠福利详情
  FreeList: `${apiPrefix}QuickView/FreeList`, //免费专区 列表
  VideoSquare: `${apiPrefix}QuickView/VideoSquare`, //视频广场
  GoodCourseList: `${apiPrefix}QuickView/GoodCourseList`, //好课榜
  GoodCourseClassItem: `${apiPrefix}QuickView/GoodCourseClassItem`, //好课榜下方分类列表


  // 购买
  BuyContent: `${apiPrefix}Buy/Content`, //购买单个内容
  BuyBonus: `${apiPrefix}Buy/Bonus`, //购买特惠福利
  PrePay: `${apiPrefix}Pay/PrePay`, //获取预支付信息
  PaySuccess: `${apiPrefix}Pay/PaySuccess`, //支付完成后调用接口
  FreeContent: `${apiPrefix}Buy/FreeContent`, //下单 免费内容

  //个人中心-操作
  Collect: `${apiPrefix}Collect/Content`, //收藏单个内容
  CollectList: `${apiPrefix}Collect/GetContentList`, //用户收藏列表
  Official: `${apiPrefix}Follow/Official`, //用户关注单个直播间
  GetOfficialList: `${apiPrefix}Follow/GetOfficialList`, //用户关注官号列表
  CourseOrderList: `${apiPrefix}Order/CourseOrderList`, //课程订单列表

  MyMessageList: `${apiPrefix}Message/MyMessageList`, //聊天列表
  ChatMessage: `${apiPrefix}Message/ChatMessage`, //具体的聊天消息列表
  Sender: `${apiPrefix}Message/Sender`, //发送消息
  UserInfo: `${apiPrefix}User/UserInfo`, //获取用户信息
  EditUserInfo: `${apiPrefix}User/EditUserInfo`, //修改用户信息
  EditMobile: `${apiPrefix}User/EditMobile`, //修改用户绑定手机号
  UserRebateInfo: `${apiPrefix}Rebate/UserRebateInfo`, //返佣面板
  UserApplyWithdrawal: `${apiPrefix}Rebate/UserApplyWithdrawal`, //申请提现
  UserWithdrawalList: `${apiPrefix}Rebate/UserWithdrawalList`, //我得提现列表
  LinkList: `${apiPrefix}Other/LinkList`, //链接配置列表
  UploadImg: `${apiPrefix}User/UploadImg`, //上传头像信息

  // 直播相关
  PosterList: `${apiPrefix}Share/PosterList`, //分享海报列表
  CreatePoster: `${apiPrefix}Share/CreatePoster`, //创建海报
  SpreadList: `${apiPrefix}Live/SpreadList`, //直播邀请排行榜
  ProductIds: `${apiPrefix}Live/ProductIds`, //获取内容id们
  ProductList: `${apiPrefix}Live/ProductList`, //获取内容列表
  WeChatH5: `${apiPrefix}Login/WeChatH5`, //微信h5 登录
  HistoryMessage: `${apiPrefix}Live/HistoryMessage`, // 直播历史记录

  // 开始学习
  CourseAll: `${apiPrefix}Course/All`, // 全部课程
  CourseLately: `${apiPrefix}Course/Lately`, // 最近学习
  LiveSign: `${apiPrefix}Other/Sign`, //直播签名
  LiveQuickMsg: `${apiPrefix}Live/LiveQuickMsg`, //直播签名

  // 视频点播
  VideoParams: `${apiPrefix}Other/VideoParams`, //点播签名
  LecturerInfo: `${apiPrefix}Official/LecturerInfo`, //讲师信息
};
