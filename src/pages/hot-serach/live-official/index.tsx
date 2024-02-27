import { memo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getOfficial, getOfficialDetail } from '@/services';
import ImgTextList from '../detail/ImgTextList';
import { Img, Swiper } from '@/components';

function LiveOfficial() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [data, setData] = useState<any>({
    banners: [],
    channels: [],
    contents: [],
    isFollow: null,
    id: null,
    name: null,
    ipAddress: null,
    followCount: null,
    popularCount: null,
    description: null,
    profile: null,
  });

  useEffect(() => {
    getOfficialDetail({ id })
      .then((res: any) => {
        setData(res.data);
      })
      .catch(() => {});
  }, [id]);

  // 单个关注操作
  const getSingleFocus = (msg) => {
    getOfficial({
      id: data.id,
    })
      .then(() => {
        console.warn(msg);
        // Taro.showToast({ title: msg, icon: 'success', duration: 1500 });
        setData({ ...data, isFollow: !data.isFollow });
      })
      .catch(() => {});
  };

  const handleFocus = () => {
    if (data.isFollow) {
      getSingleFocus('取消成功');
    } else {
      getSingleFocus('关注成功');
    }
  };

  return (
    <div className='bg-default'>
      <div className=' px-4 py-2 bg-white shadow-down'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Img src={data.profile} className='w-12 h-12 rounded-half mr-2' isNoTheme />
            <div>
              <div className='text-primary-text text-sm'>{data.name}</div>
              <div className='text-assist text-mini'>
                {data.followCount}人关注 {data.popularCount}人气
              </div>
            </div>
          </div>
          <div className={`text-sm m-0 px-2 ${data.isFollow ? 'bg-default text-primary-text' : 'bg-active-text text-white cursor-pointer'}`} onClick={handleFocus}>
            {data.isFollow ? '已关注' : '+ 关注'}
          </div>
        </div>
        <div className='text-assist text-mini mt-2'>ip归属地： {data.ipAddress}</div>
      </div>

      {/* banner */}
      <Swiper list={data.banners} className='px-4 my-4 w-86 h-46' imgClassName='w-full h-46 rounded' />

      {/* 专栏课程 */}
      {data.channels?.length > 0 && (
        <div className='m-4'>
          <div className='flex items-center justify-between'>
            <div className='text-base font-bold'>专栏（{data.channels.length}）</div>
          </div>
          <ImgTextList data={data.channels} />
        </div>
      )}
      {data.contents?.length > 0 && (
        <div className='flex flex-col flex-1 m-4'>
          <div className='text-base font-bold'>课程</div>
          <ImgTextList data={data.contents} />
        </div>
      )}
    </div>
  );
}

export default memo(LiveOfficial);
