import { Scrollbox, class_esy, isArray, stopDefault, stopPropagation } from 'esy-ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CloseIcon, CommonPay, Img } from '@/components';
import { useFormatText, handleMsgType, useNavigation } from '@/hooks';
import MsgItem from './MsgItem';
import RankBlock from './RankBlock';
import Goods from './Goods';
import Share from './Share';
import { postLiveQuickMsg, postLiveHistoryMessage } from '@/services';
import sharePng from '@/assets/images/common/live-room/share.png';

const messageImg = 'https://yz-files.szdy1688.cn/StaticFiles/Other/20240124175411295.png';
const rank = 'https://yz-files.szdy1688.cn/StaticFiles/Other/20240124175342156.png';
const lessonMore = 'https://yz-files.szdy1688.cn/StaticFiles/Other/20240124175303336.png';

function MsgBox({ messages = [], sendMessage, liveId, contentId, setMsgs, goods, name, videoSize, setGoods, ...rest }: any) {
  const [isShowIpt, setIsShowIpt] = useState(false);
  const [value, setValue] = useState('');
  const [quickMsg, setQuickMsg] = useState(null);
  const [showRank, setShowRank] = useState(false);
  const [showGood, setShowGood] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [{ data, idx, loading }, setHistoryMsg] = useState({ data: [], idx: 0, loading: false });
  const scorllboxRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (typeof liveId === 'number') {
      setHistoryMsg((o) => ({ ...o, loading: true }));
      postLiveHistoryMessage({ id: liveId })
        .then((res: any) => {
          console.warn({ res });
          if (isArray(res?.data)) {
            setMsgs((curMsgs) => [...res.data.map((it) => ({ ...handleMsgType(it), isHistory: true })), ...curMsgs]);
          }
        })
        .catch(() => {});
    }
  }, [liveId, setMsgs]);

  const text = useFormatText();

  useEffect(() => {
    if (typeof liveId === 'number' && !quickMsg) {
      postLiveQuickMsg({ id: liveId })
        .then((res: any) => {
          setQuickMsg(res?.data);
        })
        .catch(() => {});
    }
  }, [liveId, quickMsg]);

  const handleSendMessage = () => {
    if (value && value.trim() !== '') {
      // 处理发送消息的逻辑，可以将消息发送到服务器或更新本地状态
      try {
        // 执行可能抛出错误的函数
        sendMessage && sendMessage(value);
        // 清空输入框
        setValue('');
        setIsShowIpt(false);

        if (scorllboxRef.current?.scrollBottom) {
          setTimeout(() => {
            scorllboxRef.current?.scrollBottom();
          }, 600);
        }
      } catch (error) {
        // 捕获函数中的错误并进行处理
        console.error('发生了错误:', error);
      }
    }
  };

  // 发送购买商品消息
  const sendBuyMsg = useCallback(
    (v) => {
      if (sendMessage) {
        sendMessage(`${v}《${name}》`, 3);
      }
    },
    [sendMessage, name]
  );

  const handleCloseRank = useCallback(() => {
    setShowRank(false);
  }, []);

  const handleCloseGoods = useCallback(() => {
    setShowGood(false);
  }, []);

  const onQuickSend = (m) => {
    if (m && sendMessage) {
      sendMessage(m);
      if (scorllboxRef.current?.scrollBottom) {
        setTimeout(() => {
          scorllboxRef.current?.scrollBottom();
        }, 600);
      }
    }
  };

  const loadMoreData = useCallback(() => {
    // 历史记录已全部加载
    if (data.length - 1 <= idx) {
      return;
    }
    const idxEnd = idx + 10;
    setHistoryMsg((o) => ({ ...o, loading: true }));
    setMsgs((curMsgs) => [...data.slice(idx, idxEnd), ...curMsgs]);
    setHistoryMsg((o) => ({ ...o, loading: false, idx: idxEnd }));
  }, [data, idx, setMsgs]);

  const gotoView = useCallback(
    (id) => {
      navigation(`/detail?id=${id}`);
    },
    [navigation]
  );

  return (
    <div
      className='flex fixed bottom-0 top-85 left-0 right-0 flex-col flex-1 w-full overflow-hidden'
      onClick={() => {
        setIsShowIpt(false);
      }}
    >
      <Scrollbox
        ref={scorllboxRef}
        classNames={{ box: 'flex-1 overflow-x-hidden overflow-y-auto mask-imgage' }}
        list={messages}
        historyTotal={data?.length || 0}
        loadMoreData={loadMoreData}
        loading={loading}
      >
        {isArray(messages) && messages.map((msg, index) => <MsgItem key={msg.id || index} {...msg} />)}
      </Scrollbox>
      <div className='relative'>
        <div className={class_esy(['absolute right-5 bottom-0 z-10 opacity-0', goods?.isClose && 'animate-leave-x-out', goods?.title && !goods?.isClose && 'animate-leave-x-in'])} key={goods?.id}>
          <CloseIcon className='border border-assist rounded-full -right-3 -top-8 w-6 h-6 text-lg' onClick={() => setGoods((o) => ({ ...o, isClose: true }))} />
          <div className='rounded-lg p-2 bg-white'>
            <Img src={goods?.coverUrl} isNoTheme className='w-28 h-16' />
            <div className='text-primary-text text-xs line-clamp-2 mt-2 mb-1 w-28'>{goods?.title}</div>
            <CommonPay
              disPrice={goods?.discountInfo?.discountPrice}
              price={goods?.lecturePrice}
              isFree={goods?.isFree}
              id={goods?.id}
              hasCurrentContent={goods?.hasDiscount}
              contentType={goods?.contentType}
              liveId={goods?.liveId}
              gotoView={gotoView}
              isAutoBuy={false}
            />
          </div>
        </div>
      </div>
      <div
        className={`w-full py-3 px-4 bottom-0 shadow-lg ${isShowIpt ? 'bg-mask' : ''}`}
        onClick={(e) => {
          stopDefault(e);
          stopPropagation(e);
        }}
      >
        {isShowIpt && (
          <>
            {isArray(quickMsg) && quickMsg.length > 0 ? (
              <div className='flex items-center overflow-x-auto'>
                {quickMsg.map((its, i) => (
                  <div onClick={() => onQuickSend(its)} className='rounded-full bg-white text-active-text mr-2 px-1 text-xs mb-2' key={0 || i}>
                    {its}
                  </div>
                ))}
              </div>
            ) : null}
            <div className='flex justify-between items-center w-full shadow'>
              <input
                type='text'
                value={value}
                autoFocus={isShowIpt}
                onInput={(e) => {
                  setValue((e?.target as any)?.value);
                }}
                placeholder='输入消息...'
                className='flex-1 text-sm bg-live rounded-full outline-none border-0 py-4 px-3 bg-live2 h-4 text-white'
              />
              <div
                className={class_esy(['w-16 ml-2 rounded-full h-8 text-white text-sm flex items-center justify-center cursor-pointer', value ? 'bg-active-text' : 'bg-gray'])}
                onClick={handleSendMessage}
              >
                {text({ text: '发表', key: 'publish' })}
              </div>
            </div>
          </>
        )}
        <div className={`flex items-center justify-between w-full ${isShowIpt && 'hidden'}`}>
          <div
            className='flex items-center h-8 cursor-pointer pl-2 pr-3 rounded-full bg-chat'
            onClick={() => {
              setIsShowIpt(true);
            }}
          >
            <Img src={messageImg} className='block w-5 h-5 mr-2' isNoTheme />
            <div className='text-white text-xs'>{text({ text: '发表评论', key: 'post_comments' })}</div>
          </div>
          <div className='flex p-1'>
            <Img
              src={rank}
              isNoTheme
              className='w-8 h-8 mr-2 cursor-pointer'
              onClick={() => {
                setShowRank(true);
              }}
            />
            <Img
              src={lessonMore}
              isNoTheme
              className='w-8 h-8 mr-2 cursor-pointer'
              onClick={() => {
                setShowGood(true);
              }}
            />
            <Img
              src={sharePng}
              isNoTheme
              className='w-8 h-8 mr-2 cursor-pointer'
              onClick={() => {
                setShowShare(true);
              }}
            />
          </div>
          <Share open={showShare} onClose={() => setShowShare(false)} contentId={contentId} liveId={liveId} />
          <RankBlock open={showRank} liveId={liveId} handleCloseRank={handleCloseRank} />
          <Goods sendBuyMsg={sendBuyMsg} open={showGood} liveId={liveId} handleCloseGoods={handleCloseGoods} {...rest} />
        </div>
      </div>
    </div>
  );
}

export default MsgBox;
