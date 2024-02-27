import { countDown } from '@/utils';
import { memo, useState } from 'react';

interface countProps {
  startTime: Date;
  endTime: Date;
  discountPrice: number;
  discountDesc: string;
}
interface DiscountProps {
  lecturePrice: string;
  discountInfo: countProps;
}
const DiscountInfo = (props: DiscountProps) => {
  const { lecturePrice, discountInfo } = props;
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  const getDiffTime = () => {
    const time = countDown(new Date(), discountInfo?.endTime);
    setTime({ d: time.day, h: time.hour, m: time.minute, s: time.second });
  };
  setTimeout(() => {
    getDiffTime();
  }, 1000);

  return (
    <>
      <div className='h-12 flex'>
        <div className='w-57 h-12 px-4 bg-act-grad1 flex'>
          <div className='text-white flex items-baseline mr-3'>
            <div className='text-xs'>¥</div>
            <div className='text-2xl'>{discountInfo?.discountPrice}</div>
            <div className='text-xs'>.00</div>
          </div>
          <div className='flex items-center justify-center'>
            <div>
              <div className='text-xs line-through text-split'>¥{lecturePrice}</div>
              <div className='text-mini bg-brown text-white rounded px-1 h-5 flex items-center justify-center'>{discountInfo?.discountDesc || '限时特价'}</div>
            </div>
          </div>
        </div>
        <div className='flex-1 bg-act-grad2 px-4 text-center flex items-center justify-center'>
          <div className=''>
            <div className='text-active-text text-mini mb-1'>距离特价结束仅剩</div>
            <div className='flex items-center justify-center'>
              <div className='text-mini text-vip-word1 whitespace-nowrap'>{time.d}天</div>
              <div className='w-5 h-5 mx-1 rounded text-white bg-brownness text-xs'>{time.h}</div>
              <div className='text-vip-word1'>:</div>
              <div className='w-5 h-5 mx-1 rounded text-white bg-brownness text-xs'>{time.m}</div>
              <div className='text-vip-word1'>:</div>

              <div className='w-5 h-5 mx-1 rounded text-white bg-brownness text-xs'>{time.s}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(DiscountInfo);
