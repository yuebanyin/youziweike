import { wx_login_url } from '@/constants';
import { lsGetJsonItem } from './localStorage';

/**
 * 判断是否是在微信内
 * @returns {boolean}
 */
export const iswx = () => {
  const ua = window?.navigator?.userAgent?.toLowerCase();
  const isweixin = ua.match(/micromessenger/i);
  if (isweixin && isweixin[0] === 'micromessenger') {
    return true;
  }
  return false;
};

/**
 * 根据不同环境处理不同的回调
 * // 2=小程序 4=微信内 3=手机端微信外 5=电脑端微信外
 * @returns
 */
export const { envId, switchEnv } = (() => {
  const ua = window?.navigator?.userAgent?.toLowerCase();
  const platform = window?.navigator?.platform;
  const isweixin = ua.match(/micromessenger/i);
  // 微信内环境
  if (isweixin && isweixin[0] === 'micromessenger') {
    return {
      envId: 4,
      switchEnv: ({ wxcb }: { wxcb?: Function }) => {
        if (typeof wxcb === 'function') {
          wxcb();
        }
      },
    };
  }
  // 微信外 电脑浏览器
  if (['Win32', 'HP-UX', 'Linux i686', 'Linux armv7l', 'Mac68K', 'MacPPC', 'MacIntel', 'SunOS', 'Win16', 'WebTV OS'].includes(platform)) {
    return {
      envId: 5,
      switchEnv: ({ deskcb }: { deskcb?: Function }) => {
        if (typeof deskcb === 'function') {
          deskcb();
        }
      },
    };
  }
  // 微信外 手机浏览器
  return {
    envId: 3,
    switchEnv: ({ phonecb }: { phonecb?: Function }) => {
      if (typeof phonecb === 'function') {
        phonecb();
      }
    },
  };
})();

/**
 * 微信外手机内浏览器拉起支付
 * @param param0
 */
export const viClick = ({ href }: any) => {
  window.location.href = href;
  // window.open(href);
  // let a;
  // a = document.createElement('a');
  // a.href = href;
  // a.rel = `noopener noreferrer ${rel}`;
  // a.target = target;
  // a.click();
  // a = null;
};

/**
 * 微信内调用支付
 * @param param0
 */
export const wxPay = (params: any, { onOk, onFail, onCancel }: { onOk?: Function; onFail?: Function; onCancel?: Function }) => {
  if (window?.WeixinJSBridge && params) {
    window.WeixinJSBridge?.invoke(
      'getBrandWCPayRequest',
      {
        appId: params?.appId,
        timeStamp: params?.timeStamp,
        nonceStr: params?.nonceStr,
        package: params?.package,
        signType: 'MD5',
        paySign: params?.paySign,
      },
      (res) => {
        if (res.err_msg === 'get_brand_wcpay_request:ok' && typeof onOk === 'function') {
          // 支付成功
          onOk();
        }
        if (res.err_msg === 'get_brand_wcpay_request:cancel' && typeof onFail === 'function') {
          // 支付失败
          onFail();
        }
        if (res.err_msg === 'get_brand_wcpay_request:fail' && typeof onCancel === 'function') {
          // 取消
          onCancel();
        }
      }
    );
  }
};

/**
 * 微信内拉起登录
 */
export const wxInnerLogin = () => {
  const source_data = lsGetJsonItem('source_data') || {};
  let wx_url = wx_login_url;
  if (source_data.path) {
    wx_url = `${wx_url}${source_data.path}`;
  }
  window.location.href = wx_url;
};
