import { Dialog, Toast, class_esy } from 'esy-ui';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { getFreeContent } from '@/services';
import { useFormatText, useNavigation, usePay } from '@/hooks';
import { envId, formatDigit, lsSetJsonItem } from '@/utils';
import { Img } from '@/components';
import { pcPay } from '@/pages/pay';
import playPng from '@/assets/images/common/play.png';
import pausePng from '@/assets/images/common/pause.png';
import { useGlobalStore, useUserInfoStore } from '@/mobx';

interface CommonPayProps {
  id: number | string; // 内容id
  contentType?: number; // 内容类型
  liveId?: number | string; // 直播id
  isFree: boolean; // 是否免费
  hasCurrentContent: boolean; // 是否已购买
  isAutoBuy?: boolean; // 是否自动购买
  refreshList?: Function; // 购买成功后的回调
  children?: ReactNode;
  className?: string;
  type?: 1 | 2 | 3 | 4; // 1- 直播间商品立即购买(可不传，默认为1) 2-劵后价 3-试听（路由跳转） 4-试听直接播放
  url?: string; // 当type为3 路由跳转时必填
  disPrice?: string | number; // 折后价
  price?: string | number; // 原价
  onPlay?: Function; // 试听
  onPause?: Function; // 暂停
  endTime?: string; // 优惠结束时间
  startTime?: string; // 优惠开始时间
  sendBuyMsg?: Function; // 发送购买商品的消息
  gotoView?: Function; // 立即观看跳转路由
}

const payLabels = [
  {
    id: 1,
    text: '原价',
    key: 'init_price',
    valueKey: 'price',
    render: (v) => formatDigit(v),
  },
  {
    id: 2,
    text: '优惠',
    key: 'preferential',
    valueKey: '',
    render: (v, disv) => (disv ? formatDigit(v - disv) : 0),
  },
];

function CommonPayFooter({ onClose, price, disPrice, wxInnerPay }: any) {
  const text = useFormatText();
  return (
    <div className='w-full flex flex-col bg-white p-4 justify-between'>
      {/* <div></div> */}
      {payLabels.map((it) => (
        <div key={it.id} className='py-2 text-sm text-primary-text border-b border-split flex items-center justify-between'>
          <div>{text(it)}：</div>
          <div className='text-assist'>
            {it.id === 2 ? <span className='mr-2'>{text({ text: '惊喜福利', key: '' })}</span> : null}￥{it.render(price, disPrice)}
          </div>
        </div>
      ))}
      <div className='mt-2 mb-4 flex justify-end items-center'>
        <span className='text-sm text-primary-text text-right'>{text({ text: '小计', key: 'subtotal' })}：</span>
        <span className='text-sm text-active-text text-right ml-4 mr-1'>￥</span>
        <span className='text-xl text-active-text text-right'>{formatDigit(disPrice || price)}</span>
      </div>
      <div className='text-lg text-center bg-active-text text-white py-2 rounded-full' onClick={() => wxInnerPay(onClose)}>
        {text({ text: '立即支付', key: 'quick_pay' })}
      </div>
    </div>
  );
}

