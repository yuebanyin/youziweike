import { useCallback, useState } from 'react';
import { class_esy } from 'esy-ui';
import { Img } from '@/components';
// import renshuPng from '@/assets/images/common/renshu.png';
// import Share from './Share';
import { useFormatText } from '@/hooks';
import { getOfficial } from '@/services';
import Follow from './Follow';
import { useGlobalStore } from '@/mobx';

function Header({ onlinePeople, src, id, name, isFollow, handleFollow, profile, videoSize, ...rest }: any) {
  // const [open, setOpen] = useState(false);
  const [fopen, setFopen] = useState(false);
  const text = useFormatText();
  const { changeState } = useGlobalStore();

  const onFollow = useCallback(() => {
    changeState('isLoading', true);
    getOfficial({ id })
      .then(() => {
        handleFollow();
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState, id, handleFollow]);

  return (
    <div className={`px-4 py-2 flex justify-between ${videoSize === 2 ? 'fixed z-1 top-0 w-0' : ''}`}>
      {/* <Share open={open} onClose={() => setOpen(false)} contentId={contentId} /> */}
      <Follow open={fopen} onClose={() => setFopen(false)} src={src} name={name} isFollow={isFollow} onFollow={onFollow} data={rest} />
      <div className='flex items-center bg-chat rounded-full px-1 py-1'>
        <div
          className='flex items-center'
          onClick={() => {
            setFopen(true);
          }}
        >
          <Img src={src} className='w-6 h-6 block rounded-full mr-1 bg-mask cursor-pointer' isNoTheme />
          <div className='flex flex-col text-white'>
            <div className='text-xs max-w-20.5 truncate'>{name}</div>
          </div>
        </div>

        {!isFollow ? (
          <div className={class_esy(['bg-active-text text-white text-sm w-15 h-6 rounded-full px-4 ml-4 flex items-center justify-center cursor-pointer', isFollow ? '' : ''])} onClick={onFollow}>
            {text({ text: '关注', key: 'follow' })}
          </div>
        ) : (
          <div className='flex items-center pr-0.5 ml-2 text-active-text text-xs scale-90' onClick={onFollow}>
            <div className='w-1 h-1 bg-active-text rounded-full mr-1' />
            <div>{text({ text: '已关注', key: 'followed' })}</div>
          </div>
        )}
      </div>

      <div className='flex items-center translate-x-4'>
        {['https://yz-files.szdy1688.cn/StaticFiles/Other/20240201111720579.jpg', src, profile].map((it, i) => (
          <Img key={0 || i} src={it} isNoTheme className={class_esy(['w-6 h-6 rounded-half', i === 1 && '-translate-x-2', i === 2 && '-translate-x-4'])} />
        ))}
        <div className='flex items-center text-xs text-white -translate-x-4 ml-2'>{onlinePeople}人</div>
      </div>
      {/* <Img
        src='https://yz-files.szdy1688.cn/StaticFiles/Other/20240123034750504.png'
        isNoTheme
        className='block w-18 h-8 mt-1.5 cursor-pointer'
        onClick={() => {
          setOpen(true);
        }}
      /> */}
    </div>
  );
}

export default Header;
