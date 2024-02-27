import { Dialog, QRCode } from 'esy-ui';
import { getPrePay, getBuyContent, getPaySuccess } from '@/services';
import { switchEnv, envId } from '@/utils';

// interface CommonPayProps {
//   children?: string;
//   id: number;
//   isFree: boolean;
//   freecb: Function;
//   refreshList: Function;
// }

// 通用调用微信支付功能(去掉安全支付页)
// function Pay(props: CommonPayProps) {
//   const { refreshList } = props;
//   const [searchParams] = useSearchParams();
//   const id = searchParams.get('id');
//   const text = useFormatText();
//   const linkRef = useRef(false);
//   const payIdRef = useRef(null);

//   const webviewStatus = useCallback(() => {
//     // 手机内微信外监听浏览器触发
//     if (payIdRef.current && typeof refreshList === 'function' && linkRef.current && document.visibilityState === 'visible') {
//       linkRef.current = false;
//       getPaySuccess({ payOrderId: payIdRef.current })
//         .then(() => {
//           refreshList();
//         })
//         .catch(() => {})
//         .finally(() => {
//           payIdRef.current = null;
//         });
//     }
//   }, [refreshList]);

//   useEffect(() => {
//     if (envId === 3) {
//       document?.addEventListener('visibilitychange', webviewStatus);
//       return () => {
//         document?.removeEventListener('visibilitychange', webviewStatus);
//       };
//     }
//     return () => {};
//   }, [webviewStatus]);

//   useEffect(() => {
//     if (id) {
//       getBuyContent({ contentId: id })
//         .then((res: any) => {
//           payIdRef.current = res?.data;
//           getPrePay({
//             payOrderId: res?.data,
//             platformType: envId, // 2=小程序 4=微信内 3=手机端微信外 5=电脑端微信外
//           })
//             .then((result: any) => {
//               switchEnv({
//                 wxcb: () => {
//                   if (result?.data?.platformType === 4) {
//                     // 微信内支付
//                     wxPay(result?.data, {
//                       onOk: () => {
//                         getPaySuccess({ payOrderId: res?.data })
//                           .then(() => {
//                             if (typeof refreshList === 'function') {
//                               refreshList();
//                             }
//                           })
//                           .catch(() => {});
//                       },
//                     });
//                   }
//                 },
//                 phonecb: () => {
//                   if (result?.data?.platformType === 3) {
//                     // 手机内微信外
//                     viClick({ href: result?.data?.h5Url, target: '_self' });
//                     linkRef.current = true;
//                   }
//                 },
//               });
//             })
//             .catch(() => {});
//         })
//         .catch(() => {});
//     }
//   }, [id, refreshList]);

//   return (
//     <div className='bg-default w-full h-full p-4'>
//       <div className='text-base font-bold text-center mb-8'>{text({ text: '这是一个安全支付页面', key: 'safe_pay' })}</div>
//       <Img src='https://yz-files.szdy1688.cn/StaticFiles/Other/20240127150547866.png' className='h-80 w-86 m-auto' isNoTheme />
//     </div>
//   );
// }

// export default Pay;

/** 电脑端二维码支付 */
export const pcPay = (id, refreshList, text, closeLoading) => {
  getBuyContent({ contentId: id })
    .then((res: any) => {
      getPrePay({
        payOrderId: res?.data,
        platformType: envId, // 2=小程序 4=微信内 3=手机端微信外 5=电脑端微信外
      })
        .then((result: any) => {
          closeLoading && closeLoading();
          switchEnv({
            deskcb: () => {
              if (result?.data?.platformType === 5) {
                Dialog.confirm({
                  // open: true,
                  onClose: () => {
                    // 关闭弹窗调接口
                    getPaySuccess({ payOrderId: res?.data })
                      .then(() => {
                        if (typeof refreshList === 'function') {
                          refreshList();
                        }
                      })
                      .catch(() => {});
                  },
                  direction: 'center',
                  closeIcon: true,
                  title: <div className='text-primary-text text-center text-lg flex-1 font-bold ml-10 py-2'>{text({ text: '微信扫码支付', key: 'wx_pay_code' })}</div>,
                  children: (
                    <div className='w-full flex justify-center flex-col'>
                      <QRCode value={result?.data?.codeUrl} classNames={{ box: 'mx-auto p-2 shadow-tile flex my-2 rounded-xl' }} size={180} />
                      <div className='text-xs text-center text-assist mb-4'>{text({ text: '支付成功后请刷新页面', key: 'refresh_page' })}</div>
                    </div>
                  ),
                  classNames: { 'box:center': 'w-80 rounded-2xl', 'close:icon': 'cursor-pointer px-4 py-2 text-assist' },
                });
              }
            },
          });
        })
        .catch(() => {});
    })
    .catch(() => {});
};
