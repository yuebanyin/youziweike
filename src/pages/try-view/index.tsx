import { useState, memo, useEffect, useCallback } from 'react';
import { getConDetail } from '@/services';
import { Tabs } from 'esy-ui';
import { useSearchParams } from 'react-router-dom';
import VideoDetail from './video-detail';
import { LessonList } from '../lesson-detail/lesson-list';
import { LearnerVoice } from '../lesson-detail/learner-voice';
import { getHtmlCon } from '@/utils';
import { CommonPay } from '@/components';
const TabItem = Tabs.Item;

const TryView = () => {
  const [serachParams] = useSearchParams();

  const id = serachParams.get('id') || serachParams.get('a');
  const courseId = serachParams.get('courseId');
  const [current, setCurrent] = useState(0); // 设置当前tab
  const [tabList, setTabList] = useState<any>([]); // tab
  const [layOpen, setLayOpen] = useState(false); // 遮罩层

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
    hasCurrentContent: null,
  }); // 页面信息

  const getTabList = (introduce, courses, hasComment) => {
    let list: any[] = [];
    if (introduce) {
      list.push({ title: '课程介绍' });
    }
    // 试听课程不需要
    console.log(courses);
    // if (courses) {
    //   console.log('courses', courses);
    //   list.push({ title: '听课列表' });
    // }
    if (hasComment) {
      list.push({ title: '学员心得' });
    }
    setTabList(list);
  };

  const getDetail = useCallback(() => {
    getConDetail({ id })
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
            hasCoupon,
            hasDiscount,
            discountInfo,
            id,
            hasCurrentContent,
          } = res?.data;

          if (introduce) {
            getHtmlCon(introduce, 'htmlContentTry');
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
          });
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getDetail();
  }, [id]);

  const handleClick = (value) => {
    console.log('seeeee VALUE', value);
    if (value !== current) {
      setCurrent(value);
    }
  };

  // 按比例自适应展示返回的富文本

  // 处理遮罩层
  const handleLayout = () => {
    console.log('点击全部课程生效');
    setLayOpen(!layOpen);
  };

  return (
    <div className={`pb-4 ${layOpen ? 'overflow-hidden h-full' : ''}`}>
      {/* 音频 */}
      {/* <AudioDetail
        mp3={mp3}
        handleLayout={handleLayout}
        popularCount={detailData.popularCount}
        title={detailData.title}
      /> */}
      {/* 视频 */}
      <VideoDetail
        price={detailData.lecturePrice}
        coverUrl={detailData.coverUrl}
        videoList={detailData.courses}
        popularCount={detailData.popularCount}
        title={detailData.title}
        activeCourseId={courseId}
        hasBuy={detailData.hasCurrentContent}
        layOpen={layOpen}
        handleLayout={handleLayout}
      />

      {/* tab 内容 */}
      <div>
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
          {tabList.map((item, i) => {
            return (
              <TabItem paneKey={`${i}`} title={item?.title} key={`tab${i}`}>
                {item.title === '课程介绍' && <div id='htmlContentTry' className='w-full p-4'></div>}

                {item.title === '听课列表' && <LessonList dataList={detailData.courses} id={id} />}
                {item.title === '学员心得' && (
                  <>
                    <div className='flex mb-2'>
                      <div className='w-1 h-4 rounded-2xl bg-active-text mr-1'></div>
                      <div className='text-base text-primary-text'>精选学员心得（6）</div>
                    </div>
                    <LearnerVoice />
                  </>
                )}
              </TabItem>
            );
          })}
        </Tabs>
      </div>

      {/* 底部固定按钮部分 */}
      {!detailData.hasCurrentContent && (
        <div className='fixed bottom-0 px-4 py-2 shadow-up bg-white w-full'>
          <CommonPay
            className={'px-4 py-0.5 h-12 flex flex-col items-center justify-center rounded-full bg-active-text text-white text-lg cursor-pointer text-center'}
            type={2}
            id={Number(id)}
            disPrice={detailData?.discountInfo?.discountPrice}
            price={detailData?.lecturePrice}
            isFree={detailData?.isFree}
            hasCurrentContent={detailData?.hasCurrentContent}
            refreshList={getDetail}
          />
        </div>
      )}
    </div>
  );
};

export default memo(TryView);
