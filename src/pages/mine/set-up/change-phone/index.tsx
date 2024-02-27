import { useNavigation } from '@/hooks';
import CutDown from '../cutDown';
import { getVCode, getEditMobile, getUserInfo } from '@/services';
import { Input, Toast } from 'esy-ui';
import { memo, useState } from 'react';
import { useUserInfoStore } from '@/mobx';

const ChangePhone = () => {
  const [formData, setFormData] = useState({
    mobilePhone: '',
    vCode: '',
  });

  const [showTime, setShowTime] = useState(false);

  const navigation = useNavigation();
  const { setUserInfo } = useUserInfoStore();

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  const handleTimeUP = () => {
    setShowTime(false);
  };

  // 获得验证码
  const handleVerifiCode = () => {
    if (!formData.mobilePhone || !/^\d{11}$/.test(formData.mobilePhone)) {
      Toast.show({
        content: '请输入正确手机号码',
        duration: 1500,
        type: 'warn',
      });
    } else if (showTime) {
      Toast.show({
        content: '请稍后重试',
        duration: 1500,
        type: 'warn',
      });
    } else if (!showTime && formData.mobilePhone && /^\d{11}$/.test(formData.mobilePhone)) {
      getVCode({ mobilePhone: formData.mobilePhone })
        .then((res: any) => {
          console.log(res);
          if (res.code === 210) {
            console.log(res);
            setShowTime(true);
          } else {
            console.log(res);
            Toast.show({
              content: res.Message,
              duration: 1500,
              type: 'warn',
            });
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.data.Code === -2) {
            Toast.show({
              content: error.Message,
              duration: 1500,
              type: 'error',
            });
          }
        });
    }
  };

  // 确认绑定
  const handleSubmit = () => {
    // 在这里执行提交逻辑，例如验证手机号码格式等
    if (formData.vCode && /^\d{6}$/.test(formData.vCode)) {
      getEditMobile(formData)
        .then((res: any) => {
          console.log(res);
          Toast.show({
            content: '修改成功',
            duration: 1500,
            type: 'success',
            onClose: () => {
              getUserInfo()
                .then((res: any) => {
                  setUserInfo(res?.data);
                })
                .catch(() => {})
                .finally(() => {
                  navigation('/pages/mine');
                });
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Toast.show({
        content: '请输入有效的六位验证码',
        duration: 1500,
        type: 'warn',
      });
    }
  };
  return (
    <div className='p-4'>
      <div className='text-primary-text text-xl'>更换手机号</div>
      <div className='text-sm text-assist mt-2'>请输入新手机号 </div>
      <div className='text-sm text-assist mt-2 mb-6'>当前账号已绑定微信 </div>
      {/* 输入框带有国家代码 */}
      <Input
        classNames={{ 'standard:normal': 'bg-split peer-focus:bg-active-text peer-focus:h-px peer-focus:animate-standard-line' }}
        mode='standard'
        placeholder='+86 请输入新的手机号'
        value={formData.mobilePhone}
        onChange={(value) => handleInputChange('mobilePhone', value)}
      />
      <div className='flex items-baseline justify-between mb-20 mt-6'>
        <Input
          placeholder='请输入验证码'
          type='number'
          mode='standard'
          value={formData.vCode}
          onChange={(value) => handleInputChange('vCode', value)}
          classNames={{ 'standard:normal': 'bg-split peer-focus:bg-active-text peer-focus:h-px peer-focus:animate-standard-line' }}
        />
        <div className='box-border w-25 h-8 rounded-5 flex justify-center items-center text-sm text-active-text border-2 border-active-text m-0' onClick={() => handleVerifiCode()}>
          {showTime ? <CutDown onTimeUp={handleTimeUP} second={60} /> : '获取验证码'}
        </div>
      </div>
      <div className='w-86 h-12 rounded-7.5 flex items-center justify-center bg-active-text font-bold text-lg text-white' onClick={handleSubmit}>
        完成
      </div>
    </div>
  );
};

export default memo(ChangePhone);
