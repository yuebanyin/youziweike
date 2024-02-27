import { Toast } from 'esy-ui';
import { ssCleanAll, lsGetItem } from './localStorage';
import axios from 'axios';

const noSignApi = [
  'Api/Client/V2/Index/MoreList',
  'Api/Client/V2/Index/Init',
  'Api/Client/V2/Index/CategoryInit',
  'Api/Client/V2/Index/SubCategory',
  'Api/Client/V2/Index/SubMoreList',
  'Api/Client/V2/Login/WeChatH5',
  'Api/Client/V2/Login/GetVCode',
  'Api/Client/V2/Login/VCode',
  'Api/Client/V2/Content/Detail',
];

// export const UTObj = {
//   UT: '',
// };

let isOneTip = false;

// 接口返回的类型
export interface Res {
  data: {
    Code: number;
    Message: string;
    Data: any;
    Count?: number;
    [key: string]: any;
  };
}

// 初始化实例
const service = axios.create({
  baseURL: '/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
service.interceptors.request.use((config) => {
  const autoConfig = { ...config };
  // 请求头添加毫秒级时间戳
  const timeStamp = new Date().getTime();
  autoConfig.headers['time-stamp'] = timeStamp;
  try {
    const token = lsGetItem('token');
    if (token) {
      autoConfig.headers['X-Litemall-Token'] = token;
    }
  } catch (error) {
    console.error(error);
  }

  // 语言
  const language = lsGetItem('language');
  if (language) {
    autoConfig.headers.Language = language;
  }
  return config;
});

// 登录过期封装
const loginExpire = (msg?: string) => {
  console.error(msg);
};

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { status, data } = response;
    const code = data?.code;
    const msg = data?.message;
    // 如果请求状态是200并且返回的数据中code是210为请求成功
    if (status === 200) {
      if (code === 210) {
        return Promise.resolve(data);
      }
      Toast.show({ content: msg });
      //参数异常;
      if ([-2, -3, -4].includes(code)) {
        // 上面已经抛出错误这里不在做操作
        if (!isOneTip) {
          isOneTip = true;
          // tip(msg);
          setTimeout(() => {
            isOneTip = false;
          }, 2000);
        }
      } else if (code === -999) {
        // 权限校验失败
        loginExpire(msg);
        ssCleanAll();
      } else if ([-1000, -1001].includes(code)) {
        // token 失效
        loginExpire(msg);
        ssCleanAll();
      }
    }
    return Promise.reject(response);
  },
  (error: { response: { status: any }; message: string | string[] }) => {
    // axios设置的timeout超过后接口没有返回就会走这里
    if (!error.response && error?.message.indexOf('timeout') !== -1) {
      // tip('网络请求超时');
      return Promise.reject(error);
    }
    // 这里只会捕获http请求失败的状态码3x、4x、5x等
    switch (error?.response?.status) {
      // 未登录
      case 401:
        loginExpire();
        break;
      // token 过期
      case 403:
        loginExpire();
        break;
      // 网络请求不存在
      case 404:
        // tip('网络请求不存在');
        break;
      // 服务端错误
      case 501:
      case 502:
      case 503:
      case 504:
        // tip('服务端错误');
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url: string, params?: Record<string, any>) {
  return new Promise((resolve, reject) => {
    service
      .get(url, { params })
      .then((res: Res) => resolve(res))
      .catch((err: Res) => reject(err));
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function post(url: string, params: Record<string, any>) {
  return new Promise((resolve, reject) => {
    if (lsGetItem('token') || noSignApi.includes(url)) {
      service
        .post(url, params)
        .then((res: Res) => resolve(res))
        .catch((err: Res) => reject(err));
    }
  });
}

/**
 * postForm方法，对应postForm请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function postForm(url: string, params: Record<string, any>) {
  // TODO 文件上传需要对参数进行formData 转化，目前还没用到，还未实现
  return new Promise((resolve, reject) => {
    service
      .postForm(url, params)
      .then((res: Res) => resolve(res))
      .catch((err: Res) => reject(err));
  });
}

export { get, post, postForm };
