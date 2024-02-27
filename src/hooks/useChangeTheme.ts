import { useCallback } from 'react';
import { setTheme } from '@/theme/changeTheme';
import { ThemeName } from '@/theme/types';
import { useGlobalStore } from '@/mobx';

export const useChangeTheme = () => {
  const { changeState } = useGlobalStore();

  // 修改主题色
  const changeTheme = useCallback(
    (t: ThemeName) => {
      setTheme(t, (t) => changeState('theme', t));
    },
    [changeState]
  );

  // 初始化主题色
  const initTheme = useCallback(() => {
    const localTheme = localStorage.getItem('theme') || 'white';
    setTheme(localTheme as ThemeName, (t) => changeState('theme', t));
  }, [changeState]);

  return { changeTheme, initTheme };
};
