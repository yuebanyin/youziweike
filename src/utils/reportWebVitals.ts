import {
 onCLS, onFID, onLCP, onTTFB 
} from 'web-vitals';

/**
 * @description 性能检测 LCP 2.5s  FID(TBT) 100ms  CLS 0.1 | 也可以安装 web-vitals-extension 谷歌扩展工具查 | 或者在浏览器 Lighthouse 查看对应指标
 * @param cb 回调函数
 */
export const reportWebVitals = (cb) => {
  if (cb && cb instanceof Function) {
    onCLS(cb);
    onFID(cb);
    onLCP(cb);
    onTTFB(cb);
  }
};
