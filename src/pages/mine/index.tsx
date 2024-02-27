import { memo, useEffect, useState } from 'react';
import { RightOutlined } from 'esy-ui';
// import 'esy-ui-css';
import top1 from '@/assets/images/common/mine/top1.png';
import top2 from '@/assets/images/common/mine/top2.png';
import top3 from '@/assets/images/common/mine/top3.png';
import top4 from '@/assets/images/common/mine/top4.png';
import line1 from '@/assets/images/common/mine/line1.png';
import line2 from '@/assets/images/common/mine/line2.png';
import line4 from '@/assets/images/common/mine/line4.png';
import line5 from '@/assets/images/common/mine/line5.png';
import line6 from '@/assets/images/common/mine/line6.png';
import { Img } from '@/components';
import { useNavigation } from '@/hooks';
import { useUserInfoStore } from '@/mobx';

// const initUserInfo = {
//   account: '',
//   nickName: '动画版',
//   profile: line2,
//   description: '动画版动画版动画版动画版',
// };
// 个人中心选项
const optionData = [
  {
    id: 1,
    src: top1,
    title: '关注',
    link: '/mine/focus',
  },
  {
    id: 2,
    src: top2,
    title: '收藏',
    link: '/mine/collect',
  },
  {
    id: 3,
    src: top3,
    title: '优惠券',
    link: '/mine/coupon',
  },
  {
    id: 4,
    src: top4,
    title: '订单记录',
    link: '/mine/order',
  },
];

// 个人中心查询
const lineData = [
  {
    id: 1,
    title: '分销记录',
    src: line1,
    after: '',
    link: '/mine/rebate',
    cls: 'border-b-[1px] border-split',
  },
  {
    id: 2,
    title: '我的笔记本',
    src: line2,
    after: '',
    link: '/mine/my-notes',
    cls: 'border-b-[1px] border-split',
  },
  // {
  //   id: 3,
  //   title: '我的勋章', // 先隐藏
  //   src: line3,
  //   after: '',
  //   link: '',
  //   cls: 'border-b-[1px] border-split',
  // },
  {
    id: 4,
    title: '消息',
    src: line4,
    after: '',
    link: '/mine/message',
    cls: '',
  },
  {
    id: 5,
    title: '帮助与反馈',
    src: line5,
    after: '',
    link: '/mine/help-center',
    cls: 'border-b-[1px] border-split',
  },
  {
    id: 6,
    title: '设置',
    src: line6,
    after: '为了您的信息安全，请尽快绑定手机号',
    link: '/mine/set-up',
    cls: '',
  },
];

const Mine = () => {
  const navigation = useNavigation();
  const { userInfo } = useUserInfoStore();
  const [userData, setUserData] = useState({
    nickName: '',
    profile: '',
    description: '',
  });

  useEffect(() => {
    if (userInfo) {
      const { nickName, profile, description } = userInfo;
      setUserData({ nickName, profile, description });
    }
  }, [userInfo]);

  return (
    <div>
      <div className='m-4'>
        <div className='flex mb-4 pt-4 relative'>
          <Img
            src={userData?.profile}
            isNoTheme
            className='w-12 h-12 mr-4 rounded-half'
            onClick={() => {
              // 跳到我的信息
              // Taro.navigateTo({ url: '/packMine/personInfo/index' });
              navigation('/mine/person-info');
            }}
          />
          <div>
            <div className='flex'>
              <div className='text-sm font-bold mr-2'>{userData?.nickName}</div>
              {/* <Img src={study} isNoTheme className="w-40 h-18" /> */}
            </div>
            <div className='text-mini text-assist'>{userData?.description}</div>
          </div>

          {/* <div className="w-84 h-26 df-aic-jcc bg-pink p-a right--20 br-t-l-50 br-b-l-50">
            <Img src={sign} isNoTheme className="icon-16 mr-4" />
            <div className="color-main wds-text2">签到中心</div>
          </div> */}
        </div>

        <div className='flex items-center justify-around bg-white py-4 br-2 mb-4'>
          {optionData &&
            optionData.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    navigation(item.link);
                  }}
                  className='w-12 flex items-center justify-center flex-col'
                >
                  <Img className='w-8 h-8' isNoTheme src={item.src} />
                  <div className='text-xs text-assist whitespace-nowrap'>{item.title}</div>
                </div>
              );
            })}
        </div>
        {/* <DButton size="middle-pro" className="bg-grad-red mb-16">
          <Text className="color-white h-30 wds-text5 mr-8">一键开课</Text>
          <Img className="icon-24" src={finger} isNoTheme></Img>
        </DButton> */}
      </div>

      <div className=''>
        {lineData &&
          lineData.map((item) => {
            return (
              <div
                key={`line${item.id}`}
                className='bg-white pl-4'
                onClick={() => {
                  //跳转
                  navigation(item.link);
                }}
              >
                <div className={`${item?.cls} flex items-center justify-between h-14 ${item.id === 4 ? 'mb-3' : ''}`}>
                  <div className='flex items-center justify-center'>
                    <Img className='w-6 h-6 mr-2' src={item.src} isNoTheme />
                    <div className='text-sm'>{item.title}</div>
                  </div>
                  <div className='flex items-center justify-center'>
                    {item.after && <div className='text-xs text-pri-red'>{item.after}</div>}
                    <RightOutlined className='text-guide mr-2' />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default memo(Mine);
