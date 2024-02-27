import { Img } from '@/components';
import { memo, ReactNode } from 'react';

const boxPng = 'https://yz-files.szdy1688.cn/StaticFiles/icon/20240111154007099.png';

interface CollectBlockProps {
  children?: ReactNode;
}

const CollectBlock = (props: CollectBlockProps) => {
  const { children } = props;
  return (
    <div className='flex items-center justify-center flex-col mt-14'>
      <Img isNoTheme src={boxPng} className='w-40 h-40' />
      {children}
    </div>
  );
};

export default memo(CollectBlock);
