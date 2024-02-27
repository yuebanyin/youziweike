import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs } from 'esy-ui';
// import fire from '@/assets/images/common/detail/fire.png';
import preIcon from '@/assets/images/common/detail/preIcon.png';
import MemberBlock from './member';
import { LessonList } from './lesson-list';
import { LearnerVoice } from './learner-voice';
import DisCountInfo from './discount-info';
import { getConDetail } from '@/services';
import { CommonPay, Img } from '@/components';
import { getHtmlCon } from '@/utils/tools';
import dayjs from 'dayjs';
// import { useNavigation } from '@/hooks';

const TabItem = Tabs.Item;

interface LessonDetailProps {
  isMember?: boolean;
  isCountdown?: boolean;
  isDiscount?: boolean;
}

function LessonDetail(props: LessonDetailProps) {
  const { isMember = false } = props;

  const [serachParams] = useSearchParams();
  const classId = serachParams.get('id') || serachParams.get('a');
  // const liveId = serachParams.get('liveId');

  const [detailData, setDetailData] = useState<any>({
    id: null,
    coverUrl: '',
    title: '',
    description: '',
    lecturePrice: '',
    lectureCount: '',
    currUpdate: '',
    popularCount: '',
    isFree: false,
    courses: [],
    introduce: '',
    hasComment: false,
    comments: {},
    hasCoupon: false,
    hasDiscount: false,
    discountInfo: {},
    hasCurrentContent: false,
    isLive: '',
    lives: [],
    contentType: null,
  }); // 页面信息

  const [current, setCurrent] = useState(0); // 设置当前tab
  const [tabList, setTabList] = useState<any>([]);
  const [isCollect, setCollect] = useState(false);
  const [hasTryView, setHasTryView] = useState(false);

  console.log(isCollect);

  const getTabList = (introduce, courses, hasComment) => {
    const list: any[] = [];
    if (introduce) {
      list.push({ title: '课程介绍' });
    }
    if (courses || detailData?.lives) {
      console.log('courses', courses);

      list.push({ title: '听课列表' });
    }
    if (hasComment) {
      list.push({ title: '学员心得' });
    }
    setTabList(list);
  };

  // 内容详情
  const getDetail = useCallback(
    (contentId?) => {
      if (contentId || classId) {
        getConDetail({ id: classId })
          .then((res: any) => {
            if (res?.code === 210) {
              const {
                coverUrl,
                title,
                description,
                isFree,
                lecturePrice,
                lectureCount,
                currUpdate,
                popularCount,
                courses, //
                introduce,
                hasComment,
                comments,
                isCollect, //
                hasCoupon,
                hasDiscount,
                discountInfo,
                id,
                hasCurrentContent,
                isLive,
                lives,
                contentType,
              } = res.data;

              if (introduce) {
                getHtmlCon(introduce, 'htmlContent');
              }
              getTabList(introduce, courses, hasComment);

              setDetailData({
                coverUrl,
                title,
                description,
                lecturePrice,
                lectureCount,
                currUpdate,
                popularCount,
                isFree,
                hasComment,
                comments,
                introduce,
                hasCoupon,
                hasDiscount,
                discountInfo,
                courses,
                id,
                hasCurrentContent,
                isLive,
                lives,
                contentType,
              });

              setCollect(isCollect); // 是否收藏
            }
          })
          .catch((error) => console.log(error));
      }
    },
    [classId]
  );

  useEffect(() => {
    getDetail();
  }, [getDetail, classId]);

  // 获得
  const rightNowLiveId = useMemo(() => {
    const info = detailData?.lives?.find((it) => {
      // 刚好是某个时间点
      if (dayjs().isSame(it.startTime) || dayjs().isSame(it.endTime)) {
        return true;
      }
      // 在范围内
      if (dayjs().isAfter(it.startTime) && dayjs().isBefore(it.endTime)) {
        return true;
      }
      if (dayjs().isBefore(it.startTime)) {
        return true;
      }
      if (dayjs().isAfter(it.endTime)) {
        return true;
      }
      return false;
    });
    return info?.id;
  }, [detailData?.lives]);

  //
  const rightNowCourseId = useMemo(() => {
    if (detailData.courses?.length > 0) {
      const actItem = detailData?.courses.find((item) => {
        item?.audition > 0;
        setHasTryView(true);
        return;
      });
      return actItem?.id;
    }
  }, [detailData.courses, classId]);

  const handleClick = (value) => {
    console.log('seeeee VALUE', value);
    if (value !== current) {
      setCurrent(value);
    }
  };

  return (
    <div>
      <Img isNoTheme className='w-full h-54 relative' src={detailData.coverUrl} />
      {/* <div className='flex items-center bg-mask5 pl-4 relative bottom-5'>
        <Img isNoTheme className='w-4 h-4 mr-1' src={fire} />
        <div className='text-white text-xs'>{detailData.popularCount}人次</div>
      </div> */}
      <div className='bg-white pb-4 relative bottom-5'>
        {detailData.hasDiscount && !detailData.hasCurrentContent && <DisCountInfo lecturePrice={detailData.lecturePrice} discountInfo={detailData.discountInfo} />}

        <div className='px-4 pt-2 mt-2'>
          <div className='mb-2 flex relative'>
            <Img isNoTheme className='w-4 h-4 mr-1 absolute top-0.5' src={preIcon} />
            <p className='indent-6 text-sm text-primary-text font-bold'>{detailData.title}</p>
          </div>
          <div className='text-assist text-xs mb-3'>{detailData.description}</div>
          {detailData?.isLive ? (
            ''
          ) : (
            <div className='text-xs text-assist'>
              已更新{detailData.currUpdate}节 / 共{detailData.lectureCount}节
            </div>
          )}

          {isMember && <MemberBlock />}
        </div>
      </div>

      <div className='pb-20'>
        <Tabs
          tabs={null}
          onClick={(value) => handleClick(value)}
          classNames={{
            contentitem: 'w-full inline-block align-top',
            'title:active': 'text-active-text',
            'title:nodisabled': 'cursor-pointer text-assist',
            title: 'text-center transition-all duration-250 z-1 relative overflow-hidden text-nowrap break-keep whitespace-nowrap flex-1-0-auto bg-white border-b-[1px] border-split',
            indicator: 'absolute bg-active-text rounded-3xl transition-left-top duration-250 z-1 h-1',
            content: 'bg-white',
          }}
          indicatorRatio={0.2}
        >
          {tabList.map((item, i) => (
            <TabItem paneKey={`${i}`} title={item?.title} key={`tab${i}`}>
              {item.title === '课程介绍' && <div id='htmlContent' className='w-full p-4' />}
              {item.title === '听课列表' && (
                <LessonList hasCurrentContent={detailData.hasCurrentContent} dataList={detailData.isLive ? detailData.lives : detailData.courses} isLive={detailData?.isLive} id={classId} />
              )}
              {item.title === '学员心得' && (
                <>
                  <div className='flex items-center mb-2'>
                    <div className='w-1 h-4 rounded-2xl bg-active-text mr-1' />
                    <div className='text-base text-primary-text'>精选学员心得（6）</div>
                  </div>
                  <LearnerVoice />
                </>
              )}
            </TabItem>
          ))}
        </Tabs>
      </div>

      {/* 购买统一按钮 */}
      <div className='fixed bottom-0 px-4 py-2 w-full'>
        {
          <CommonPay
            className={hasTryView ? '' : 'px-4 py-0.5 h-12 rounded-full bg-active-text text-white text-lg cursor-pointer flex items-center justify-center'}
            type={detailData?.lives?.length > 0 ? 2 : !hasTryView ? 2 : 3}
            id={Number(classId)}
            disPrice={detailData?.discountInfo?.discountPrice}
            price={detailData?.lecturePrice}
            isFree={detailData?.isFree}
            hasCurrentContent={detailData?.hasCurrentContent}
            contentType={detailData?.contentType}
            liveId={detailData?.lives && detailData?.lives?.length > 0 ? rightNowLiveId : null}
            refreshList={getDetail}
            url={`/try-view?id=${classId}&courseId=${rightNowCourseId}`}
          />
        }
      </div>
    </div>
  );
}

export default memo(LessonDetail);
