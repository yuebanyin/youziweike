import { lazy } from 'react';
import { LazyComponent } from '@/components';

// layout 组件不做懒加载
import Layout from '@/layouts';

const Home = lazy(() => /** 首页 */ import('@/pages/home'));

const Login = lazy(() => /** 登录 */ import('@/pages/login'));
const Mine = lazy(() => /** 个人中心 */ import('@/pages/mine'));
const StartLearn = lazy(() => /** 开始学习 */ import('@/pages/start-learn'));
const HotSearch = lazy(() => /** 热门搜索 */ import('@/pages/hot-serach'));
const HotSearchDetail = lazy(() => /** 热门搜索详情 */ import('@/pages/hot-serach/detail'));
const SpecialColumn = lazy(() => /** 热门搜索专栏 */ import('@/pages/hot-serach/special-column'));
const LiveRoom = lazy(() => /** 热门搜索直播 */ import('@/pages/hot-serach/live-room'));
const LiveOfficial = lazy(() => /** 热门搜索直播 */ import('@/pages/hot-serach/live-official'));
const LiveBroadcast = lazy(() => /** 直播 */ import('@/pages/live-broadcast'));
const Welfare = lazy(() => /** 免费福利 */ import('@/pages/welfare'));
const FreeZone = lazy(() => /** 免费专区 */ import('@/pages/free-zone'));
const VideoSquare = lazy(() => /** 视频广场 */ import('@/pages/video-square'));
const CourseBank = lazy(() => /** 好课榜 */ import('@/pages/course-bank'));
const HelpCenter = lazy(() => /** 帮助与反馈 */ import('@/pages/mine/help-center'));
const MyNotes = lazy(() => /** 我的笔记 */ import('@/pages/mine/my-notes'));
const Message = lazy(() => /** 我的消息 */ import('@/pages/mine/message'));
const PersonInfo = lazy(() => /** 我的资料 */ import('@/pages/mine/person-info'));
const MyCollect = lazy(() => /** 我的收藏 */ import('@/pages/mine/collect'));
const MyFocus = lazy(() => /** 我的关注 */ import('@/pages/mine/focus'));
const Coupon = lazy(() => /** 我的优惠券 */ import('@/pages/mine/coupon'));
const Order = lazy(() => /** 我的订单 */ import('@/pages/mine/order'));
const SetUp = lazy(() => /** 设置 */ import('@/pages/mine/set-up'));
const ChangePhone = lazy(() => /** 修改手机号码 */ import('@/pages/mine/set-up/change-phone'));
const BindPhone = lazy(() => /** 绑定手机号码 */ import('@/pages/mine/set-up/bind-phone'));
const Rebate = lazy(() => /** 分销 */ import('@/pages/mine/rebate'));
const Withdraw = lazy(() => /** 提现 */ import('@/pages/mine/rebate/withdraw'));
const GetAli = lazy(() => /** 支付宝提现 */ import('@/pages/mine/rebate/get-ali'));
const WithdrawRecords = lazy(() => /** 提现记录 */ import('@/pages/mine/rebate/withdraw-records'));
const LessonDetail = lazy(() => /** 内容详情 */ import('@/pages/lesson-detail'));
const TryView = lazy(() => /** 试看课程 */ import('@/pages/try-view'));
const LiveDetail = lazy(() => /** 直播详情信息 */ import('@/pages/live-detail'));

export const routes = [
  {
    path: '/',
    element: LazyComponent({ lazyChildren: Layout }),
    children: [
      {
        path: '',
        element: LazyComponent({ lazyChildren: Home }),
      },
      {
        path: 'login',
        element: LazyComponent({ lazyChildren: Login }),
      },
      {
        path: 'start-learn',
        element: LazyComponent({ lazyChildren: StartLearn }),
      },
      {
        path: 'mine',
        // element: LazyComponent({ lazyChildren: Mine }),
        children: [
          {
            path: '',
            element: LazyComponent({ lazyChildren: Mine }),
          },
          {
            path: 'help-center',
            element: LazyComponent({ lazyChildren: HelpCenter }),
          },
          {
            path: 'rebate',
            children: [
              {
                path: '',
                element: LazyComponent({ lazyChildren: Rebate }),
              },
              {
                path: 'withdraw',
                element: LazyComponent({ lazyChildren: Withdraw }),
              },
              {
                path: 'get-ali',
                element: LazyComponent({ lazyChildren: GetAli }),
              },
              {
                path: 'withdraw-records',
                element: LazyComponent({ lazyChildren: WithdrawRecords }),
              },
            ],
          },
          {
            path: 'my-notes',
            element: LazyComponent({ lazyChildren: MyNotes }),
          },
          {
            path: 'message',
            element: LazyComponent({ lazyChildren: Message }),
          },
          {
            path: 'person-info',
            element: LazyComponent({ lazyChildren: PersonInfo }),
          },
          {
            path: 'person-info',
            element: LazyComponent({ lazyChildren: PersonInfo }),
          },
          {
            path: 'collect',
            element: LazyComponent({ lazyChildren: MyCollect }),
          },
          {
            path: 'focus',
            element: LazyComponent({ lazyChildren: MyFocus }),
          },
          {
            path: 'coupon',
            element: LazyComponent({ lazyChildren: Coupon }),
          },
          {
            path: 'order',
            element: LazyComponent({ lazyChildren: Order }),
          },
          {
            path: 'set-up',
            children: [
              {
                path: '',
                element: LazyComponent({ lazyChildren: SetUp }),
              },
              {
                path: 'Change-phone',
                element: LazyComponent({ lazyChildren: ChangePhone }),
              },
              {
                path: 'Bind-phone',
                element: LazyComponent({ lazyChildren: BindPhone }),
              },
            ],
          },
        ],
      },
      {
        path: 'hot-serach',
        children: [
          {
            path: '',
            element: LazyComponent({ lazyChildren: HotSearch }),
          },
          {
            path: 'detail',
            children: [
              {
                path: '',
                element: LazyComponent({ lazyChildren: HotSearchDetail }),
              },
              {
                path: 'special-column',
                element: LazyComponent({ lazyChildren: SpecialColumn }),
              },
              {
                path: 'live-room',
                element: LazyComponent({ lazyChildren: LiveRoom }),
              },
              {
                path: 'live-official',
                element: LazyComponent({ lazyChildren: LiveOfficial }),
              },
            ],
          },
        ],
      },
      {
        path: 'live-broadcast',
        element: LazyComponent({ lazyChildren: LiveBroadcast }),
      },
      {
        path: 'welfare',
        element: LazyComponent({ lazyChildren: Welfare }),
      },
      {
        path: 'free-zone',
        element: LazyComponent({ lazyChildren: FreeZone }),
      },
      {
        path: 'video-square',
        element: LazyComponent({ lazyChildren: VideoSquare }),
      },
      {
        path: 'course-bank',
        element: LazyComponent({ lazyChildren: CourseBank }),
      },
      {
        path: 'detail',
        element: LazyComponent({ lazyChildren: LessonDetail }),
      },
      {
        path: 'try-view',
        element: LazyComponent({ lazyChildren: TryView }),
      },
      {
        path: 'live-detail',
        element: LazyComponent({ lazyChildren: LiveDetail }),
      },
    ],
  },
];
