import { observer } from 'mobx-react-lite';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { envId, lsGetItem, lsGetJsonItem, lsSetItem, lsSetJsonItem } from '@/utils';
import { useUserInfoStore } from '@/mobx/userInfo';
import { useNavigation } from '@/hooks';
import { getUserInfo, loginWeChatH5 } from '@/services';
import { useGlobalStore } from '@/mobx';

function GlobalStatus() {
  const { code, token, setUserInfo, setToken, setCode } = useUserInfoStore();
  const { pathname, search } = useLocation();
  const { changeState } = useGlobalStore();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const path_code = searchParams.get('code');
  const spreadCode = searchParams.get('c') || '';
  const marketCode = searchParams.get('t') || '';
  const local_token = lsGetItem('token');

  useEffect(() => {
    if (path_code && !token && !code) {
      lsSetItem('token', '');
      setCode(path_code);
      loginWeChatH5({ spreadCode, marketCode, code: path_code, platformType: [2, 4].includes(envId) ? 1 : 5 })
        .then((res: any) => {
          lsSetItem('token', res?.data);
          setToken(res?.data);
          const source_data = lsGetJsonItem('source_data') || {};
          navigation(source_data?.path || '/');
          lsSetJsonItem('source_data', { ...source_data, path: '' });
        })
        .catch((err) => {
          console.warn(err);
        });
    }
  }, [path_code, navigation, setToken, token, code, setCode, spreadCode, marketCode]);

  useEffect(() => {
    changeState('isLoading', true);
    const userInfo = lsGetJsonItem('userinfo') || {};
    if (userInfo?.token && !token) {
      // 登录后 当前页面刷新
      setUserInfo(userInfo);
      setToken(userInfo.token);
      lsSetItem('token', userInfo.token);
      changeState('isLoading', false);
    } else if (token) {
      // 获取用户信息
      getUserInfo()
        .then((res: any) => {
          lsSetJsonItem('userinfo', res?.data);
          setUserInfo(res?.data);
        })
        .catch(() => {
          lsSetJsonItem('userinfo', null);
          lsSetItem('token', '');
          if (!['/', '/login', '/detail'].includes(pathname)) {
            const source_data = lsGetJsonItem('source_data') || {};
            lsSetJsonItem('source_data', { ...source_data, path: `${pathname}${search}` });
            navigation('/');
            navigation('/login');
          }
        })
        .finally(() => {
          changeState('isLoading', false);
        });
    } else {
      changeState('isLoading', false);
    }
  }, [changeState, navigation, pathname, search, setToken, setUserInfo, token]);

  useEffect(() => {
    if (spreadCode || marketCode) {
      const source_data = lsGetJsonItem('source_data') || {};
      // 未登录记录下来源
      lsSetJsonItem('source_data', { ...source_data, spreadCode, marketCode });
    }
  }, [marketCode, pathname, search, spreadCode]);

  useEffect(() => {
    // 微信环境外
    if (!['/', '/login', '/detail'].includes(pathname) && !token && !local_token && !path_code) {
      const source_data = lsGetJsonItem('source_data') || {};
      lsSetJsonItem('source_data', { ...source_data, path: `${pathname}${search}` });
      navigation('/');
      navigation('/login');
    } else if ([3, 5].includes(envId) && pathname === '/login' && (token || local_token)) {
      navigation('/');
    }
  }, [navigation, pathname, token, local_token, path_code, search]);

  return null;
}

export default observer(GlobalStatus);
