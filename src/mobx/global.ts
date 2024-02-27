import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';
import { showHeader, showFooter } from '@/constants';
import { ThemeName } from '@/theme/types';

/** GlobalState 类中的全局变量 */
export type GlobalStateType = 'theme' | 'languageList' | 'language' | 'showHeader' | 'showFooter' | 'isLoading' | 'token' | '';

export class GlobalState {
  constructor() {
    makeAutoObservable(this);
    this.changeState = this.changeState.bind(this);
  }

  // 主题色 默认blueyellow
  theme: ThemeName = 'white';

  // 语言列表
  languageList = [''];

  // 系统当前语言
  language = 'Zh-cn';

  // 添加到dva的目的为了可以控制头部的展示隐藏
  showHeader = showHeader;

  // 添加到dva的目的为了可以控制底部的展示隐藏
  showFooter = showFooter;

  // 全局loading
  isLoading: boolean;

  //
  token: string;

  // 修改状态
  changeState(type: GlobalStateType, value?: any) {
    this[type] = value;
  }
}

// 利用createContext 创建storeContext
export const storeGlobal = createContext(new GlobalState());

// 导出一个hook 获取全局state的变量值
export const useGlobalStore = () => useContext(storeGlobal);
