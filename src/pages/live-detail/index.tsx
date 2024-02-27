import { Img } from '@/components';
import { getConDetail, getLecturerInfo, getOfficial, getOfficialDetail } from '@/services';
import { memo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import fire from '@/assets/images/common/detail/fire.png';
import { useNavigation } from '@/hooks';
import { Toast } from 'esy-ui';

const LiveDetail = () => {
  const navigation = useNavigation();
  const [serachParams] = useSearchParams();
  const liveId = serachParams.get('liveId');
  const classId = serachParams.get('id') || serachParams.get('a');
  const [detailData, setDetailData] = useState<any>({
    coverUrl: '',
    lives: [],
    popularCount: '',
  }); // 页面信息

  const [liveInfo, setLiveInfo] = useState<any>({});
  const [lecturerInfo, setLecturerInfo] = useState<any>({});
  const [officialInfo, setOfficialInfo] = useState<any>({ profile: '', isFollow: '', name: '', followCount: '' });

  // 获取直播信息
  useEffect(() => {
    getConDetail({ id: classId })
      .then((res: any) => {
        if (res?.code === 210) {
          const { coverUrl, lives, popularCount, hasCurrentContent } = res?.data;
          lives.find((item) => {
            if (item?.id === Number(liveId)) {
              setLiveInfo(item);
            }
          });

          // 没有购买去详情购买
          if (!hasCurrentContent) {
            navigation(`/detail?id=${classId}`);
          }

          setDetailData({
            coverUrl,
            lives,
            popularCount,
          });
        }
      })
      .catch((error) => console.log(error));
  }, [classId]);

  // 获得讲师、官号信息
  useEffect(() => {
    //
    if (liveInfo?.lecturerId) {
      getLecturerInfo({ id: liveInfo?.lecturerId })
        .then((res: any) => {
          if (res?.code === 210) {
            setLecturerInfo(res?.data);
          }
        })
        .catch((e) => console.log(e));
    }

    //
    if (liveInfo?.officialId) {
      getOfficialDetail({ id: liveInfo?.officialId })
        .then((res: any) => {
          if (res?.code === 210) {
            const { profile, isFollow, name, followCount } = res?.data;

            setOfficialInfo({ profile, isFollow, name, followCount });
          }
        })
        .catch((e) => console.log(e));
    }
  }, [liveInfo?.lecturerId, liveInfo?.officialId]);

  // 进入直播
  const handleEnterLive = () => {
    navigation(`/live-broadcast?id=${classId}&liveId=${liveId}`);
  };

  // 进入官号
  const handleEnterOffice = () => {
    console.log('jjjjjjjjj');
    // 跳转官号地址
  };

  //官号关注
  const handleFocus = (event) => {
    // 阻止事件冒泡
    event.stopPropagation();
    getOfficial({ id: liveInfo?.officialId })
      .then((res: any) => {
        if (res?.code === 210) {
          if (officialInfo?.isFollow) {
            Toast.show({
              content: '取消关注成功。',
              type: 'info',
            });
          } else {
            Toast.show({
              content: '关注成功。',
              type: 'info',
            });
          }

          // 更新关注状态
          setOfficialInfo({ ...officialInfo, isFollow: !officialInfo.isFollow });
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className='pb-20'>
      <Img isNoTheme className='w-full h-54 relative' src={liveInfo.coverUrl} />
      <div className='flex items-center bg-mask5 pl-4 relative bottom-5'>
        <Img isNoTheme className='w-4 h-4 mr-1' src={fire} />
        <div className='text-white text-xs'>{detailData.popularCount}人次</div>
      </div>
      <div className='bg-white p-4 relative bottom-5'>
        <div className='text-primary-text font-bold text-base mb-2'>讲师在{liveInfo?.startTime} 的直播课</div>
        <div className='text-assist text-sm'>{liveInfo?.endTime} 直播结束</div>
      </div>
      <div className='bg-white px-4 py-3'>
        <div className='flex items-center mb-3'>
          <div className='w-1 h-4 rounded-2xl bg-active-text mr-1'></div>
          <div className='text-base text-primary-text mr-3'>讲师介绍</div>
        </div>
        <div className='flex items-center'>
          <Img isNoTheme className='w-12 h-12 mr-3 rounded-half' src={lecturerInfo?.profile} />
          <div className='w-64'>
            <div className='text-primary-text text-sm mb-1'>{lecturerInfo?.nickName}</div>
            <div className='text-assist text-xs'>{lecturerInfo?.lecturerIntro}</div>
          </div>
        </div>
      </div>

      <div className='h-10 px-4 py-2.5'></div>

      <div onClick={handleEnterOffice} className='bg-white px-4 py-3 flex items-center justify-between'>
        <div className='flex items-center'>
          <Img isNoTheme className='w-10 h-10 mr-2 rounded-half' src={officialInfo?.profile} />
          <div className=''>
            <div className='text-primary-text text-sm mb-1'>{officialInfo?.name}</div>
            <div className='text-assist text-xs'>{officialInfo?.followCount}人关注</div>
          </div>
        </div>

        <div
          onClick={(e) => handleFocus(e)}
          className={`w-15 h-6 rounded flex items-center justify-center text-sm ${!officialInfo?.isFollow ? 'bg-active-text text-white' : 'text-active-text border-[1px] border-active-text'}`}
        >
          {officialInfo?.isFollow ? '已关注' : '关注'}
        </div>
      </div>

      <div className='fixed bottom-0 px-4 py-2 shadow-up bg-white w-full flex justify-center items-center'>
        <div onClick={handleEnterLive} className='w-86 h-12 rounded-7.5 flex items-center justify-center text-lg text-white bg-active-text'>
          进入课堂
        </div>
      </div>
    </div>
  );
};

export default memo(LiveDetail);
