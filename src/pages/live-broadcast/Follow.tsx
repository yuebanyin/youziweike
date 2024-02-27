import { Dialog, class_esy, isArray } from 'esy-ui';
import { Img } from '@/components';
import { useFormatText } from '@/hooks';
import { formatW } from '@/utils';

const render = (v, isw) => {
  if (isw) {
    return formatW(v);
  }
  return v;
};

const list = [
  {
    text: '关注',
    key: 'follow',
    id: 1,
    valueKey: 'followCount',
    isw: true,
    render,
  },
  {
    text: '人气',
    key: 'people_number',
    id: 2,
    valueKey: 'popularCount',
    isw: true,
    render,
  },
  {
    text: '专栏',
    key: 'special_column',
    valueKey: 'channelCount',
    id: 3,
    render,
  },
  {
    text: '课程',
    key: 'learn',
    valueKey: 'contentCount',
    id: 4,
    render,
  },
];

function Follow({ onClose, open, src, name, isFollow, onFollow, data }: any) {
  console.warn({ data }, data.contentCount);
  const text = useFormatText();
  return (
    <Dialog classNames={{ 'box:bottom': 'h-auto w-full bottom-0 left-0 right-0 rounded-t-3xl' }} direction='bottom' open={open} onClose={onClose}>
      <div className='px-4 pb-5'>
        <div className='w-10 h-1 mx-auto my-4 bg-gray rounded-full' />
        <div className='flex items-center rounded-full px-2 py-1'>
          <Img src={src} className='w-10 h-10 block rounded-full mr-1 bg-default text-base' isNoTheme />
          <div className='text-primary-text text-base flex-1 truncate'>{name}</div>
        </div>

        <div className='flex items-center justify-between my-2'>
          {isArray(list) &&
            list.map((item: any) => (
              <div key={item.id} className='flex flex-col justify-center flex-1 items-center'>
                <div className=' text-primary-text text-lg text-center'>{item.render(data[item.valueKey], item.isw) || 0}</div>
                <div className=' text-assist text-xs text-center'>{text(item)}</div>
              </div>
            ))}
        </div>
        <div onClick={onFollow} className={class_esy(['w-full flex items-center justify-center text-sm rounded-full py-2', isFollow ? 'bg-default text-active-text' : 'bg-active-text text-white'])}>
          {isFollow ? text({ text: '已关注', key: 'followed' }) : text({ text: '关注直播间', key: 'follow_live_room' })}
        </div>
      </div>
    </Dialog>
  );
}

export default Follow;
