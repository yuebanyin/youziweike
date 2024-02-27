import { memo } from 'react';
import { Img } from '@/components';
import { isArray } from '@/utils';
import { useNavigation } from '@/hooks';

interface TeaBankProps {
  dataList?: any[];
  className?: string;
  fireSrc?: string;
}

function TeaBank(props: TeaBankProps) {
  const { dataList, fireSrc } = props;
  const navigation = useNavigation();

  return (
    <>
      {isArray(dataList) &&
        dataList.map((item, i) => (
          <div
            key={0 || `老师 ${i}`}
            className='p-2 border-b-[1px] border-split'
            onClick={() => {
              navigation(`/detail?id=${item?.contentId}`);
            }}
          >
            <div className='flex'>
              <div className='relative mr-2 rounded'>
                <Img isNoTheme src={item?.showImage} className='w-22 h-30' />
                <div className='text-center w-22 h-6 bg-mask5 rounded-b absolute bottom-0 flex items-center justify-center'>
                  <Img isNoTheme src={fireSrc as string} className='w-4 h-4 mr-2' />
                  <div className='text-white text-xs'>{item.popularCount} 人</div>
                </div>
              </div>

              <div className='w-57 flex flex-col justify-between pb-2.5'>
                <div className='text-sm text-primary-text oe-two'>{item?.title}</div>
                <div>
                  {item?.tag &&
                    item.tag.map((idx) => (
                      <span key={idx} className='text-mini h-4 text-active-text rounded px-2 mr-1 border-[1px] border-active-text'>
                        {idx}
                      </span>
                    ))}
                </div>

                <div className='flex items-center justify-between w-57 h-6 pt-5'>
                  <div>
                    <span className='text-base text-price mr-2'>￥{item.sprice}</span>

                    <span className='text-xs text-assist line-through'>￥{item.oprice}</span>
                  </div>
                  <div className='w-14 h-6 flex items-center justify-center rounded-5 text-white bg-grad-orange2 text-sm m-0'>抢</div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default memo(TeaBank);
