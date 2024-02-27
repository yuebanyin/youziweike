import { FloatBoard } from '@/components';
import { getVideoParams } from '@/services';
import { isArray } from '@/utils/tools';
import { RightOutlined, Toast } from 'esy-ui';
import { memo, useEffect, useRef, useState } from 'react';

interface VideoDetailProps {
  videoList?: any[]; //课程列表
  price: number | string; //查看课程
  popularCount?: string; //当前人次
  title?: string;
  coverUrl?: string; //封面
  videoSrc?: string; //
  activeCourseId?: string | number; // 当前视频id
  hasBuy?: boolean; //是否购买
  layOpen: boolean; //遮罩层
  handleLayout: Function;
}
// 视频地址
const VideoDetail = (props: VideoDetailProps) => {
  const { videoList = [], popularCount, activeCourseId, hasBuy, price, layOpen, handleLayout } = props;

  const [videoItem, setVideoItem] = useState<any>();

  const [videoParams, setVideoParams] = useState(null);

  const scrollRef = useRef<any>(null);
  const playerRef = useRef(null);

  // 拿到当前播放的视频
  useEffect(() => {
    if (activeCourseId) {
      videoList.forEach((item: any, i) => {
        if (item.id === Number(activeCourseId)) {
          setVideoItem(item);
          // 当前视频课参数
          getRecordParams(item);
          console.log(item, i);

          // 在 useEffect 中，可以访问 ref.current 获取 DOM 实例
          if (scrollRef.current) {
            // scrollRef.current.setAttribute('scrollLeft', 160 * i);
            // scrollRef.current.setAttribute('style', 'transform: translateX(-' + 160 * i + 'px)');
          }

          return;
        }
      });
    } else if (isArray(videoList)) {
      setVideoItem(videoList[0]);
      // 当前视频课参数
      getRecordParams(videoList[0]);
    }
  }, [activeCourseId, hasBuy]);

  // 录播视频实例
  useEffect(() => {
    if (window.TCPlayer && videoParams) {
      if (!playerRef?.current) {
        var player = window.TCPlayer('try-video', {
          // try-video 为播放器容器ID，必须与html中一致
          fileID: videoParams?.fileId,
          // 请传入需要播放的视频fileID 必须qa
          appID: videoParams?.appId,
          // 请传入点播账号的子应用appID 必须
          psign: videoParams?.psign,
          // 请传入播放器签名psign 必须
          autoplay: true,
          // 是否自动播放 // 其他参数请在开发文档中查看
          licenseUrl: 'https://license.vod2.myqcloud.com/license/v2/1318736557_1/v_cube.license',
        });
        playerRef.current = player;
      } else {
        // update
        playerRef.current.loadVideoByID({
          fileID: videoParams?.fileId,
          // 请传入需要播放的视频fileID 必须
          appID: videoParams?.appId,
          // 请传入点播账号的子应用appID 必须
          psign: videoParams?.psign,
          // 请传入播放器签名psign 必须
          autoplay: true,
          // 是否自动播放 // 其他参数请在开发文档中查看
          licenseUrl: 'https://license.vod2.myqcloud.com/license/v2/1318736557_1/v_cube.license',
        });
      }
    }
  }, [videoParams]);

  //销毁
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current?.dispose();
      }
    };
  }, []);

  // 视频课参数
  const getRecordParams = (item) => {
    getVideoParams({ id: item?.id })
      .then((res: any) => {
        if (res?.code === 210) {
          setVideoParams(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getListStyle = (item) => {
    handleLayout();
    videoList.forEach((idx: any, i) => {
      if (idx.id === item.id) {
        // 在 useEffect 中，可以访问 ref.current 获取 DOM 实例
        scrollRef.current.setAttribute('scroll-left', 160 * i);
        return;
      }
    });
  };
  // 切换课程视频
  const handleChoseVideo = (item, type) => {
    if (hasBuy) {
      // 购买了更新视频
      getRecordParams(item);
      // 购买了
      setVideoItem(item);
      //列表处理
      if (type === 'list') {
        getListStyle(item);
      }
    } else {
      if (item.experience === 1) {
        // 没有购买 不免费
        if (item.audition > 0) {
          setVideoItem(item);
          // 可试听更新视频
          getRecordParams(item);
        } else {
          Toast.show({
            content: '请点击下方按钮， 购买课程。',
            type: 'info',
          });
        }
      } else {
        //没有购买 免费 切换当前播放视频
        setVideoItem(item);
        // 免费更新视频
        getRecordParams(item);
        if (type === 'list') {
          getListStyle(item);
        }
      }
    }
  };

  return (
    <>
      <div className='mb-3'>
        <div className='w-full h-52 relative'>
          <video className='w-full h-52' preload='auto' playsInline id={`try-video`} poster={videoItem?.coverUrl} controls={true} loop={false} muted={false} />
        </div>

        <div className='px-4 py-2 bg-white border-b-[1px] border-split'>
          <div className='text-sm text-primary-text font-bold mb-2'>{videoItem?.title}</div>
          <div className='text-xs text-assist'>{popularCount}人次</div>
        </div>
        <div className='bg-white'>
          <div className='flex justify-between items-center px-4 pt-2'>
            <div className='flex items-center'>
              <div className='w-1 h-4 rounded-2xl bg-active-text mr-1'></div>
              <div className='text-base text-primary-text font-bold mr-3'>听课列表</div>
            </div>
            <div className='text-assist text-xs flex items-center justify-center' onClick={() => handleLayout()}>
              查看全部课程
              <RightOutlined className='text-guide mx-1' />
            </div>
          </div>

          <div className='h-30 p-4 flex overflow-x-auto'>
            <div className='flex overflow-x-auto' ref={scrollRef}>
              {videoList &&
                videoList.map((item) => {
                  return (
                    <div
                      key={`视频${item.id}`}
                      className={`w-40 h-20 p-2 rounded-lg mr-2 flex items-center relative ${item.id === videoItem?.id ? 'bg-active-bg text-active-text' : 'bg-default text-primary-text'}`}
                      onClick={() => {
                        handleChoseVideo(item, 'card');
                      }}
                    >
                      <div className='w-36 text-sm oe-two'>{item.title}</div>
                      {item.experience === 2 && <div className='px-1 w-12 h-4 bg-green1 text-white text-mini rounded-sm absolute top-0 right-0'>免费试听</div>}
                      {item.experience === 1 && item.audition > 0 && (
                        <div className='px-1 h-4 flex items-center justify-center bg-green1 text-white text-mini rounded-sm absolute top-0 right-0'>免费试听{item.audition / 60}分</div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* 底部弹窗 */}
      <FloatBoard open={layOpen}>
        <div className='flex items-center'>
          <div className='w-1 h-4 rounded-2xl bg-active-text mr-1'></div>
          <div className='text-base text-primary-text font-bold mr-3'>听课列表</div>
          <div className='text-assist text-xs'>(共{videoList?.length}节课)</div>
        </div>
        <div className='max-h-100 overflow-y-auto overflow-x-hidden'>
          {videoList &&
            videoList.map((item) => {
              return (
                <div
                  key={`课表${item.id}`}
                  className={`flex py-3 border-b-[1px] border-split ${item.id === videoItem?.id ? 'text-active-text' : 'text-assist'}`}
                  onClick={() => handleChoseVideo(item, 'list')}
                >
                  <div className='text-mini px-1 mr-1 h-4.5 border-[1px] border-split rounded flex items-center justify-center'>{item.type === 2 ? '音频' : '视频'}</div>
                  <div className='w-62 oe text-xs'>{item.title}</div>
                  {item.experience === 2 && <div className='w-12 h-4 flex items-center justify-center bg-green1 rounded text-white text-mini'>免费试听</div>}
                </div>
              );
            })}
        </div>

        <div className='w-86 h-12 bg-active-text text-white my-2 rounded-7.5 flex justify-center items-center' onClick={() => handleLayout()}>
          <span className='text-lg mr-2'>关闭</span>
          <span className='text-xs line-through'> ￥{price}</span>
        </div>
      </FloatBoard>
    </>
  );
};

export default memo(VideoDetail);
