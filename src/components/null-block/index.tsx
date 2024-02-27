import { memo, ReactNode } from 'react';
import { Img } from '../img';
import block from '@/assets/images/common/block.png';

interface CollectBlockProps {
  children?: ReactNode;
  className?: string;
  imgCls?: string;
}
const NullBlock = (props: CollectBlockProps) => {
  const { children, className, imgCls } = props;
  return (
    <div className={`flex flex-col justify-center items-center mt-12 ${className}`}>
      <Img isNoTheme src={block} className={`w-54 block ${imgCls}`} />
      {children}
    </div>
  );
};

export default memo(NullBlock);
