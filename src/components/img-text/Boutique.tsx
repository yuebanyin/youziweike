import { isArray } from 'esy-ui';
import { Img } from '../img';
import { formatDigit } from '@/utils';
import top1Png from '@/assets/images/common/top1.png';
import top2Png from '@/assets/images/common/top2.png';
import top3Png from '@/assets/images/common/top3.png';
import { useNavigation } from '@/hooks';

interface LiveProps {
  bgImg: string;
  contents: any[];
  onMore?: any;
}
const badPngs = {
  0: top1Png,
  1: top2Png,
  2: top3Png,
};

/** 首页精品畅销榜图文结构的组件 */
export function Boutique(props: LiveProps) {
  const { contents, bgImg, onMore = () => {} } = props;
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation(`/detail?id=${item?.id}`);
  };

  return (
    <div className='relative px-4 pt-16'>
      <Img isNoTheme src={bgImg} className='w-full absolute -z-1 top-0 left-0 right-0' />
      <div onClick={onMore} className='w-12 h-12 absolute z-1 right-4 top-2' />
      {isArray(contents) &&
        contents.map((it, idx) => (
          <div
            key={it.id || idx}
            className='flex p-3 bg-white rounded-lg mb-2 cursor-pointer z-1 relative'
            onClick={() => {
              handleClick(it);
            }}
          >
            {badPngs[idx] ? <Img className='w-7 h-5 absolute left-0 top-0 z-2' src={badPngs[idx]} isNoTheme /> : null}
            <Img className='min-w-32.5 h-18.5 rounded-lg' isNoTheme src={it.coverUrl} />
            <div className='flex flex-1 flex-col ml-4 justify-between overflow-hidden'>
              <div>
                <div className='cursor-pointer text-primary-text text-sm whitespace-normal line-clamp-2'>{it.title}</div>
                <div className='truncate text-xs text-assist'>{it.description}</div>
              </div>
              <div className='flex items-end justify-between'>
                <div className='text-xs text-error'>￥{formatDigit(it.lecturePrice)}</div>
                <div className='text-xs text-assist'>已更新{it.lectureCount}节</div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
