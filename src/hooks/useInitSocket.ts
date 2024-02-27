/**
 * useInitSocket 初始化soket 实例
 * @param wsUrl 要连接的soket的服务端地址
 */
import { useCallback, useEffect, useRef } from 'react';
import { WebSocketClass } from '@/utils';

export const useInitSocket = (wsUrl: string, cb: any, sendcb: any) => {
  const wsRef = useRef<WebSocketClass | null>(null);

  // 手动关闭websoket
  const closeWebsoket = useCallback(() => {
    if (wsRef?.current) {
      wsRef.current.reconnectConfig.isReconnect = false;
      wsRef.current?.close();
      wsRef.current = null;
    }
  }, []);

  // 手动关闭websoket
  const sendMessage = useCallback(
    (msg: string, type: number = 1) => {
      if (wsRef?.current && wsRef.current.connectState) {
        wsRef.current.sendMessage({
          type: 'message',
          data: {
            message: {
              msg_type: type, // 1=文本消息 2=图片消息 3=购买消息
              content: `${msg}`, // 文本内容， 图片就是图片连接
            },
          },
        });
        if (typeof sendcb === 'function' && type !== 3) {
          sendcb(msg);
        }
      }
    },
    [sendcb]
  );

  // 连接webSocket
  const connect = useCallback(
    (count?: number) => {
      // 没有传要连接的soket地址直接return
      if (!wsUrl) {
        return;
      }
      // 浏览器不支持给出提示然后 return
      if (!window?.WebSocket) {
        // tip('当前浏览器不支持 websoket！');
        return;
      }
      if (!wsRef?.current) {
        wsRef.current = new WebSocketClass(wsUrl);
        if (count) {
          wsRef.current.reconnectConfig.reconnectCount = count;
        }
        wsRef.current.init({
          reconnectConfig: {
            isReconnect: true,
            reconnectMeans: (count?: number) => {
              closeWebsoket();
              connect(count);
            },
          },
        });
        if (cb) {
          wsRef.current.onmessage = cb;
        }
      }
    },
    [cb, closeWebsoket, wsUrl]
  );

  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => closeWebsoket, [closeWebsoket]);

  return { wsRef, closeWebsoket, sendMessage };
};
