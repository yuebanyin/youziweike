import { makeAutoObservable } from 'mobx';
import { isObject } from 'esy-ui';
import { createContext, useContext } from 'react';
import { lsSetItem, lsSetJsonItem } from '@/utils';

interface UserInfoProps {
  account: string;
  description: string;
  id: number;
  isInit: boolean;
  level: number;
  nickName: string;
  profile: string;
  token: string;
  spreadCode: string;
}

const initUserInfo = {
  account: '',
  description: '',
  id: null,
  isInit: false,
  level: null,
  nickName: '',
  profile: '',
  token: '',
  spreadCode: '',
};

export class UserInfoState {
  constructor() {
    makeAutoObservable(this);
    this.setUserInfo = this.setUserInfo.bind(this);
    this.setToken = this.setToken.bind(this);
    this.setCode = this.setCode.bind(this);
    this.logout = this.logout.bind(this);
  }

  // 用户信息
  userInfo: UserInfoProps = initUserInfo;

  // 用户token
  token: string;

  // 微信内打开的code
  code: string;

  setCode(str) {
    this.code = str;
  }

  setToken(str) {
    this.token = str;
  }

  // 保存用户信息
  setUserInfo(info: any) {
    if (isObject(info)) {
      this.userInfo = { ...info };
    }
  }

  // 退出登录
  logout() {
    lsSetJsonItem('userinfo', '');
    lsSetItem('token', '');
    this.token = null;
    this.userInfo = initUserInfo;
  }
}

// 利用createContext 创建storeContext
export const storeUserInfo = createContext(new UserInfoState());

// 导出一个hook 获取全局state的变量值
export const useUserInfoStore = () => useContext(storeUserInfo);
