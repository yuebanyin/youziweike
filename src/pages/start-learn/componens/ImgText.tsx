/** 上图下文格式 开始学习-猜你喜欢 */
import vpng from '@/assets/images/common/start-learn/Vector.png';
import { formatW } from '@/utils';
import { Img } from '@/components';

function ImgText(props: any) {
  const { data, onClickItem } = props;

  return (
    <div className='grid grid-cols-2 gap-3'>
      {data.map((it) => (
        <div
          onClick={() => {
            onClickItem && onClickItem(it);
          }}
          key={`图文${it?.id}`}
          className='flex flex-col justify-center bg-white mb-3 shadow-lg rounded cursor-pointer'
        >
          <Img src={it.coverUrl} className='w-42 h-24 rounded-t' isNoTheme />
          <div className='line-clamp-2 text-sm mx-2 my-1 flex-1'>{it.title}</div>
          <div className='flex items-center justify-between mx-2 h-6'>
            <div className='text-sm text-active-text'>￥{it.lecturePrice}</div>
            <div className='flex items-center justify-end'>
              <Img src={vpng} className='w-3 h-3 mx-1' isNoTheme />
              <span className='text-sm text-assist'>{formatW(it.popularCount)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImgText;
