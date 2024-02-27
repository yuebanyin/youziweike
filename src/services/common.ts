import { post, postForm } from '@/utils';
import { Api } from './prefix';

/**
 *  微信登录
 */
export const loginByWeXin = (payload) => post(Api.AuthLoginByWeixin, payload);

/**
 *  获取验证码
 */
export const getVCode = (payload) => post(Api.GetVCode, payload);

/**
 *  用户验证码登录
 */
export const loginByCode = (payload) => post(Api.AuthLoginByCode, payload);

/**
 *  获取websocket Id
 */
export const getWebsocketId = (payload) => post(Api.WebsocketId, payload);

/**
 *  微信h5 登录
 */
export const loginWeChatH5 = (payload) => post(Api.WeChatH5, payload);

/**
 *  首页 页面初始化
 */
export const getIndexInit = () => post(Api.IndexUrl, {});

/**
 *  子分类 页面初始化
 */
export const getCategoryInit = (payload) => post(Api.CategoryInitUrl, payload);

/**
 *  获取子分类 页面信息
 */
export const getSubCategory = (payload) => post(Api.SubCategoryUrl, payload);

/**
 *  主页 更多推荐 列表
 */
export const getMoreList = (payload) => post(Api.MoreListUrl, payload);

/**
 *  子分类 更多推荐 列表
 */
export const getSubMoreList = (payload) => post(Api.SubMoreListUrl, payload);

/**
 *  搜索-热搜词条
 */
export const getHotSearch = (payload) => post(Api.HotSearchUrl, payload);

/**
 *  搜索-直播间
 */
export const getLiveRoom = (payload) => post(Api.LiveRoomUrl, payload);

/**
 *  搜索-专栏
 */
export const getChannel = (payload) => post(Api.ChannelUrl, payload);

/**
 *  搜索-课程
 */
export const getContent = (payload) => post(Api.ContentUrl, payload);

/**
 *  官号（直播间）页面初始化
 */
export const getOfficialInit = (payload) => post(Api.OfficialInit, payload);

/**
 *  直播签名
 */
export const getLiveSign = (payload) => post(Api.LiveSign, payload);

/**
 *  官号详情
 */
export const getOfficialDetail = (payload) => post(Api.OfficialDetail, payload);

/**
 *  直播 猜你喜欢 推荐列表
 */
export const getBonusList = () => post(Api.BonusList, {});

/**
 *  获取内容详情
 */
export const getContentDetail = (payload) => post(Api.Detail, payload);

/**
 *
 * 用户收藏单个内容
 */
export const getCollect = (payload) => post(Api.Collect, payload);

/**
 *
 * 获取用户收藏的内容列表
 */
export const getCollectList = (payload) => post(Api.CollectList, payload);

/**
 *
 * 用户关注单个直播间
 */
export const getOfficial = (payload) => post(Api.Official, payload);

/**
 *
 * 用户关注官号列表
 */
export const getOfficialList = (payload) => post(Api.GetOfficialList, payload);
/**
 *
 * 课程订单列表
 */
export const getCourseOrderList = (payload) => post(Api.CourseOrderList, payload);

/**
 *
 * 聊天列表
 */
export const getMyMessageList = (payload) => post(Api.MyMessageList, payload);

/**
 *
 * 具体的聊天消息列表
 */
export const getChatMessage = (payload) => post(Api.ChatMessage, payload);

/**
 *
 * 发送消息
 */
export const getSender = (payload) => post(Api.Sender, payload);

/**
 *
 * 获取用户信息
 */
export const getUserInfo = () => post(Api.UserInfo, {});

/**
 *
 * 修改用户信息
 */
export const getEditUserInfo = (payload) => post(Api.EditUserInfo, payload);

/**
 *
 * 修改用户绑定手机号
 */
export const getEditMobile = (payload) => post(Api.EditMobile, payload);

/**
 *
 * 分销 返佣面板
 */
export const getUserRebateInfo = () => post(Api.UserRebateInfo, {});

/**
 *
 * 申请提现
 */
export const getUserApplyWithdrawal = (payload) => post(Api.UserApplyWithdrawal, payload);

/**
 *
 * 我得提现列表
 */
export const getUserWithdrawalList = (payload) => post(Api.UserWithdrawalList, payload);

/**
 *
 * 分享海报列表
 */
export const getPosterList = () => post(Api.PosterList, {});

/**
 *
 * 创建海报
 */
export const getCreatePoster = (payload) => post(Api.CreatePoster, payload);

/**
 *
 * 直播邀请排行榜
 */
export const getSpreadList = (payload) => post(Api.SpreadList, payload);

/**
 *
 * 获取内容id们
 */
export const getProductIds = (payload) => post(Api.ProductIds, payload);

/**
 *
 * 获取内容列表
 */
export const getProductList = (payload) => post(Api.ProductList, payload);

/**
 *
 * 链接配置列表
 */
export const getLinkList = () => post(Api.LinkList, {});

/**
 *  购买单个内容
 */
export const getBuyContent = (payload) => post(Api.BuyContent, payload);

/**
 *  购买特惠福利
 */
export const getBuyBonus = (payload) => post(Api.BuyBonus, payload);

/**
 *  获取预支付信息
 */
export const getPrePay = (payload) => post(Api.PrePay, payload);

/**
 *  支付完成后调用接口
 */
export const getPaySuccess = (payload) => post(Api.PaySuccess, payload);

/**
 *  下单 免费内容
 */
export const getFreeContent = (payload) => post(Api.FreeContent, payload);

/**
 *  免费专区 列表
 */
export const getBonus = (payload) => post(Api.Bonus, payload);

/**
 *  免费专区 列表
 */
export const getFreeList = (payload) => post(Api.FreeList, payload);
/**
 *   视频广场
 */
export const getVideoSquare = () => post(Api.VideoSquare, {});
/**
 *  好课榜
 */
export const getGoodCourseList = (payload) => post(Api.GoodCourseList, payload);
/**
 *  好课榜下方分类列表
 */
export const getGoodCourseClassItem = (payload) => post(Api.GoodCourseClassItem, payload);

/**
 *  开始学习 全部课程
 */
export const getCourseAll = (payload) => post(Api.CourseAll, payload);

/**
 *  开始学习 最近学习
 */
export const getCourseLately = (payload) => post(Api.CourseLately, payload);

/**
 *  上传头像信息
 */
export const getUploadImg = (payload) => postForm(Api.UploadImg, payload);

/**
 * 直播间-快捷发送消息
 */
export const postLiveQuickMsg = (payload) => post(Api.LiveQuickMsg, payload);

/**
 * 直播间-历史消息
 */
export const postLiveHistoryMessage = (payload) => post(Api.HistoryMessage, payload);

/**
 * 内容详情
 */
 export const getConDetail = (payload) => post(Api.Detail, payload);

 /**
 * 视频点播签名
 */
  export const getVideoParams = (payload) => post(Api.VideoParams, payload);

   /**
 * 讲师信息
 */
    export const getLecturerInfo = (payload) => post(Api.LecturerInfo, payload);
