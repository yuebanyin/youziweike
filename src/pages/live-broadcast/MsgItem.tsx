import { Dialog, class_esy, stopDefault, stopPropagation } from 'esy-ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Img } from '@/components';
import { useFormatText } from '@/hooks';

function MsgItem({ avatar, nickName, message, msgType, level }: any) {
  const msgItemRef = useRef<HTMLDivElement>(null);
  const text = useFormatText();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (msgItemRef.current) {
      if (msgItemRef.current.offsetHeight > 39.9 || msgType === 2) {
        msgItemRef.current.className = `${msgItemRef.current.className} rounded-lg`;
      } else {
        msgItemRef.current.className = `${msgItemRef.current.className} rounded-full`;
      }
    }
  }, [msgType]);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div className='w-full overflow-hidden'>
      {msgType === 2 && (
        <Dialog direction='center' open={open} onClose={onClose}>
          <Img onClick={onClose} src={message} className='w-full rounded-sm cursor-pointer' isNoTheme />
        </Dialog>
      )}
      {msgType === 3 ? (
        <div ref={msgItemRef} className={class_esy(['mx-2 mb-1 pl-2 pr-0.5 py-0.5 text-xs max-w-3/5 font-black animate-opacity-0-100 inline-block bg-chat text-red2'])}>
          <span className='mr-1 whitespace-nowrap'>{nickName}</span>
          {message}
        </div>
      ) : (
        <div ref={msgItemRef} className={class_esy(['mx-2 mb-1 pl-0.5 pr-2 py-0.5 text-xs max-w-3/5 animate-opacity-0-100 inline-flex', level >= 50 ? 'bg-chat-act-bg font-bold' : 'bg-chat'])}>
          <Img src={avatar} className='w-4.5 h-4.5 rounded-half mr-0.5' isNoTheme />
          <div className={class_esy(['flex-1', msgType === 2 ? '' : 'inline-block'])}>
            {level === 51 && <span className='mx-1 py-0.5 px-1 bg-active-bg text-white'>{text({ text: '重点', key: 'keynote' })}</span>}
            <span className={class_esy(['whitespace-nowrap', level >= 50 ? 'text-white' : 'text-warning'])}>{nickName}：</span>
            {msgType === 1 && <span className='text-white break-all'>{message}</span>}
            {msgType === 2 && (
              <Img
                onClick={(e) => {
                  stopDefault(e);
                  stopPropagation(e);
                  setOpen(true);
                }}
                classNames={{ box: 'max-w-full h-24 cursor-pointer' }}
                className='rounded-sm h-24 py-2'
                src={message}
                isNoTheme
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MsgItem;
