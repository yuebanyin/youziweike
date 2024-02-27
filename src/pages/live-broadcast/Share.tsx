import { useCallback, useEffect, useState } from 'react';
import { Dialog, isArray } from 'esy-ui';
import { useLocation } from 'react-router-dom';
import { Img } from '@/components';
import { getPosterList, getCreatePoster } from '@/services';
import { envId } from '@/utils';
import { useGlobalStore, useUserInfoStore } from '@/mobx';
import { useFormatText } from '@/hooks';
import selectedPng from '@/assets/images/common/selected.png';

function Share({ onClose, open, contentId, liveId }: any) {
  const { userInfo } = useUserInfoStore();
  const { changeState } = useGlobalStore();
  const [list, setList] = useState<any>([]);
  const [id, setId] = useState<number>(-1);
  const [bigPng, setBigPng] = useState('');
  const { pathname } = useLocation();
  const text = useFormatText();
  console.warn({ pathname });

  // 得到海报
  const getBigPng = useCallback(
    ({ templateId }) => {
      changeState('isLoading', true);
      getCreatePoster({
        templateId,
        source: envId === 2 ? 2 : 1,
        spreadCode: userInfo?.spreadCode,
        pageUrl: envId === 2 ? '/detail' : `${location.origin}/web-h5/detail`,
        attach: `${contentId}&liveId=${liveId}`,
      })
        .then((res: any) => {
          setBigPng(`data:image/png;base64,${res.data}`);
          setId(templateId);
        })
        .catch(() => {})
        .finally(() => {
          changeState('isLoading', false);
        });
    },
    [changeState, contentId, liveId, userInfo?.spreadCode]
  );

  //分享海报初始化
  useEffect(() => {
    if (open && contentId) {
      changeState('isLoading', true);
      getPosterList()
        .then((res: any) => {
          setList(res.data);
          setId(res.data[0].id);
          getBigPng({ templateId: res.data[0].id });
        })
        .catch(() => {})
        .finally(() => {
          changeState('isLoading', false);
        });
    }
  }, [getBigPng, contentId, open, changeState]);

  // 切换海报
  const handleChangePoster = (item) => {
    if (item.id !== id) {
      getBigPng({ templateId: item.id });
    }
  };

  return (
    <Dialog classNames={{ mask: 'fixed inset-0 z-1000 bg-mask top-0', 'box:center': 'left-12 right-12 rounded-lg overflow-hidden' }} open={open} onClose={onClose} direction='center'>
      <>
        <Img src={bigPng} isNoTheme classNames={{ box: 'w-full flex items-center justify-center' }} />
        <div className='bg-error p-1 w-full h-6 mt-3 text-white text-xs text-center'>{text({ text: '长按上方图片发送给好友', key: 'share_desc' })}</div>

        <div className='flex overflow-x-auto p-3'>
          {isArray(list) &&
            list.map((item: any) => (
              <div
                key={item.id}
                className='mr-4 relative'
                onClick={() => {
                  handleChangePoster(item);
                }}
              >
                <Img src={item?.icon} className='block w-10' isNoTheme />
                {id === item.id && (
                  <div className='absolute left-0 right-0 bottom-0 top-0 bg-mask flex items-center justify-center z-1'>
                    <Img src={selectedPng} className='w-6 h-6' isNoTheme />
                  </div>
                )}
              </div>
            ))}
        </div>
      </>
    </Dialog>
  );
}

export default Share;
