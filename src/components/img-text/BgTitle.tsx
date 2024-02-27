import { BgImg } from '../img';

interface BgTitleProps {
  title?: string;
  desc?: string;
  moduleStyle?: string;
}

/** 带有背景图模块标题 */
export function BgTitle(props: BgTitleProps) {
  const { title, desc } = props;
  return (
    <BgImg isNoTheme url={null}>
      <div className='text-base text-white'>{title}</div>
      <div className='text-xs text-assist mt-1'>{desc}</div>
    </BgImg>
  );
}
