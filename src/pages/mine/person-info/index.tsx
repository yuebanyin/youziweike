// import { Img } from '@/components';
import { getUserInfo, getEditUserInfo, getUploadImg } from '@/services';
import { memo, useEffect, useState } from 'react';
import avatar from '@/assets/images/common/mine/avatar.png';
import { Input, Toast, Upload } from 'esy-ui';
import { useNavigation } from '@/hooks';
import { useUserInfoStore } from '@/mobx';
// import { ssGetItem } from '@/utils';
import { Img } from '@/components';

const PersonInfo = () => {
  const navigation = useNavigation();
  const { userInfo, setUserInfo } = useUserInfoStore();

  const [userData, setUserData] = useState({
    account: '',
    nickName: '',
    profile: '',
    description: '',
  });

  useEffect(() => {
    if (userInfo) {
      const { account, nickName, profile, description } = userInfo;
      setUserData({ account, nickName, profile, description });
    }
  }, [userInfo]);

  function handleImageUpload(value) {
    if (value) {
      getUploadImg({ file: value })
        .then((res: any) => {
          console.log(res);
          setUserData({ ...userData, profile: res?.data });
        })
        .catch(() => {});
    } else {
      console.log('No file selected.');
    }
  }

  //修改自我介绍、昵称
  const handleTextareaChange = (type, value) => {
    // 如果输入的内容超过 300 字，截取前 300 字

    if (type === 'description') {
      if (value.length > 300) {
        setUserData({ ...userData, description: value.slice(0, 300) });
      } else {
        setUserData({ ...userData, description: value });
      }
    } else if (type === 'nickName') {
      setUserData({ ...userData, nickName: value });
    }
  };

  // 保存
  const handleSave = () => {
    console.log('baocun', userData);
    const { account, ...filteredObject } = userData;

    getEditUserInfo(filteredObject)
      .then((res: any) => {
        console.log(res);
        if (res?.code === 210) {
          Toast.show({
            content: '保存成功',
            duration: 1500,
            type: 'success',
          });
          //成功 存接口数据
          getUserInfo()
            .then((res: any) => {
              setUserInfo(res?.data);
            })
            .catch(() => {})
            .finally(() => {
              navigation('/mine');
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className='flex items-center justify-between border-b-[1px] border-split p-4 bg-white'>
        <div className='text-primary-text text-sm'>头像</div>
        <Upload
          onUpload={(value) => {
            handleImageUpload(value);
          }}
        >
          {userData?.profile ? <Img isNoTheme src={userData.profile || avatar} className='w-12 h-12 rounded-half' onClick={handleImageUpload} /> : <div className='text-assist'>上传头像</div>}
        </Upload>
      </div>
      <div className='flex items-center justify-between text-primary-text text-sm px-4 py-2 bg-white mb-3'>
        <div>昵称</div>
        <Input
          placeholder='请输入昵称'
          type='text'
          mode='standard'
          value={userData.nickName}
          onChange={(value) => handleTextareaChange('nickName', value)}
          classNames={{
            'standard:normal': 'bg-split peer-focus:bg-active-text peer-focus:h-px peer-focus:animate-standard-line hidden',
            input: 'border-0 bg-transparent w-full outline-0 placeholder:text-placeholder peer text-right',
          }}
        />
      </div>
      <div className='text-sm text-assist mb-1 px-4'>我的介绍（将显示在课程介绍的页面）</div>
      <div className='px-4 py-3 bg-white'>
        <Input
          value={userData.description}
          type='textarea'
          placeholder='请输入请输入我的介绍（最多300字）'
          maxLength={300}
          onChange={(value) => handleTextareaChange('description', value)}
          classNames={{ 'box:outlined:normal': 'border-split cursor-text bg-white text-primary-text hover:border-split focus-within:border-split' }}
        />
        {/* 显示当前字数 */}
        <div style={{ textAlign: 'right', marginTop: '5px' }}>
          <span>{userData.description.length}/300 字</span>
        </div>
      </div>

      <div className='w-86 h-12 flex items-center justify-center rounded-7.5 bg-active-text text-white text-lg mx-4 mt-20' onClick={handleSave}>
        保存
      </div>
    </div>
  );
};

export default memo(PersonInfo);
