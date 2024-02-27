import { observer } from 'mobx-react-lite';
import { isArray, pick } from 'esy-ui';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInitSocket, useLiveMsg, useNavigation, useSingalr } from '@/hooks';
import Header from './Header';
import LiveVideo from './LiveVideo';
import MsgBox from './MsgBox';
import { getOfficialDetail, getContentDetail, getLiveSign } from '@/services';
import { useGlobalStore, useUserInfoStore } from '@/mobx';

// 直播soket
const getWsUrl = ({ sign, avatar_url, uid, nickname, webLiveId, level }) => {
  if (!sign || !webLiveId) return '';
  return `wss://yy5.szdy1688.cn/ws/ws-chat.io?tag=chat&token=${sign}&access_id=1005&live_id=${webLiveId}&avatar_url=${avatar_url}&uid=${uid}&level=${level}&nickname=${nickname}&EIO=3&transports=websocket`;
};

function LiveBroadcast() {
  const [serachParams] = useSearchParams();
  const contentId = serachParams.get('id') || serachParams.get('a');
  const { changeState } = useGlobalStore();
  const liveId = serachParams.get('liveId');
  const { userInfo } = useUserInfoStore();
  const [sign, setSign] = useState(null);

  const navigation = useNavigation();
  const [officealInfo, setOfficealInfo] = useState(null);
  const [info, setInfo] = useState(null);
  const [liveInfo, setLiveInfo] = useState<any>({});

  const { msgs, sendMsg, handleMsg, setMsgs } = useLiveMsg();

  const { wsRef, sendMessage } = useInitSocket(
    getWsUrl({
      avatar_url: userInfo?.profile,
      uid: userInfo?.id,
      nickname: userInfo?.nickName,
      sign,
      webLiveId: liveInfo?.webLiveId,
      level: `${userInfo?.level}`,
    }),
    handleMsg,
    sendMsg
  );
  const { goods, onlinePeople, setGoods } = useSingalr(liveInfo?.id);

  console.warn({ wsRef, liveInfo, liveId });

  useEffect(() => {
    if (liveInfo?.webLiveId && userInfo?.id) {
      getLiveSign({
        live_id: liveInfo?.webLiveId,
        avatar_url: userInfo?.profile,
        level: userInfo?.level,
        uid: userInfo?.id,
        nickname: userInfo?.nickName,
      })
        .then((res: any) => {
          setSign(res?.data);
        })
        .catch(() => {});
    }
  }, [liveInfo?.webLiveId, userInfo?.id, userInfo?.level, userInfo?.nickName, userInfo?.profile]);

  const handleFollow = useCallback(
    (oId?: number) => {
      if (typeof liveInfo?.officialId === 'number' || typeof oId === 'number') {
        // 获得直播官号;
        getOfficialDetail({ id: oId || liveInfo?.officialId })
          .then((res: any) => {
            setOfficealInfo(res.data);
          })
          .catch(() => {})
          .finally(() => {
            changeState('isLoading', false);
          });
      } else {
        changeState('isLoading', false);
      }
    },
    [changeState, liveInfo?.officialId]
  );

  useEffect(() => {
    if (userInfo?.token && contentId && !info?.id && Number(liveId) >= 0) {
      changeState('isLoading', true);
      getContentDetail({ id: contentId })
        .then((res: any) => {
          if (isArray(res?.data?.lives) && res?.data?.lives.length > 0) {
            if (!res?.data?.hasCurrentContent) {
              changeState('isLoading', false);
              navigation(`/detail?id=${contentId}&type=${res?.data?.contentType}`);
            } else {
              setInfo(res?.data);
              const linfo = res?.data?.lives?.find((it) => `${it.id}` === liveId);
              setLiveInfo(linfo);
              // 获得直播官号;
              handleFollow(linfo?.officialId);
            }
          }
        })
        .catch(() => {
          changeState('isLoading', false);
        });
    }
  }, [userInfo?.token, contentId, handleFollow, liveId, info?.id, changeState, navigation]);

  return (
    <div className={`flex flex-col w-full h-full overflow-hidden ${info?.courses?.videoSize === 2 ? '' : 'bg-live'}`}>
      <Header
        onlinePeople={onlinePeople}
        name={officealInfo?.name}
        src={officealInfo?.profile}
        contentId={contentId}
        videoSize={info?.courses?.videoSize}
        handleFollow={handleFollow}
        id={liveInfo?.officialId}
        profile={userInfo?.profile}
        {...pick(officealInfo, ['channelCount', 'isFollow', 'contentCount', 'followCount', 'popularCount'])}
      />
      <LiveVideo videoSize={info?.courses?.videoSize} id={liveInfo?.webLiveId} src={liveInfo?.liveUrl} licenseUrl={liveInfo?.coverUrl} endTime={liveInfo?.endTime} startTime={liveInfo?.startTime} />
      <MsgBox
        messages={msgs}
        sendMessage={sendMessage}
        endTime={info?.discountInfo?.endTime}
        startTime={info?.discountInfo?.startTime}
        liveId={liveInfo?.id}
        contentId={contentId}
        videoSize={info?.courses?.videoSize}
        setMsgs={setMsgs}
        goods={goods}
        name={liveInfo?.title}
        setGoods={setGoods}
      />
    </div>
  );
}

export default observer(LiveBroadcast);
