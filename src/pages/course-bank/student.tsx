import { memo } from 'react';
import { Img } from '@/components';
import { useNavigation } from '@/hooks';
import { isArray } from '@/utils';

interface StuBankProps {
  dataList?: any[];
  className?: string;
  fireSrc?: string;
  dianSrc?: string;
}

function StuBank(props: StuBankProps) {
  const { dataList, fireSrc, dianSrc } = props;
  const navigation = useNavigation();

  return (
    <>
      {isArray(dataList) &&
        dataList.map((item, i) => (
          <div
            onClick={() => {
              navigation(`/detail?id=${item?.contentId || item?.id}`);
            }}
            key={0 || `学生 ${i}`}
            className='p-2 border-b-[1px] border-split'
          >
            <div className='flex'>
              <div className='relative mr-2 rounded'>
                <Img isNoTheme src={item?.showImage} className='w-38 h-21' />
                <div className='text-center w-38 h-6 bg-mask5 rounded-b absolute bottom-0 flex items-center justify-center'>
                  <Img isNoTheme src={fireSrc as string} className='w-4 h-4 mr-2' />
                  <div className='text-white text-xs'>{item.popularCount} 人</div>
                </div>
              </div>

              <div className='w-42'>
                <div className='text-sm text-primary-text oe-two'>{item.title}</div>
                <div className='flex items-baseline justify-between w-42 h-6 pt-5'>
                  <div>
                    <span className='text-base text-price mr-2'>￥{item.sprice}</span>

                    <span className='text-xs text-assist line-through'>￥{item.oprice}</span>
                  </div>
                  <div className='w-14 h-6 flex items-center justify-center rounded-5 text-white bg-grad-orange2 text-sm m-0'>抢</div>
                </div>
              </div>
            </div>

            <div className='w-78 px-2 mt-2 rounded-5 bg-default h-6 flex items-center'>
              <Img isNoTheme src={dianSrc as string} className='w-4 h-4 mr-2' />
              <div className='text-xs text-assist w-70 oe'>推荐理由：{item?.recommendDes}</div>
            </div>
          </div>
        ))}
    </>
  );
}

export default memo(StuBank);
