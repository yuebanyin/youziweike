import { makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';

export class HomeState {
  constructor() {
    makeAutoObservable(this);
    this.setMoreStatus = this.setMoreStatus.bind(this);
  }

  // 是否有更多推荐
  hasMore: boolean;

  // 推荐对应的id
  firstIndex: number;

  // 修改状态
  setMoreStatus(idx: number, isMore: boolean) {
    this.firstIndex = idx;
    this.hasMore = isMore;
  }
}

// 利用createContext 创建storeContext
export const storeHome = createContext(new HomeState());

// 导出一个hook 获取全局state的变量值
export const useHomeStore = () => useContext(storeHome);
