import { BgImg, Img } from '@/components';
import { getUserRebateInfo } from '@/services';
import { memo, useEffect, useState } from 'react';
import { RightOutlined } from 'esy-ui';
import { useNavigation } from '@/hooks';

const tixianBg = 'https://yz-files.szdy1688.cn/StaticFiles/icon/20240119161433943.png';
const records = 'https://yz-files.szdy1688.cn/StaticFiles/icon/20240119162441136.png';

const Withdraw = () => {
  const navigation = useNavigation();

  const [pageInfo, setPageInfo] = useState({
    rebateInfo: {
      currentCommission: 0,
      todayCommission: 0,
    },
    performanceInfo: {
      income_YES: 0,
      performance_YES: 0,
    },
  });

  useEffect(() => {
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
      <BgImg isNoTheme url={tixianBg} className='p-3 m-4 w-86 h-64 bg-black'>
        <div className='text-sm text-white mt-2'>我的余额（元）</div>
        <div className='t-10 text-white'>{pageInfo.rebateInfo.currentCommission}</div>
        <div className='flex mt-2'>
          <div className='mr-7'>
            <div className='text-sm text-white'>昨日收益（元）</div>
            <div className='text-xl text-white'>{pageInfo.performanceInfo.income_YES}</div>
          </div>
          <div>
            <div className='text-sm text-white'>今日收益（元）</div>
            <div className='text-xl text-white'>{pageInfo.rebateInfo.todayCommission}</div>
          </div>
        </div>

        <div
          className='rounded-7.5 bg-white w-78 h-12 flex items-center justify-center text-lg text-blue my-4 mx-auto'
          onClick={() => {
            console.log('点击提现');
            navigation('/mine/rebate/get-ali');
            // Taro.navigateTo({ url: '/packMine/rebate/getAli/index' });
          }}
        >
          支付宝提现
        </div>
      </BgImg>

      <div
        className='flex justify-between border-b-[1px] border-split px-4'
        onClick={() => {
          console.log('withdrawRecords');
          navigation('/mine/rebate/withdraw-records');
          // Taro.navigateTo({
          //   url: `/packMine/rebate/withdrawRecords/index`,
          // });
        }}
      >
        <div className='flex items-center'>
          <Img isNoTheme src={records} className='w-8 h-8 mr-1' />
          <div className='text-sm text-primary-text'>提现记录</div>
        </div>
        <RightOutlined className='text-guide mr-2' />
      </div>
    </div>
  );
};

export default memo(Withdraw);
