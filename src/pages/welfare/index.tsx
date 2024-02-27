import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import { CommonPay, Img } from '@/components';
import { getBonus, getContentDetail } from '@/services';
import { isArray } from '@/utils';
import { useGlobalStore } from '@/mobx';

// 这是我的福利页面
function WelFare() {
  const [detailData, setDetailData] = useState<any>(null); // 页面信息

  const [serachParams] = useSearchParams();
  const id = serachParams.get('id');
  const { changeState } = useGlobalStore();

  // 获取直播id
  const liveId = useMemo(() => {
    if (isArray(detailData?.lives)) {
      // 如果只有一个直接返回该项id
      if (detailData?.lives.length === 1) {
        return detailData?.lives[0].id;
      }
      const info = detailData?.lives.find((it) => {
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
    }
    return null;
  }, [detailData]);

  const getDetail = useCallback(
    (id?: string) => {
      if (id || detailData?.contentId) {
        changeState('isLoading', true);
        getContentDetail({ id: id || detailData?.contentId })
          .then((result: any) => {
            setDetailData((pre) => ({
              ...pre,
              ...result?.data,
            }));
          })
          .catch(() => {})
          .finally(() => {
            changeState('isLoading', false);
          });
      }
    },
    [changeState, detailData?.contentId]
  );

  useEffect(() => {
    if (id) {
      getBonus({
        id,
      })
        .then((res: any) => {
          setDetailData(res.data);
          getDetail(res?.data?.contentId);
        })
        .catch(() => {});
    }
  }, [getDetail, id]);

  return (
    <>
      <div className='w-full overflow-y-hidden'>
        <Img isNoTheme src={detailData?.titleImage} />
        {detailData?.imgs && detailData?.imgs.map((item, i) => <Img isNoTheme key={0 || i} src={item} />)}
      </div>
      <div className={`fixed bottom-0 w-full ${detailData ? '' : 'hidden'}`}>
        <CommonPay
          className='h-16 flex items-center justify-center bg-gold cursor-pointer text-red2 text-2xl font-bold'
          isFree={detailData?.isFree}
          id={detailData?.id}
          type={2}
          disPrice={detailData?.discountInfo?.discountPrice}
          price={detailData?.lecturePrice}
          hasCurrentContent={detailData?.hasCurrentContent}
          contentType={detailData?.contentType}
          liveId={liveId}
          refreshList={getDetail}
        >
          {!detailData?.hasCurrentContent ? <div>特惠￥ {detailData?.discountInfo?.discountPrice || detailData?.lecturePrice}元</div> : <div>立即观看</div>}
        </CommonPay>
      </div>
    </>
  );
}

export default WelFare;
