import { Toast } from 'esy-ui';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Img } from '@/components';
import lizhi from '@/assets/images/common/lizhi.png';
import wechat from '@/assets/images/common/wechat.png';
import phone from '@/assets/images/common/phone.png';
import qq from '@/assets/images/common/qq.png';
import alipay from '@/assets/images/common/alipay.png';
import weibo from '@/assets/images/common/weibo.png';
import PhoneLogin from './PhoneLogin';
import { envId, wxInnerLogin } from '@/utils';
import { useFormatText } from '@/hooks';
// import { commonPrefix } from '@/services';
// import { useUserInfoStore } from '@/mobx';
import PhoneModal from './PhoneModal';

const loginTypes = [
  {
    id: 1,
    title: '手机号码登录',
    src: phone,
  },
  {
    id: 2,
    title: 'QQ登录',
    src: qq,
  },
  {
    id: 3,
    title: '支付宝登录',
    src: alipay,
  },
  {
    id: 4,
    title: '微博登录',
    src: weibo,
  },
];

function Login() {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const text = useFormatText();

  console.warn({ code }, envId);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    // 微信环境外
    if ([5].includes(envId) && window.WxLogin) {
      const obj = new window.WxLogin({
        self_redirect: false,
        id: 'youzi_code_login',
        appid: 'wx3b9c103936f91691',
        scope: 'snsapi_login',
        redirect_uri: encodeURI('https://yz-h5.szdy1688.cn/web-h5'),
        href: 'https://yz-h5.szdy1688.cn/web-h5/commonModule/qrcode.css',
        state: 'youziweike',
      });
      console.warn(obj);
    }
  }, []);

  const handleClick = (item) => {
    console.warn('uselogin', item);
    if (item.id === 1) {
      setOpen(true);
    } else {
      Toast.show({ type: 'info', content: '暂未开启此功能' });
    }
  };

  if (envId === 3) {
    // 手机浏览器微信外
    return (
      <div className='bg-default pt-10 flex items-center flex-col h-full'>
        <Img src={lizhi} className='w-50 h-15 mb-12' isNoTheme />
        <PhoneLogin />
      </div>
    );
  }

  if ([2, 4].includes(envId)) {
    // 微信环境内
    return (
      <div className='bg-default pt-10 flex items-center flex-col h-full'>
        <PhoneModal open={open} onClose={handleClose} />
        <Img src={lizhi} className='w-50 h-15' isNoTheme />
        <div className='my-12'>
          <div className='text-primary-text'>{text({ text: '请勾选，同意授权“柚子微课”获取用户信息', key: 'wx_login' })}</div>
        </div>
        <div onClick={wxInnerLogin} className='px-4 py-2 m-4 h-10 text-center bg-active-text text-white rounded-3xl w-3/5'>
          {text({ text: '微信登录', key: 'wx_login' })}
        </div>
        <div onClick={() => handleClick({ id: 1 })} className='px-4 py-2 h-10 text-center bg-active-text text-white rounded-3xl w-3/5'>
          {text({ text: '手机号登录', key: 'phone_login' })}
        </div>
      </div>
    );
  }

  return (
    <div className='bg-default pt-10 flex items-center flex-col h-full'>
      <PhoneModal open={open} onClose={handleClose} />
      <Img src={lizhi} className='w-50 h-15' isNoTheme />

      <div className='bg-white w-80 h-80 shadow-lg my-12 p-4 text-center rounded'>
        <Img src={wechat} className='w-25 h-5 mx-auto' isNoTheme />
        <div id='youzi_code_login' className='w-45 h-45 my-5 mx-auto overflow-hidden border border-split' />
        <div className='text-sm text-primary-text'>{text({ text: '请使用微信扫描二维码登录“柚子微课”', key: 'code_desc' })}</div>
      </div>

      <div className='flex items-center w-full px-4'>
        {loginTypes.map((item) => (
          <div className='flex items-center justify-center flex-col flex-1 cursor-pointer' key={item.id} onClick={() => handleClick(item)}>
            <Img src={item.src} className='w-8 h-6' isNoTheme />
            <div className='text-xs text-assist'>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Login;
