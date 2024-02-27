import { memo, useEffect, useState } from 'react';
import { BgImg, Img } from '@/components';

import fire from '@/assets/images/common/fireWhite.png';
import dianBg from '@/assets/images/common/dianBg.png';
import rightBg from '@/assets/images/common/rightBg.png';
import StuBank from './student';
import TeaBank from './teacher';
import { getGoodCourseList, getGoodCourseClassItem } from '@/services';
import { isArray } from '@/utils';

const hkTop = 'https://yz-files.szdy1688.cn/StaticFiles/icon/20240110181825439.png';
// 榜单标题
const bankTitle = [
  {
    id: 1,
    title: '学员好评榜',
  },
  {
    id: 2,
    title: '人气讲师榜',
  },
];

function CourseBank() {
  const [courseData, setCourseData] = useState({
    stu: [],
    tea: [],
    courseClass: [],
  });
  const [bankList, setBankList] = useState<any[]>([]);

  const [bankId, setBankId] = useState(1); // 榜单切
  const [recoId, setRecoId] = useState(1); // 好课推荐模块

  const [claList, setClaList] = useState([]); // 精品推荐课程

  //推荐榜单
  useEffect(() => {
    getGoodCourseList({
      pageIndex: 1,
      pageSize: 10,
    })
      .then((res: any) => {
        if (res.code === 210) {
          const { courseList, courseClass } = res.data;
          isArray(courseList) &&
            courseList.forEach((item) => {
              if (item.type === 1) {
                setCourseData((pre) => ({
                  ...pre,
                  stu: item?.items || [],
                  courseClass,
                }));

                setBankList(item.items);
              } else if (item.type === 2) {
                setCourseData((pre) => ({
                  ...pre,
                  tea: item?.items || [],
                  courseClass,
                }));
              }
            });
        }
      })
      .catch(() => {});
  }, []);

  //好课推荐
  useEffect(() => {
    getGoodCourseClassItem({
      pageIndex: 1,
      pageSize: 10,
      classId: recoId,
    })
      .then((res: any) => {
        if (res.code === 210) {
          setClaList(res.data);
        }
      })
      .catch(() => {});
  }, [recoId]);

  useEffect(() => {
    if (bankId === 1) {
      setBankList(courseData.stu);
    } else if (bankId === 2) {
      setBankList(courseData.tea);
    }
  }, [bankId, courseData.stu, courseData.tea]);

  // 榜单切换
  const handleClickBank = (item) => {
    if (item?.id !== bankId) {
      setBankId(item.id);
    }
  };

  // 好课推荐 模块切换
  const handleClassTitle = (item) => {
    if (item?.id !== recoId) {
      setRecoId(item.id);
    }
  };

  return (
    <div>
      <BgImg isNoTheme url={hkTop} className='w-full h-164' classNames={{ box: 'bg-no-repeat bg-contain w-full h-164 ', img: 'w-full' }}>
        <div className='mx-4 relative top-48 rounded-5'>
          <div className='h-8 text-sm flex justify-between bg-grad-orange rounded-t-2xl'>
            {bankTitle &&
              bankTitle.map((item) => (
                <div
                  key={`榜单${item.id}`}
                  className={`w-6/12 flex justify-center items-center df-aic-jcc rounded-t-2xl ${item.id === bankId ? 'text-pri-red bg-white' : 'text-white'}`}
                  onClick={() => handleClickBank(item)}
                >
                  {item.title}
                </div>
              ))}
          </div>
          <div className='bg-white h-82 overflow-y-auto rounded-b-2xl'>
            {bankId === 1 ? <StuBank dataList={bankList} fireSrc={fire} dianSrc={dianBg} /> : <TeaBank dataList={bankList} fireSrc={fire} />}
            {/* <TeaBank dataList={teaList} fireSrc={fire} /> */}
          </div>
        </div>
      </BgImg>
      <div>
        <div className='flex justify-between py-1 px-4 '>
          {courseData.courseClass.length > 0 &&
            courseData.courseClass.map((titem: any) => (
              <div key={titem.id} className={`text-center pr-4 ${titem.id !== courseData.courseClass.length ? 'border-r-[1px] border-split' : ''}`} onClick={() => handleClassTitle(titem)}>
                <div className={`text-sm ${titem.id === recoId ? 'text-pri-red' : 'text-assist'}`}>{titem.title}</div>
                <div className={`text-mini px-2.5 rounded-5 h-4 flex items-center justify-center ${titem.id === recoId ? 'bg-grad-red2 text-white' : 'text-placeholder'}`}>{titem.emphasize}</div>
              </div>
            ))}
        </div>

        <div className='p-3 flex justify-between flex-warp bg-red4'>
          {claList.length > 0 &&
            claList.map((item: any) => (
              <div
                key={`推荐${item.id}`}
                className='mb-3 rounded-lg'
                onClick={() => {
                  // Taro.navigateTo({
                  //   url: `/packDetail/lessonDetail/index?classId=${item.contentId}`,
                  // });
                }}
              >
                <Img isNoTheme src={item?.showImage} className='w-42 h-25' />
                <div className='bg-white p-2 rounded-b-lg'>
                  <div className='text-sm text-primary-text oe-two w-38 mb-2'>{item.describe}</div>
                  <span className='text-active-text bg-active-bg text-mini px-1 h-4'>{item.couponPrice} 元优惠券</span>
                  <div className='flex justify-between'>
                    <div>
                      <span className='text-base text-price mr-2'>￥{item.sprice}</span>

                      <span className='text-xs text-assist line-through'>￥${item.oprice}</span>
                    </div>
                    <div>
                      <Img isNoTheme className='w-6 h-6' src={rightBg} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default memo(CourseBank);