// 通用支付功能
export function CommonPay(props: CommonPayProps) {
  const { children, id, isFree, refreshList, hasCurrentContent, className, type = 1, disPrice, price, onPlay, onPause, contentType, gotoView, isAutoBuy = true, liveId, url, sendBuyMsg } = props;
  const text = useFormatText();
  const { changeState } = useGlobalStore();
  const { token } = useUserInfoStore();
  const navigation = useNavigation();
  const [isPlay, setIsplay] = useState(false);
  const { pathname, search } = useLocation();
  const [searchParams] = useSearchParams();
  const spreadCode = searchParams.get('c') || '';
  const marketCode = searchParams.get('t') || '';
  const [isFreeBuy, setIsFreeBuy] = useState(hasCurrentContent);

  const { wxInnerPay } = usePay({ id, onSuccess: refreshList });

  // 免费的课程购买
  const buyFree = useCallback(() => {
    changeState('isLoading', true);
    getFreeContent({ contentId: id })
      .then(() => {
        refreshList && refreshList();
        setIsFreeBuy(true);
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState, id, refreshList]);

  useEffect(() => {
    // id 没有或者不免费或者已购买走这里
    if (!id || !isFree || hasCurrentContent || !token || !isAutoBuy) return;
    buyFree();
  }, [id, isFree, hasCurrentContent, token, isAutoBuy, buyFree]);

  const handlePay = () => {
    if (!token) {
      lsSetJsonItem('source_data', { path: `${pathname}${search}`, spreadCode, marketCode });
      navigation('/login');
      return;
    }
    if (isFree && !isAutoBuy && !hasCurrentContent) {
      buyFree();
    } else if (hasCurrentContent) {
      // 已购买直播跳转
      if (contentType === 3) {
        navigation(`/live-broadcast?id=${id}&liveId=${liveId}`);
      }
    } else if (envId === 5) {
      if (sendBuyMsg) {
        sendBuyMsg('正在购买');
      }
      changeState('isLoading', true);
      // 电脑端直接出二维码弹窗
      pcPay(id, refreshList, text, () => {
        changeState('isLoading', false);
      });
    } else {
      if (sendBuyMsg) {
        sendBuyMsg('正在购买');
      }
      // 微信内以及微信外手机浏览器调用微信支付
      Dialog.confirm({
        direction: 'bottom',
        footer: <CommonPayFooter price={price} disPrice={disPrice} wxInnerPay={wxInnerPay} />,
        classNames: { 'box:bottom': 'h-60 w-full bottom-0 left-0 right-0 rounded-t-3xl' },
      });
    }
  };

  // 试听/暂停逻辑处理
  const handleClick = () => {
    if (type === 3) {
      if (url) {
        navigation(url);
      } else {
        Toast.show({ content: '页面未找到' });
      }
    } else if (!isPlay && onPlay) {
      onPlay();
      setIsplay(true);
    } else if (isPlay && onPause) {
      onPause();
      setIsplay(false);
    }
  };

  const goView = () => {
    if (typeof gotoView === 'function') {
      gotoView(id);
    } else if (contentType === 3) {
      // 已购买直播跳转
      navigation(`/live-broadcast?id=${id}&liveId=${liveId}`);
    } else {
      navigation(`/try-view?id=${id}`);
    }
  };

  if (isFreeBuy || (isFree && isAutoBuy)) {
    // if ([1, 2, 3].includes(contentType)) {
    if ([3].includes(contentType)) {
      return (
        <div className={class_esy([className || 'px-4 py-0.5 rounded-full bg-active-text text-white text-sm cursor-pointer flex items-center justify-center'])} onClick={goView}>
          {children || contentType === 3 ? text({ text: '立即观看', key: 'quite_view' }) : text({ text: '立即听课', key: 'quite_hear' })}
        </div>
      );
    }
    return null;
  }

  if ([3, 4].includes(type)) {
    return (
      <div className='flex items-center cursor-pointer'>
        <div className='flex items-center border border-active-text rounded-l-full px-6 py-3.5 h-12 bg-white' onClick={handleClick}>
          <Img src={playPng} className={class_esy(['w-5.5 h-5.5', isPlay && 'hidden'])} isNoTheme />
          <Img src={pausePng} className={class_esy(['w-5.5 h-5.5', !isPlay && 'hidden'])} isNoTheme />
          <div className='text-active-text text-lg ml-2'>{type === 3 || isPlay ? text({ text: '试听', key: 'audition' }) : text({ text: '暂停', key: 'pause' })}</div>
        </div>
        <div className={class_esy([className || 'px-4 bg-active-text text-white text-center rounded-r-full flex-1 h-12 flex flex-col items-center justify-center'])} onClick={handlePay}>
          {disPrice ? <div className='text-sm line-through -mb-2.5'>￥{formatDigit(price)}</div> : null}
          <div className='text-lg flex items-cente'>
            {children || text({ text: '立即抢购', key: 'quite_buy' })}
            {disPrice || price ? <span>￥{formatDigit(disPrice || price)}</span> : null}
          </div>
        </div>
      </div>
    );
  }

  if (type === 2) {
    return (
      <div className={class_esy([className || 'px-4 rounded-full bg-active-text text-white text-center cursor-pointer'])} onClick={handlePay}>
        {disPrice ? <div className='text-sm line-through -mb-2.5'>￥{formatDigit(price)}</div> : null}
        <div className='text-lg flex items-center justify-center'>
          {children || text({ text: '立即抢购', key: 'quite_buy' })}
          {disPrice || price ? <span>￥{formatDigit(disPrice || price)}</span> : null}
        </div>
      </div>
    );
  }

  return (
    <div className={class_esy([className || 'px-4 py-0.5 rounded-full bg-active-text text-white text-sm cursor-pointer text-center'])} onClick={handlePay}>
      {children || text({ text: '立即抢购', key: 'quite_buy' })}
    </div>
  );
}
