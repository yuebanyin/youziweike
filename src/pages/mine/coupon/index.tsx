import { memo } from 'react';
import CollectBlock from '../collect/block';

interface CouponProps {
  dataList?: any[];
  className?: string;
}

const couponList = [
  {
    id: 1,
    num: 60,
    title: '购课限时红包',
    info: '平台优惠券',
    scope: '点击券面查看',
    useTime: '2023-12-28',
  },
  {
    id: 2,
    num: 60,
    title: '购课限时红包',
    info: '平台优惠券',
    scope: '点击券面查看',
    useTime: '2023-12-28',
  },
  {
    id: 3,
    num: 60,
    title: '购课限时红包',
    info: '平台优惠券',
    scope: '点击券面查看',
    useTime: '2023-12-28',
  },
  {
    id: 4,
    num: 60,
    title: '购课限时红包',
    info: '平台优惠券',
    scope: '点击券面查看',
    useTime: '2023-12-28',
  },
  {
    id: 5,
    num: 60,
    title: '购课限时红包',
    info: '平台优惠券',
    scope: '点击券面查看',
    useTime: '2023-12-28',
  },
  {
    id: 6,
    num: 60,
    title: '购课限时红包',
    info: '平台优惠券',
    scope: '点击券面查看',
    useTime: '2023-12-28',
  },
  {
    id: 7,
    num: 60,
    title: '购课限时红包',
    info: '平台优惠券',
    scope: '点击券面查看',
    useTime: '2023-12-28',
  },
  {
    id: 8,
    num: 60,
    title: '购课限时红包',
    info: '平台优惠券',
    scope: '点击券面查看',
    useTime: '2023-12-28',
  },
];
const Coupon = (props: CouponProps) => {
  const { dataList = couponList } = props;

  const handlAdd = () => {
    console.log('添加优惠券。。。');
  };
  return (
    <>
      <div className='p-4 bg-default pb-8'>
        {dataList.length > 0 ? (
          dataList.map((item) => {
            return (
              <div key={`优惠券${item.id}`} className='coupon flex mb-2 relative shadow-tile'>
                <div className='bg-white w-54 px-4 py-2 rounded-l-lg'>
                  <div className='text-primary-text text-base font-bold'>{item.title}</div>
                  <div className='text-primary-text text-xs'>{item.info}</div>
                  <div className='text-primary-text text-xs'>适用范围：{item.scope}</div>
                  <div className='text-primary-text text-xs'>有效期：{item.useTime}</div>
                </div>
                <div className='bg-grad-red3 w-32 rounded-r-lg px-4 py-2'>
                  <div className=' text-2xl text-white'>￥{item.num}</div>
                  <div className='text-sm text-active-text rounded-5 mt-1'>立即使用</div>
                </div>
              </div>
            );
          })
        ) : (
          <CollectBlock>
            <div className='text-sm text-assist'>暂无发放优惠券</div>
          </CollectBlock>
        )}
      </div>
      <div className='fixed bottom-0 bg-white py-1 shadow-up w-full m-auto'>
        <div className='w-86 h-12 rounded-7.5 flex m-auto items-center justify-center border-[1px] border-active-text bg-white text-active-text font-bold text-lg' onClick={() => handlAdd()}>
          添加优惠券
        </div>
        <div className='w-full h-5'></div>
      </div>
    </>
  );
};
export default memo(Coupon);
