import { Img } from '@/components';
import { useNavigation } from '@/hooks';
import { useUserInfoStore } from '@/mobx';
import { getUserInfo, getUserRebateInfo } from '@/services';
import { memo, useEffect, useState } from 'react';

const orangeBg = 'https://yz-files.szdy1688.cn/StaticFiles/icon/20240119150445824.png';
// 分销返利页面

const Rebate = () => {
  const navigation = useNavigation();
  const { userInfo } = useUserInfoStore();
  const [userData, setUserData] = useState({ profile: '', nickName: '', description: '' });
  const [pageInfo, setPageInfo] = useState({
    rebateInfo: {
      currentCommission: 0,
      commissionTotal: 0,
      directlySubCount: 0,
      teamCount: 0,
      todayCommission: 0,
      directlySubCount_YES: 0,
      directlySubCount_MONTH: 0,
    },
    performanceInfo: {
      income_YES: 0,
      performance_YES: 0,
      income_WEEK: 0,
      performance_WEEK: 0,
      income_MONTH: 0,
      performance_MONTH: 0,
      income: 0,
    },
  });

  useEffect(() => {
    const { nickName, profile, description } = userInfo;
    setUserData({ nickName, profile, description });
  }, [userInfo]);

  useEffect(() => {
    // 用户信息
    getUserInfo()
      .then((res: any) => {
        console.log(res);
        if (res?.code === 210) {
          const { nickName, profile, description } = res.data;
          setUserData({ nickName, profile, description });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // 分销页面信息
    getUserRebateInfo()
      .then((res: any) => {
        console.log(res);
        if (res?.code === 210) {
          const { rebateInfo, performanceInfo } = res.data;
          setPageInfo({ rebateInfo, performanceInfo });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Img isNoTheme src={orangeBg} className='w-full' />
      <div className='absolute top-10'>
        <div className='m-4 p-3 bg-white rounded-lg'>
          <div className='flex justify-between'>
            <div className='flex'>
              <Img isNoTheme src={userData.profile} className='w-10 h-10 rounded-half mr-2' />

              <div>
                <div className='text-sm text-primary-text'>{userData.nickName}</div>
                <div className='text-mini text-assist'>{userData.description}</div>
              </div>
            </div>
            <div
              className='bg-grad-red w-20 h-8 flex items-center justify-center rounded-5 text-white text-sm m-0'
              onClick={() => {
                navigation('withdraw');
                // Taro.navigateTo({ url: '/packMine/rebate/aliWithdraw/index' });
              }}
            >
              立即提现
            </div>
          </div>

          <div className='text-primary-text text-xl text-center'>{pageInfo.rebateInfo.currentCommission}</div>
          <div className='text-xs text-assist text-center'>可提现余额（元）</div>

          <div className='flex justify-between'>
            <div className='text-center'>
              <div className='text-xs text-assist'>今日收益(元)</div>
              <div className='text-active-text text-base'>{pageInfo.rebateInfo.todayCommission}</div>
            </div>
            <div className='text-center'>
              <div className='text-xs text-assist'>累计收益（元）</div>
              <div className='text-primary-text text-base'>{pageInfo.rebateInfo.commissionTotal}</div>
            </div>
          </div>
        </div>

        <div className='m-4 p-3 bg-white rounded-lg'>
          <div className='text-base text-primary-text mb-2'>成员发展</div>
          <div className='flex flex-wrap justify-between'>
            <div className='w-38 h-14 py-2 rounded bg-default flex flex-col items-center mb-2'>
              <div className='text-base text-primary-text'>{pageInfo.rebateInfo.directlySubCount}</div>
              <div className='text-assist text-xs'>直属成员人数</div>
            </div>
            <div className='w-38 h-14 py-2 rounded bg-default flex flex-col items-center mb-2'>
              <div className='text-base text-primary-text'>{pageInfo.rebateInfo.directlySubCount_YES}</div>
              <div className='text-assist text-xs'>昨日直属新增人数</div>
            </div>
            <div className='w-38 h-14 py-2 rounded bg-default flex flex-col items-center mb-2'>
              <div className='text-base text-primary-text'>{pageInfo.rebateInfo.teamCount}</div>
              <div className='text-assist text-xs'>团队成员人数</div>
            </div>
            <div className='w-38 h-14 rounded bg-default flex flex-col items-center justify-center mb-2'>
              <div className='text-base text-primary-text'>{pageInfo.rebateInfo.directlySubCount_MONTH}</div>
              <div className='text-assist text-xs'>本月直属新增人数</div>
            </div>
          </div>
        </div>

        <div className='m-4 p-3 bg-white rounded-lg'>
          <div className='flex justify-between'>
            <div className='text-base text-primary-text mb-2'>我的业绩</div>
            <div className='text-assist text-xs'>总业绩：￥{pageInfo.performanceInfo.income}</div>
          </div>

          <div className='flex justify-between'>
            <div className='text-center'>
              <div className='text-assist text-xs'>昨日业绩(元)</div>
              <div className='text-base text-primary-text'>{pageInfo.performanceInfo.performance_YES}</div>
              <div className='text-pri-red text-xs'>收益 + {pageInfo.performanceInfo.income_YES}</div>
            </div>
            <div className='text-center'>
              <div className='text-assist text-xs'>本周业绩(元)</div>
              <div className='text-base text-primary-text'>{pageInfo.performanceInfo.performance_WEEK}</div>
              <div className='text-pri-red text-xs'>收益 + {pageInfo.performanceInfo.income_WEEK}</div>
            </div>
            <div className='text-center'>
              <div className='text-assist text-xs'>本月业绩(元)</div>
              <div className='text-base text-primary-text'>{pageInfo.performanceInfo.performance_MONTH}</div>
              <div className='text-pri-red text-xs'>收益 + {pageInfo.performanceInfo.income_MONTH}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Rebate);
