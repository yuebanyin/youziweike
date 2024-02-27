import { Img } from '@/components';
import bookMark from '@/assets/images/common/detail/lesson.png';
import share from '@/assets/images/common/detail/share.png';

interface LessonListProps {
  className?: string;
  itemCls?: string;
  dataList?: any[];
}

const vocList = [];

export const LearnerVoice = (props: LessonListProps) => {
  const { dataList = vocList } = props;

  // 合并样式
  // const mergeCls = useMemo(() => {}, []);

  return (
    <div>
      {dataList &&
        dataList.map((item) => {
          return (
            <div key={item.id} className='bg-default px-2 py-4 mb-2 rounded-lg'>
              <div className='flex justify-between mb-2'>
                <div className='flex items-center'>
                  <Img isNoTheme className='w-8 h-8 mr-2' src={item.src} />
                  <div>{item.name}</div>
                </div>
                <div className='flex items-center'>
                  <Img isNoTheme className='w-4 h-4 mr-1' src={item.operate} />
                  <div>{item.count}</div>
                </div>
              </div>
              <div className='text-sm mb-2'>{item.text}</div>
              <div className='flex'>{item.imgList.length !== 0 && item.imgList.map((it, i) => <Img isNoTheme src={it} key={item + i} className='w-20 h-20 mr-2' />)}</div>

              <div className='mt-4 mb-2 flex items-center'>
                <Img isNoTheme src={bookMark} className='w-4 h-4 mr-1' />
                <div className='text-xs text-assist'>{item.bookmark}</div>
              </div>
              <div className='flex justify-between'>
                <div className='text-xs text-assist'>{item.time}</div>
                <div className='flex items-center'>
                  <Img isNoTheme src={share} className='w-4 h-4 mr-1' />
                  <div className='text-xs text-assist'>分享</div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
