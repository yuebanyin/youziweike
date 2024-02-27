import { Img } from '@/components';
import { useNavigation } from '@/hooks';
import { memo } from 'react';

const studyImg = 'https://yz-files.szdy1688.cn/StaticFiles/icon/20240120104149377.png';

const MyNotes = () => {
  const navigation = useNavigation();

  return (
    <div className='flex items-center justify-center  flex-col mt-12'>
      <Img src={studyImg} isNoTheme className='w-50 h-50 block' />
      <div className='text-base text-primary-text mt-4'>随学随机，支持各种素材格式</div>
      <div className='text-sm text-assist w-60 text-center mt-2 mb-4'>【极致版直播课】内的语音、文字素材可以添加为笔记</div>
      <div
        onClick={() => {
          navigation('/pages/studyNow/index');
        }}
        className='w-60 h-10 rounded-7.5 bg-active-text text-base text-white m-0 flex items-center justify-center'
      >
        去学习
      </div>
    </div>
  );
};

export default memo(MyNotes);
