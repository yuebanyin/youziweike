/** 直播间列表 */

import { Img } from '@/components';
import { formatW } from '@/utils/digit';

function ImgArticle({ data, onClick }: any) {
  if (!Array.isArray(data)) return null;

  return (
    <>
      {data.map((it, i) => (
        <div
          onClick={() => {
            if (typeof onClick === 'function') {
              onClick(it);
            }
          }}
          className='flex mx-4 py-4 border-b border-split cursor-pointer'
          key={it.id || i}
        >
          <Img src={it.profile} className='w-12 h-12 rounded-half mr-2' isNoTheme />
          <div className='flex-1 flex flex-col'>
            <span className='line-clamp-2 text-sm'>{it.name}</span>
            <span className='text-assist text-sm mt-0.2'>{formatW(it.popularCount)}人关注</span>
            <span className='text-assist text-sm line-clamp-2 mt-1'>{it.description}</span>
          </div>
        </div>
      ))}
    </>
  );
}

export default ImgArticle;
