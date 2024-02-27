import { useCallback } from 'react';
import { useNavigate as useAutoNavigate, NavigateOptions } from 'react-router-dom';
// import { useUserInfoStore } from '@/mobx';
import { lsGetItem } from '@/utils';

export const useNavigation = () => {
  const autoNavigate = useAutoNavigate();
  // const { token } = useUserInfoStore();
  const navigate = useCallback(
    (p, option?: NavigateOptions, href?: string) => {
      if (href) {
        const w = window.open('about:_blank');
        if (w) w.location.href = href;
      } else if (!lsGetItem('token') && !['/', '/login', '/detail'].includes(p)) {
        // wxInnerLogin();
        autoNavigate('/login');
      } else {
        autoNavigate(p, option);
      }
    },
    [autoNavigate]
  );

  return navigate;
};
