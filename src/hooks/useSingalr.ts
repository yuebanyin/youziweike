import { useEffect, useRef, useState } from 'react';
import * as Signalr from '@microsoft/signalr';
import { useUserInfoStore } from '@/mobx';
import { lsGetJsonItem } from '@/utils';

export const useSingalr = (id) => {
  const swxRef = useRef(null);
  const { token } = useUserInfoStore();
  const [goods, setGoods] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState(0);

  useEffect(
    () => () => {
      // 组件卸载时关闭soket
      if (swxRef.current) {
        swxRef.current.stop();
        swxRef.current = null;
      }
    },
    []
  );

  useEffect(() => {
    if (token && id && !swxRef.current) {
      const sourceData = lsGetJsonItem('source_data') || {};
      swxRef.current = new Signalr.HubConnectionBuilder()
        .withAutomaticReconnect()
        .withUrl(`https://yz-frontapi.szdy1688.cn/socket?liveId=${id}&spreadCode=${sourceData?.spreadCode}`, {
          accessTokenFactory: () => token,
        })
        .configureLogging(Signalr.LogLevel.Error)
        .build(); // 小程序这一步报错
      swxRef.current
        .start()
        .then(() => {
          swxRef.current?.on('ConnectionSuccess', (res) => {
            console.warn('sigalr 连接成功', res);
          });
          swxRef.current?.on('AuthError', (res) => {
            console.warn('sigalr 鉴权失败', res);
          });
          swxRef.current?.on('Receive', (res) => {
            if (res.type === 121) {
              switch (res.subType) {
                case 1:
                  setGoods(res.data);
                  break;
                case 3:
                  setOnlinePeople(res.data);
                  break;
                default:
                  break;
              }
            }
          });
        })
        .catch((err) => {
          console.warn('sigalr 连接失败', err);
        });
    }
  }, [id, token]);

  return { swxRef, goods, onlinePeople, setGoods };
};
