import { isArray } from 'esy-ui';
import { formatDigit, getContentUrl } from '@/utils';
import { Img } from '../img';
import shandianPng from '@/assets/images/common/shandian.png';
import { useNavigation } from '@/hooks';

interface LiveProps {
  data: {
    title: string;
    description: string;
    imgUrl: string;
    showPrice: string;
    id?: any;
  }[];
}

/** 首页直播图文结构的组件 */
export function Live(props: LiveProps) {
  const { data } = props;

  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation(`/${getContentUrl(item?.type)}?id=${item?.configData}&type=${item?.type}`);
  };

  if (isArray(data) && data.length > 0) {
    return (
      <>
        {data.map((it, idx) => (
          <div
            key={it?.id || `live-${idx}`}
            className='flex cursor-pointer pb-4 mb-4 border-b border-split last:pb-0 last:mb-0 last:border-transparent'
            onClick={() => {
              handleClick(it);
            }}
          >
            <Img className='w-21 h-28 rounded-lg' isNoTheme src={it.imgUrl} />
            <div className='flex flex-1 flex-col ml-4 justify-between overflow-hidden'>
              <div>
                <div className='cursor-pointer text-primary-text text-sm whitespace-normal line-clamp-2'>{it.title}</div>
                <div className='truncate text-xs text-assist'>{it.description}</div>
              </div>
              <div className='flex items-end justify-between'>
                <div className='text-xs text-assist'>仅限前100名</div>
                <div className='flex items-center bg-grad-red py-1 px-4 rounded-full'>
                  <div className='text-white'>{formatDigit(it.showPrice)}元秒杀</div>
                  <Img src={shandianPng} isNoTheme className='w-4 h-4' />
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }
  return null;
}
