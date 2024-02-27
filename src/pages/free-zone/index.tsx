import { memo, useCallback, useEffect, useState } from 'react';
// import topBg from '../../assets/home/newRed.png';
import fire from '@/assets/images/common/mine/fire.png';

import { getFreeList } from '@/services';
import { BgImg, Img, Infiniteloading } from '@/components';
import { useNavigation } from '@/hooks';

const topBg = 'https://yz-files.szdy1688.cn/StaticFiles/icon/20240110181948516.png';

function FreeZone() {
  // const { dataList = mainData } = props;
  // const [detailData, setDetailData] = useState<any>([]); // 页面信息
  const [data, setData] = useState<any>({ list: [], dataTotal: null }); //免费专区列表
  const navigation = useNavigation();

  const [pageSize, setPageSize] = useState(1);

  const getDataList = useCallback((size) => {
    setPageSize(size);
    getFreeList({
      pageIndex: size,
      pageSize: 10,
    })
      .then((res: any) => {
        if (res.code === 210) {
          setData((pre) => ({ ...pre, list: [...pre.list, ...res.data], dataTotal: res?.count }));
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    getDataList(1);
  }, [getDataList]);

  return (
    <div className='h-full bg-white'>
      <BgImg isNoTheme url={topBg} classNames={{ box: 'bg-no-repeat bg-contain w-full relative h-44 shadow-tile', img: 'w-full' }}>
        {/* <div className='bg-act-grad2 text-active-text w-40 flex items-center justify-center rounded-2xl absolute bottom-2 left-0 right-0 m-auto text-base font-bold btn-zoom'>立即领取</div> */}
      </BgImg>
      <Infiniteloading hasMore={data.dataTotal > (data.list || []).length} loadMore={() => getDataList(pageSize + 1)} containerId='free-zone-refreshScroll'>
        {data &&
          data.list.map((it) => (
            <div
              key={it.id}
              className='flex py-2 mx-4 border-b-[1px] border-split'
              onClick={() => {
                // Taro.navigateTo({
                //   url: `/packDetail/lessonDetail/index?classId=${it.id}`,
                // });
                navigation(`/detail?id=${it?.id}`);
              }}
            >
              <div className='bg-default mr-4 rounded'>
                <Img isNoTheme src={it.coverUrl} className='w-28 h-16' />
                <div className='h-6 bg-default flex items-center justify-center'>
                  <Img isNoTheme src={fire} className='w-4 h-4 mr-2' />
                  <span className='text-assist text-xs'>{it.popularCount} 人</span>
                </div>
              </div>
              <div className='relative'>
                <div className='text-sm text-primary-text oe-two w-54'>{it.description}</div>
                <div className='w-22 h-8 rounded-5 flex justify-center items-center bg-grad-red text-sm text-white absolute bottom-0 right-0'>{it?.btnText || '立即学习'}</div>
              </div>
            </div>
          ))}
      </Infiniteloading>
    </div>
  );
}

export default memo(FreeZone);
