import { useCallback, useEffect, useRef } from 'react';
import { getPrePay, getBuyContent, getPaySuccess } from '@/services';
import { switchEnv, viClick, wxPay, envId } from '@/utils';
import { useGlobalStore } from '@/mobx';

interface CommonPayProps {
  id: number | string;
  onSuccess?: Function;
}

// 通用调用微信支付功能
export function usePay(props: CommonPayProps) {
  const { onSuccess, id } = props;
  const linkRef = useRef(false);
  const payIdRef = useRef(null);
  const { changeState } = useGlobalStore();

  const webviewStatus = useCallback(() => {
    // 手机内微信外监听浏览器触发
    if (payIdRef.current && typeof onSuccess === 'function' && linkRef.current && document.visibilityState === 'visible') {
      changeState('isLoading', true);
      linkRef.current = false;
      getPaySuccess({ payOrderId: payIdRef.current })
        .then(() => {
          onSuccess();
        })
        .catch(() => {})
        .finally(() => {
          payIdRef.current = null;
          changeState('isLoading', false);
        });
    }
  }, [changeState, onSuccess]);

  useEffect(() => {
    if (envId === 3) {
      document?.addEventListener('visibilitychange', webviewStatus);
      return () => {
        document?.removeEventListener('visibilitychange', webviewStatus);
      };
    }
    return () => {};
  }, [webviewStatus]);

  const wxInnerPay = useCallback(
    (cb?: Function) => {
      if (id) {
        changeState('isLoading', true);
        getBuyContent({ contentId: id })
          .then((res: any) => {
            payIdRef.current = res?.data;
            getPrePay({
              payOrderId: res?.data,
              platformType: envId, // 2=小程序 4=微信内 3=手机端微信外 5=电脑端微信外
            })
              .then((result: any) => {
                switchEnv({
                  wxcb: () => {
                    if (result?.data?.platformType === 4) {
                      // 微信内支付
                      wxPay(result?.data, {
                        onOk: () => {
                          getPaySuccess({ payOrderId: res?.data })
                            .then(() => {
                              if (typeof onSuccess === 'function') {
                                onSuccess();
                              }
                            })
                            .catch(() => {})
                            .finally(() => {
                              cb && cb();
                            });
                        },
                        onCancel: () => {
                          cb && cb();
                        },
                        onFail: () => {
                          cb && cb();
                        },
                      });
                    }
                  },
                  phonecb: () => {
                    if (result?.data?.platformType === 3) {
                      // 手机内微信外
                      viClick({ href: result?.data?.h5Url });
                      linkRef.current = true;
                    }
                  },
                });
              })
              .catch(() => {});
          })
          .catch(() => {})
          .finally(() => {
            changeState('isLoading', false);
          });
      }
    },
    [changeState, id, onSuccess]
  );

  return { wxInnerPay };
}
