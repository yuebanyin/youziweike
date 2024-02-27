import { memo, useEffect, useState } from 'react';
import dain from '@/assets/images/common/dian-select.png';
import avatar from '@/assets/images/common/mine/avatar.png';
import { getVideoSquare } from '@/services';
import { BgImg, Img } from '@/components';
// import { RightOutlined } from 'esy-ui';
import { useNavigation } from '@/hooks';

// 这是视频广场页面
const videoSquare = 'https://yz-files.szdy1688.cn/StaticFiles/icon/20240110185750453.png';
const videoModule = 'https://yz-files.szdy1688.cn/StaticFiles/icon/20240110182616566.png';
const VideoSquare = () => {
  const [videoData, setVideoData] = useState<any>([]); // 页面信息
  const navigation = useNavigation();

  const getDataList = () => {
    getVideoSquare()
      .then((res: any) => {
        console.log(res);
        if (res.code === 210) {
          // setVideoData((pre) => ({ ...pre, list: [...pre.list, ...res.data], dataTotal: res?.count }));
          setVideoData(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDataList();
  }, []);
  return (
    <div className='bg-red3'>
      <Img isNoTheme src={videoSquare} className='w-full h-62' />
      <div className='px-4 relative bottom-20'>
        {videoData.length > 0 &&
          videoData.map((item, i) => {
            return (
              <BgImg isNoTheme url={videoModule} key={`${item.contentId}视频${i}`} classNames={{ box: 'bg-no-repeat bg-contain w-86 p-2', img: 'w-86' }}>
                <div className='text-primary-text font-bold text-base'>{item?.title}</div>
                <div className='text-assist text-xs py-2 oe'>{item?.describe}</div>
                <div className='w-82 h-46 relative'>
                  <video
                    className='w-82 h-46 rounded'
                    id={`video`}
                    src={item?.videoUrl}
                    poster={item?.showImage}
                    // poster="https://img.lycheer.net/banner/index/7b40bf4ed605dcd66e43c7a2cd1756b4.jpg?imagediv2/2/w/800/q/85!"
                    controls={true}
                    loop={false}
                    muted={false}
                  />
                </div>
                <div className='flex mt-2'>
                  <Img isNoTheme src={item?.avatar || avatar} className='w-5 h-5 mr-2' />
                  <div className='w-75 bg-input-bg rounded flex px-2 py-1'>
                    <div className='w-60 text-assist oe-two text-xs'>{item?.voice || '大家好，我是王琼，也是APEC世界女性领袖峰会、环球夫人大赛的嘉宾导师，教你做灵动女神'}</div>
                    <div className='ml-1 flex flex-col items-center justify-between'>
                      <Img isNoTheme src={item?.dian || dain} className='w-3 h-3' />
                      <div className='text-mini text-assist'>{item?.people || 999} 人</div>
                    </div>
                  </div>
                </div>

                <div
                  className='bg-grad-deepRed w-76 h-10 flex justify-center items-center text-lg text-white my-4 mx-auto rounded-7.5'
                  onClick={() => {
                    // Taro.navigateTo({
                    //   url: `/packDetail/lessonDetail/index?classId=${item.contentId}`,
                    // });
                    navigation(`/detail?id=${item?.contentId}`);
                  }}
                >
                  继续学习
                </div>
              </BgImg>
            );
          })}
        {/* <div className='w-52 h-10 flex items-center justify-center border-[1px] mx-auto text-white rounded-7.5 border-white bg-red3'>
          <span className='text-sm'>更多精品课程秒杀</span>
          <RightOutlined className='text-guide mr-0.5' />
        </div> */}
      </div>
    </div>
  );
};

export default memo(VideoSquare);
