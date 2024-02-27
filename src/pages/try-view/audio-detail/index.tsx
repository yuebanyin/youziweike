import { memo } from 'react';
import left from '../../../assets/detail/tryDetail/left.png';
import right from '../../../assets/detail/tryDetail/right.png';
import menu from '../../../assets/detail/tryDetail/menu.png';
import start from '../../../assets/detail/tryDetail/start.png';
import bei from '../../../assets/detail/tryDetail/1.25.png';
import { Img } from '@/components';

const cover = 'https://yz-files.szdy1688.cn/StaticFiles/icon/20240110185402665.png';

//音频操作模块
const operateList = [
  {
    id: 1,
    text: '课表',
    src: menu,
  },
  {
    id: 2,
    text: '',
    src: left,
  },
  {
    id: 3,
    text: '',
    src: start,
  },
  {
    id: 4,
    text: '',
    src: right,
  },
  {
    id: 5,
    text: '倍速',
    src: bei,
  },
];

const AudioDetail = (props: any) => {
  const { handleLayout, title, popularCount } = props;

  // const [audioCtx, setAudioCtx] = useState<any>(null);
  // const [currentTime, setCurrentTime] = useState(0);
  // const [duration, setDuration] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    // if (audioCtx) {
    //   if (isPlaying) {
    //     audioCtx.pause();
    //   } else {
    //     audioCtx.play();
    //   }
    //   setIsPlaying(!isPlaying);
    // }
    console.log('开始暂停');
  };

  // const handleSeek = (e) => {
  //   console.log('eeeee', e);
  //   const value = e?.detail?.value;
  //   if (audioCtx) {
  //     audioCtx.seek(value || e);
  //   }
  // };
  return (
    <div>
      <div className='bg-white p-4 mb-3'>
        <div className='shadow-tile'>
          <Img isNoTheme src={cover} className='w-86 h-50' />
          <div>
            {/* <AtSlider activeColor='#FF5A31' backgroundColor='#ECECEC' blockColor='#888' blockSize={12} value={currentTime} max={duration} onChange={handleSeek} /> */}
            {/* <div className='text-mini text-right mt-1'>{`${Math.floor(currentTime)} / ${Math.floor(duration)}`}</div> */}
          </div>

          <div className='flex items-center justify-evenly py-4 mb-2'>
            {operateList.map((item) => {
              return (
                <div key={`操作${item.id}`} className='flex items-center justify-center flex-col'>
                  <Img isNoTheme src={item.src} onClick={item.id === 3 ? handlePlayPause : handleLayout} className={`${item.id === 3 ? 'w-12 h-12' : 'w-8 h-8'}`} />
                  <div className='text-mini text-assist'>{item.text}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className='mt-2'>
          <div className='text-primary-text text-base font-bold'>{title}</div>
          <span className='text-xs text-assist'>{popularCount} 人次</span>
        </div>
      </div>
    </div>
  );
};

export default memo(AudioDetail);
