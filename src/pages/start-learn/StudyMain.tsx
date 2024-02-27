import { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { isArray } from 'esy-ui';
import headerBgPng from '@/assets/images/common/start-learn/header-bg.png';
import bannerPng from '@/assets/images/common/start-learn/banner.png';

import TextImg from './componens/TextImg';
import ImgText from './componens/ImgText';
// import { SwiperBanner } from '@/components';
import { getCourseOrderList, getMoreList, getCourseAll, getCourseLately } from '@/services';
import { Img, Swiper } from '@/components';
import { useHomeStore, useUserInfoStore } from '@/mobx';
import { useNavigation } from '@/hooks';

const btnList = [
  {
    title: '最近学习',
    id: 1,
    valueKey: '1',
  },
  {
    title: '全部课程',
    id: 2,
    valueKey: '1',
  },
  {
    title: '已购课程',
    id: 3,
    valueKey: '1',
  },
];

function StudyMain() {
  const { hasMore, firstIndex } = useHomeStore();
  const { userInfo } = useUserInfoStore();
  const [btnKey, setBtnKey] = useState(1);
  const [{ data, total, page }, setData] = useState<{
    data: any[];
    total: number;
    page: number;
  }>({
    data: [],
    total: 0,
    page: 1,
  });
  const [{ list, count, idx }, setList] = useState<{
    list: any[];
    count: number;
    idx: number;
  }>({
    list: [],
    count: 0,
    idx: 1,
  });
  const navigation = useNavigation();

  console.warn({ total, page });

  const getlesson = useCallback((type: number, idx: number, s: number) => {
    let api = getCourseLately;
    if (type === 2) {
      api = getCourseAll;
    } else if (type === 3) {
      api = getCourseOrderList;
    }
    api({
      pageIndex: idx,
      pageSize: s,
    }).then((res: any) => {
      if (Array.isArray(res?.data)) {
        setList((pred: any) => ({
          list: idx === 1 ? res?.data : [...pred.list, ...res.data],
          count: res?.count,
          idx,
          size: s,
        }));
      }
    });
  }, []);

  const getCNXH = useCallback(
    (index: number) => {
      if (!hasMore || !firstIndex) return;
      getMoreList({
        pageIndex: index,
        pageSize: 10,
        categoryId: firstIndex,
      })
        .then((res: any) => {
          if (Array.isArray(res?.data)) {
            setData((pred: any) => ({
              data: [...pred.data, ...res.data],
              total: res?.count,
              page: index,
            }));
          }
        })
        .catch(() => {});
    },
    [firstIndex, hasMore]
  );

  useEffect(() => {
    getCNXH(1);
    getlesson(1, 1, 3);
  }, [getCNXH, getlesson]);

  // const nextPage = () => {
  //   if (total > data.length) {
  //     getCNXH(page + 1);
  //   }
  //   console.info('下一页');
  // };

  const onSearcnLession = (info) => {
    if (info.id !== btnKey) {
      setBtnKey(info.id);
      getlesson(info.id, 1, 3);
    }
  };

  const onMore = () => {
    if (count > list.length) {
      getlesson(btnKey, idx + 1, 3);
    }
  };

  const onClickItem = (info) => {
    // [1,2] 听课页面 3 直播页
    // if ([1, 2].includes(info.contentType)) {
    //   // Taro.navigateTo({
    //   //   url: `/packDetail/tryview/index?id=${info.contentId}`,
    //   // });
    // } else if (info.contentType === 3) {
    //   console.warn({ info });
    //   navigation(`live-broadcast?id=${info.contentId}`);
    // }
    navigation(`/detail?id=${info.contentId}&type=${info.contentType}`);
  };

  return (
    <div className='bg-white w-full h-full overflow-y-auto'>
      {/* <ScrollView scrollY onScrollToLower={nextPage} className='h-full w-full o-y'> */}
      <div className='relative bg-white'>
        <Img src={headerBgPng} className='w-full h-20' isNoTheme />
        <div className='absolute left-0 top-0 right-0 flex items-center justify-between'>
          <div className='flex m-4'>
            <Img src={userInfo?.profile} className='w-12 h-12 mr-4 bg-gray rounded-full' isNoTheme />
            <div className='flex items-center justify-between'>
              <span className='text-white text-sm'>{userInfo?.nickName}</span>
              {/* <Image src={leverPng} className="w-52 h-20" /> */}
            </div>
          </div>
          {/* <View className="d-f ai-c br-30 bg-btn-1 h-32 mr-16 px-10 p-r">
            <Image src={calendPng} className="h-32 w-32" />
            <Text className="color-white wds-text2">学习日历</Text>
            <Text className="p-a wds-text1 color-white bg-red py-2 px-4 right-0 top--6 br-t-l-16 br-t-r-16 br-b-r-16">
              领福利
            </Text>
          </View> */}
        </div>
        {/* <View className="br-8 mx-16 py-8 bg-white d-f ai-c jc-sb bs-tile-gray p-a left-0 right-0 top-80">
          {list.map((it) => (
            <View key={it.id} className="ta-c flex-1">
              <Text className="wds-text3 color-assist">{it.title}</Text>
              <View className="mt-8">
                <Text className="wds-text6 color-m-black mx-2">
                  {it.valueKey}
                </Text>
                <Text className="wds-text3 color-m-black">{it.unit}</Text>
              </View>
            </View>
          ))}
        </View> */}
      </div>
      <div className='mx-4 flex items-center justify-between py-2 bg-white rounded-full overflow-hidden'>
        {btnList.map((it) => (
          <div
            className={`text-sm h-8 w-52 cursor-pointer flex items-center justify-center ${it.id === btnKey ? 'text-white bg-error' : 'text-assist bg-default'}`}
            key={it.id}
            onClick={() => onSearcnLession(it)}
          >
            {it.title}
          </div>
        ))}
      </div>
      <div className='bg-default p-4'>
        <TextImg data={list} isDelete={false} type={btnKey} onClickItem={onClickItem} />
        {count > list.length && (
          <div className=' text-center mt-2' onClick={onMore}>
            <span className='text-xs text-assist mr-2'>查看更多</span>
            {/* <AtIcon value='chevron-down' color='#888' /> */}
          </div>
        )}
        <Swiper list={[{ url: bannerPng, id: 1 }]} imgClassName='h-28 w-full' className='mt-2.5' />
      </div>
      {isArray(data) && data.length > 0 && (
        <div className='p-4'>
          <div className='text-base font-bold mb-3'>猜你喜欢</div>
          <ImgText
            data={data}
            onClickItem={(info) => {
              navigation(`/detail?id=${info?.id}`);
            }}
          />
        </div>
      )}
      {/* </ScrollView> */}
    </div>
  );
}

export default observer(StudyMain);
