import { class_esy, isArray } from 'esy-ui';
import { Img } from '../img';
import { formatDigit, formatW } from '@/utils';
import { Ittitle, BgTitle } from '.';
import { Swiper } from '../swiper';
import firePng from '@/assets/images/common/fire.png';
import { useNavigation } from '@/hooks';

interface LiveProps {
  contents: any[];
  moduleName?: string;
  banners?: any[];
  titleClassName?: string;
  contentClassName?: string;
  isBgTitle?: boolean;
  description?: string;
  moduleStyle?: string;
  type?: 1 | 2; // 1就是通用 2是课程列表
}

/** 首页通用图文结构的组件 */
export function Common(props: LiveProps) {
  const { contents, banners, moduleName, titleClassName, isBgTitle, description, moduleStyle, contentClassName, type } = props;
  const navigation = useNavigation();

  const handleClick = (item) => {
    // console.log(item);
    navigation(`/detail?id=${item?.contentId || item?.id}`);
  };
  return (
    <>
      {!isBgTitle && <Ittitle className={class_esy(['mb-2', titleClassName])} title={moduleName} />}
      {isBgTitle && <BgTitle title={moduleName} desc={description} moduleStyle={moduleStyle} />}
      <div className={class_esy(['px-4 bg-white rounded-lg', contentClassName])}>
        {isArray(banners) && banners.length > 0 && <Swiper imgClassName='h-26 flex-1 rounded-lg mt-4' list={banners} />}
        {isArray(contents) &&
          contents.map((it, idx) => (
            <div
              key={it.id || idx}
              onClick={() => {
                handleClick(it);
              }}
              className='flex py-3 bg-white mb-2 border-b border-split last:mb-0 last:border-0 cursor-pointer first:pt-0'
            >
              <div>
                <Img className='min-w-28 max-w-28 h-16 rounded-t-lg' isNoTheme src={it.coverUrl} />
                <div className='bg-default flex items-center justify-center text-xs text-assist py-1 rounded-b-lg'>
                  <Img src={firePng} isNoTheme className='w-3 h-3 mx-1' />
                  <div>{formatW(it.popularCount)}人</div>
                </div>
              </div>
              <div className='flex flex-1 flex-col ml-4 justify-between overflow-hidden'>
                <div>
                  <div className='text-ellipsis cursor-pointer text-primary-text text-sm whitespace-normal line-clamp-2'>{it.title}</div>
                  <div className='truncate text-xs text-assist'>{it.description}</div>
                </div>
                <div className='flex items-end justify-between'>
                  {type === 2 ? (
                    <>
                      <div className='text-xs text-assist'>时长{it.duration / 60}分钟</div>
                      {it.isFree && <div className='text-active-text text-sm'>免费</div>}
                    </>
                  ) : (
                    <>
                      <div className='text-xs text-assist'>已更新{it.currUpdate}期</div>
                      <div className='flex items-center'>
                        <div className={it?.discountInfo?.discountPrice ? 'text-assist text-mini line-through' : 'text-active-text text-sm'}>￥{formatDigit(it?.lecturePrice)}</div>
                        {it?.discountInfo?.discountPrice && <div className='text-active-text text-sm ml-1'>￥{formatDigit(it?.discountInfo?.discountPrice)}</div>}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
