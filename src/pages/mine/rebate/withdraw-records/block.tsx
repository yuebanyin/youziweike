import { Img } from '@/components';
import { memo } from 'react';

const boxPng = 'https://yz-files.szdy1688.cn/StaticFiles/icon/20240119190520215.png';

const RecordsBlock = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-12'>
      <Img isNoTheme src={boxPng} className='w-40 h-40' />
      <div className='text-sm text-assist'>暂无提现记录</div>
    </div>
  );
};

export default memo(RecordsBlock);
