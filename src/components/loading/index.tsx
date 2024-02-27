import { observer } from 'mobx-react-lite';
import { Loading as ELoading } from 'esy-ui';
import { useGlobalStore } from '@/mobx';
import { useFormatText } from '@/hooks';

// 全局loading组件
function Loading() {
  const text = useFormatText();
  return (
    <div className='flex items-center justify-center w-full h-full fixed left-0 right-0 bottom-0 top-0 animate-opacity-0-100 z-1000'>
      <div className=''>
        <ELoading type='wave' classNames={{ 'child:wave': 'w-1 h-3 bg-active-text m-0.5 rounded-none animate-scale-y-1-2 wave' }} />
        <div className='mt-2.5 text-center text-white text-xs'>{text({ text: '加载中', key: 'loading' })}...</div>
      </div>
    </div>
  );
}

// 全局页面中的loading
export const CommonLoading = observer(() => {
  const { isLoading } = useGlobalStore();

  if (isLoading) {
    return <Loading />;
  }

  return null;
});
