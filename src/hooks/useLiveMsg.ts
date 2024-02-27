import { useCallback, useState } from 'react';
import { uuid } from 'esy-ui';
import { useUserInfoStore } from '@/mobx';

// 统一数据格式
export const handleMsgType = (msgObj) => ({
  uid: msgObj?.uid,
  level: msgObj?.level,
  avatar: msgObj?.avatar_url,
  nickName: msgObj?.nickname,
  message: msgObj?.content,
  msgType: msgObj?.msg_type,
  id: uuid(12),
});

export const useLiveMsg = () => {
  const [msgs, setMsgs] = useState<any[]>([]);
  const [join, setJoin] = useState<any[]>([]);
  const { userInfo } = useUserInfoStore();

  const sendMsg = useCallback(
    (msg: any, type?: number) => {
      setMsgs((prem) => [
        ...prem,
        {
          uid: userInfo?.id,
          level: userInfo?.level,
          avatar: userInfo?.profile,
          nickName: userInfo?.nickName,
          message: msg,
          msgType: type || 1,
          id: uuid(12),
          isOwner: true,
        },
      ]);
    },
    [userInfo?.id, userInfo?.level, userInfo?.nickName, userInfo?.profile]
  );

  const handleMsg = useCallback((msg) => {
    const newMsg = JSON.parse(msg.data);
    // console.log(msg, '消息接收', newMsg);
    switch (newMsg.type) {
      case 'connect':
      case 'message':
        // console.log('connect message', newMsg?.msg);
        break;
      case 'join_room':
        setJoin((arr) => [...arr, handleMsgType({ ...newMsg?.data?.user, ...newMsg?.data?.message })]);
        break;
      case 'broadcast':
        setMsgs((prea) => [...prea, handleMsgType({ ...newMsg?.data?.user, ...newMsg?.data?.message })]);
        // console.log('111者是广播 broadcast');
        break;
      default:
        break;
    }
  }, []);

  return { msgs, sendMsg, join, setJoin, handleMsg, setMsgs };
};
