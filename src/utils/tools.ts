import dayjs from 'dayjs';

/**
 * isArray 判断是否是数组
 * @param arr 要判断的数组
 * @returns boolean
 */
export const isArray = (arr: any): boolean => Array.isArray(arr);

/**
 *
 * @param phoneNumber 需要加密处理的号码
 * @returns 号码带星号
 */
export function encryptPhoneNumber(phoneNumber) {
  if (phoneNumber && phoneNumber.length === 11) {
    // 获取手机号码的前三位和后四位
    const prefix = phoneNumber.slice(0, 3);
    const suffix = phoneNumber.slice(7);

    // 将中间四位数字替换为星号
    const encryptedNumber = prefix + '****' + suffix;

    return encryptedNumber;
  } else {
    // 处理不符合要求的手机号码
    return 'Invalid Phone Number';
  }
}

/**
 * 倒计时方法
 * @param start 开始时间
 * @param end 结束时间
 */
export const countDown = (start, end) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  // 兼容ios
  // const startTime = new Date(dayjs(start).format('YYYY/MM/DD HH:mm:ss'));
  // const endTime = new Date(dayjs(end).format('YYYY/MM/DD HH:mm:ss'));

  //当前时间距离活动结束时间的差值
  const endDiff = parseInt(((endTime.getTime() - startTime.getTime()) / 1000).toString());
  const day = parseInt(String(endDiff / (24 * 60 * 60)));
  const hour = parseInt(String((endDiff / (60 * 60)) % 24));
  const minute = parseInt(String((endDiff / 60) % 60));
  const second = parseInt(String(endDiff % 60));

  return {
    endDiff,
    day,
    hour,
    minute,
    second,
  };
};

/**
 *
 * @param htmlUrl
 * @param id
 */
export const getHtmlCon = (htmlUrl, id) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', htmlUrl, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // 将返回的 HTML 内容插入到页面中
      document.getElementById(id).innerHTML = xhr.responseText;
    }
  };
  xhr.send();
};

// 处理内容详情不同类型
export const getContentUrl = (type) => {
  if (type === 2) {
    // 特惠福利
    return 'welfare';
  }
  //
  return 'detail';
};


/**
 * 
 * @param it 直播信息
 */
export const getLiveStatus = (it?) => {
  let liveStatus = ''
  // 在范围内
  if (dayjs().isAfter(it.startTime) && dayjs().isBefore(it.endTime)) {
    liveStatus = '正在直播';
  }
  // 待直播
  if (dayjs().isBefore(it.startTime)) {
    liveStatus = '待直播';

  }
  // 直播结束
  if (dayjs().isAfter(it.endTime)) {
    liveStatus = '直播结束';
  }  
  return liveStatus
}