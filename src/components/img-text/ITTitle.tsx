import { class_esy } from 'esy-ui';

interface IttitleProps {
  title: string;
  isMore?: boolean;
  onMore?: Function;
  className?: string;
}

/** 首页模块标题 */
export function Ittitle(props: IttitleProps) {
  const { title, isMore, onMore, className } = props;

  return (
    <div className={class_esy(['flex items-center justify-between', className])}>
      <div className='text-base text-primary-text font-bold'>{title}</div>
      {isMore && (
        <div
          onClick={() => {
            onMore && onMore();
          }}
          className='text-xs text-assist'
        >
          更多 &gt;
        </div>
      )}
    </div>
  );
}
