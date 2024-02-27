import start from '@/assets/images/common/detail/start.png';
import time from '@/assets/images/common/detail/time.png';
import { Toast } from 'esy-ui';
import { useNavigation } from '@/hooks';
import { Img } from '@/components';

interface LessonListProps {
  className?: string;
  itemCls?: string;
  dataList?: any[];
  id?: number | string;
  hasCurrentContent?: boolean;
  isLive?: boolean;
}

export const LessonList = (props: LessonListProps) => {
  const { dataList = [], id, hasCurrentContent, isLive } = props;
  const navigation = useNavigation();

  const getTag = (num) => {
    let tag = '';
    switch (num) {
      case 1:
        tag = '视频';
        break;
      case 2:
        tag = '音频';
        break;
      default:
        break;
    }
    return tag;
  };

  const handleClick = (item) => {
    console.log('iiii', item, isLive);
    if (isLive) {
      navigation(`/live-detail?id=${id}&liveId=${item?.id}`);
      return;
    }

    if (!hasCurrentContent && item?.experience === 1) {
      // 没有购买还要判断是否试听
      if (item?.audition > 0) {
        navigation(`/try-view?id=${id}&courseId=${item?.id}`);
      } else {
        Toast.show({
          content: '请点击下方按钮， 购买课程。',
          type: 'info',
        });
      }
    } else {
      navigation(`/try-view?id=${id}&courseId=${item.id}`);
    }
  };

  //

  return (
    <div className='bg-white p-4'>
      {dataList &&
        dataList.map((item) => {
          return isLive ? (
            //直播
            <div key={item.id} onClick={() => handleClick(item)} className='bg-default flex p-2 mb-2 rounded-lg'>
              <div className='flex'>
                <div className='w-52 mr-2'>
                  <span className='text-mini text-assist px-1 mr-1 h-5 border-[1px] border-split rounded'>直播</span>
                  <span className='text-xs text-primary-text whitespace-normal'>{item.description}</span>
                  <div className='flex items-center mt-2.5'>
                    {hasCurrentContent ? <Img isNoTheme className='w-4 h-4 mr-1' src={time} /> : <Img isNoTheme className='w-4 h-4 mr-1' src={start} />}
                    {hasCurrentContent ? <div className='text-xs text-active-text'>{item.startTime}开始</div> : <div className='text-xs text-assist'>{item.startTime}开始</div>}
                  </div>
                </div>

                <div>
                  <Img isNoTheme className='w-28 h-16 rounded' src={item.coverUrl} />
                </div>
              </div>
            </div>
          ) : (
            <div key={item.id} onClick={() => handleClick(item)} className='bg-default flex p-2 mb-2 rounded-lg'>
              <div className='flex'>
                <div className='w-52 mr-2'>
                  <span className='text-mini text-assist px-1 mr-1 h-5 border-[1px] border-split rounded'>{getTag(item.type)}</span>
                  <span className='text-xs text-primary-text whitespace-normal'>{item.title}</span>
                  {item.experience === 1 ? (
                    <div className='flex items-center mt-2.5'>
                      <Img isNoTheme className='w-4 h-4 mr-1' src={time} />
                      {/* <div className='text-xs text-assist'>{item.duration / 60}分钟</div> */}
                      {item.audition > 0 ? <div className='text-xs text-active-text'>免费试听({item.audition / 60}分钟)</div> : <div className='text-xs text-assist'>{item.duration / 60}分钟</div>}
                    </div>
                  ) : (
                    // 2 免费
                    <div className='flex items-center mt-2.5'>
                      <Img isNoTheme className='w-4 h-4 mr-1' src={start} />
                      <div className='text-xs text-active-text'>免费试听</div>
                    </div>
                  )}
                </div>

                <div>
                  <Img isNoTheme className='w-28 h-16 rounded' src={item.coverUrl} />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
