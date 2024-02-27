/** 排行榜底部弹窗 */
import { useCallback, useEffect, useState, memo } from 'react';
import { Dialog, isArray } from 'esy-ui';
import { getSpreadList } from '@/services';
import { CloseIcon, Img } from '@/components';
import { useFormatText } from '@/hooks';
import topPng from '@/assets/images/common/live-room/top.png';
import secPng from '@/assets/images/common/live-room/second.png';
import thirdPng from '@/assets/images/common/live-room/third.png';
import NullBlock from '@/components/null-block';

interface RankBlockProps {
  open?: boolean;
  liveId?: string | number;
  handleCloseRank: any;
}

const rankTop = 'https://yz-files.szdy1688.cn/StaticFiles/Other/20240124175447922.png';

const imgMap = [topPng, secPng, thirdPng];

function RankBlock(props: RankBlockProps) {
  const { open, liveId, handleCloseRank } = props;
  // const [page, setPage] = useState(1);
  const [data, setData] = useState<any>([]);
  const text = useFormatText();

  // console.warn({ data, open, liveId });

  const getDataList = useCallback(
    (pageIndex) => {
      if (typeof liveId === 'number' && open) {
        getSpreadList({
          pageIndex,
          pageSize: 100,
          liveId,
        })
          .then((res: any) => {
            setData(res?.data);
          })
          .catch(() => {});
      }
    },
    [liveId, open]
  );

  useEffect(() => {
    getDataList(1);
  }, [getDataList]);

  return (
    <Dialog classNames={{ 'box:bottom': 'h-96 w-full bottom-0 left-0 right-0 rounded-t-3xl' }} direction='bottom' open={open} onClose={handleCloseRank} className='pt-5'>
      <div className='flex flex-col h-full'>
        <CloseIcon onClick={handleCloseRank} />
        <Img className='w-full absolute -top-6 z-1' src={rankTop} isNoTheme />
        <span className='text-lg text-center font-bold color-m-black z-1 left-0 right-0 top-4 absolute'>{text({ text: '好友助力榜', key: 'friend_assistance_list' })}</span>
        {data?.length > 0 ? (
          <div className='flex flex-col flex-1 overflow-y-auto mt-16'>
            {isArray(data) &&
              data.map((item: any, i) => {
                const pngUrl = [0, 1, 2].includes(i) && imgMap[i] ? imgMap[i] : null;
                console.warn({ pngUrl });
                return (
                  <div className={`flex items-center py-3 justify-between px-4 ${i % 2 === 0 ? 'bg-default' : 'bg-white'}`} key={`yqb-${item.id || i}`}>
                    <div className='flex items-center'>
                      <div className='w-8 mr-4'>
                        {[0, 1, 2].includes(i) && <Img src={imgMap[i]} isNoTheme className='h-8' />}
                        {i > 2 ? <div className='text-base text-warning'>{i + 1}</div> : null}
                      </div>
                      <div className='flex items-center'>
                        <Img src={item.profile} className='w-8 h-8 rounded-full mr-2' isNoTheme />
                        <div className='text-base text-primary-text'>{item.nickName}</div>
                      </div>
                    </div>
                    <div className='text-sm text-assist'>
                      {text({ text: '邀请', key: 'invite' })}
                      <span className='text-active-text mx-2 tesx-base'>{item.count}</span>
                      {text({ text: '人', key: 'people' })}
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <NullBlock className='pt-8'>
            <div className='text-assist text-sm text-center'> 暂无数据</div>
          </NullBlock>
        )}
      </div>
      a
    </Dialog>
  );
}

export default memo(RankBlock);
