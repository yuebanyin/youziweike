import { Modal } from '@/components';
import { useNavigation } from '@/hooks';
import { useUserInfoStore } from '@/mobx';
import { encryptPhoneNumber, lsCleanAll, ssCleanAll } from '@/utils';
import { RightOutlined } from 'esy-ui';
import { memo, useState } from 'react';

const SetUp = () => {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const { userInfo, logout } = useUserInfoStore();

  return (
    <div>
      <div
        className='bg-white flex items-center justify-between px-4 py-3 mt-4'
        onClick={() => {
          if (userInfo?.account) {
            setOpen(true);
          } else {
            // navigation('/mine/set-up/change-phone');
            navigation('/mine/set-up/bind-phone');
          }
        }}
      >
        <div className='text-sm'>修改手机号码</div>
        <div className='flex items-center justify-center'>
          {userInfo?.account ? <div className='text-xs text-pri-red'>{encryptPhoneNumber(userInfo?.account)}</div> : <div className='text-xs text-pri-red'>为了您的信息安全，请尽快绑定手机号</div>}
          <RightOutlined className='text-guide mr-0.5' />
        </div>
      </div>

      <div
        className='w-86 h-12 rounded-7.5 flex items-center justify-center border-[1px] border-active-text m-auto font-bold text-lg text-active-text mt-20'
        onClick={() => {
          lsCleanAll();
          ssCleanAll();
          logout();
          navigation('/');
        }}
      >
        退出登录
      </div>

      <Modal
        open={open}
        title='更换手机号码'
        cancleText='取消'
        okText='确定'
        content={
          <>
            <div className='text-sm text-center text-primary-text'>当前账号已绑定微信</div>
            <div className='text-sm text-center text-primary-text'>手机号码: {encryptPhoneNumber(userInfo?.account)}</div>
          </>
        }
        onOk={() => {
          navigation('/mine/set-up/change-phone');
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default memo(SetUp);
