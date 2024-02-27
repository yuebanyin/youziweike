import { useCallback, useState } from 'react';
import { Input, Form, Button, Toast, CountDown } from 'esy-ui';
import { useFormatText, useNavigation } from '@/hooks';
import { getVCode, loginByCode } from '@/services';
import { lsGetJsonItem, lsSetItem } from '@/utils';
import { useGlobalStore, useUserInfoStore } from '@/mobx';
import { CloseIcon } from '@/components';

const FormItem = Form.Item;

function PhoneLogin({ onClose }: any) {
  const { setToken } = useUserInfoStore();
  const { changeState } = useGlobalStore();
  const navigation = useNavigation();
  const text = useFormatText();
  const [status, setStatus] = useState<any>(null);

  const [form] = Form.useForm();

  const handleSubmit = () => {
    const phone = form.getFieldValue('phoneNum');
    const verifiCode = form.getFieldValue('verifiCode');
    // 处理表单提交逻辑
    if (!phone) {
      Toast.show({ content: '请输入正确手机号码' });
    } else if (!verifiCode) {
      Toast.show({ content: '请输入有效验证码' });
    } else {
      const source_data = lsGetJsonItem('source_data') || {};
      changeState('isLoading', true);
      // 验证码登录
      loginByCode({
        mobilePhone: phone,
        vCode: verifiCode,
        spreadCode: source_data?.spreadCode || '',
        marketCode: source_data?.marketCode || '',
      })
        .then((res: any) => {
          console.warn(res);
          lsSetItem('token', res?.data);
          setToken(res?.data);
          const source_data = lsGetJsonItem('source_data') || {};
          navigation(source_data?.path || '/');
        })
        .catch(() => {})
        .finally(() => {
          changeState('isLoading', true);
        });
    }
  };

  // 获得验证码
  const handleVerifiCode = () => {
    const phone = form.getFieldValue('phoneNum');
    if (!phone) {
      Toast.show({ content: '请输入正确手机号码' });
    } else if (!status) {
      getVCode({ mobilePhone: phone })
        .then(() => {
          setStatus(59);
        })
        .catch(() => {});
    }
  };

  const onEnd = useCallback(() => {
    setStatus(null);
  }, []);

  return (
    <div className='relative pt-8'>
      {onClose && (
        <div className='absolute -right-8 -top-4'>
          <CloseIcon onClick={onClose} />
        </div>
      )}
      <div className='text-base color-primary-text font-bold mb-2'>{text({ text: '手机号码登录', key: 'phone_login' })}</div>
      <div className='text-sm text-assist mb-6'>{text({ text: '*为了您的账号安全，请输入完整的手机号', key: 'phone_login_desc' })}</div>
      <Form form={form} className='w-311 h-290 bg-white m-auto br-8 p-16 boxSize-b'>
        <FormItem name='phoneNum'>
          <Input type='number' placeholder={text({ text: '请输入手机号', key: 'entry_phone' })} maxLength={11} />
        </FormItem>

        <div className='flex justify-between'>
          <FormItem name='verifiCode'>
            <Input placeholder={text({ text: '请输入验证码', key: 'entry_code' })} type='number' maxLength={6} />
          </FormItem>
          <div className='h-10 w-26 text-sm text-white bg-active-text flex items-center justify-center ml-3 rounded-lg'>
            {status ? (
              <CountDown onEnd={onEnd} time={status} type='ss' format={{ sec: text({ text: '秒', key: 'sec' }) }} />
            ) : (
              <div onClick={() => handleVerifiCode()} className=''>
                {text({ text: '获取验证码', key: 'get_verifi_code' })}
              </div>
            )}
          </div>
        </div>
        <Button classNames={{ 'box:normal': 'text-sm py-0 px-3 h-10 w-full justify-center rounded-lg' }} type='error' onClick={handleSubmit}>
          {text({ text: '登录', key: 'login' })}
        </Button>
      </Form>
    </div>
  );
}

export default PhoneLogin;
