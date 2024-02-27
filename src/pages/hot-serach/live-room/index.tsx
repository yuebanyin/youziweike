/** 直播间 */

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ImgArticle from './ImgArticle';
import { getLiveRoom } from '@/services';
import { useNavigation } from '@/hooks';

function LiveRoom() {
  const [{ data, total, page }, setData] = useState({
    data: [],
    total: 0,
    page: 1,
  });
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const keyWord = searchParams.get('word') || '';

  console.warn(page, data);

  const getData = useCallback(
    (pageIndex) => {
      if (total <= data.length && pageIndex !== 1) return;
      getLiveRoom({ pageSize: 100, pageIndex, keyWord }).then((res: any) => {
        if (Array.isArray(res?.data)) {
          setData((pred) => {
            if (Array.isArray(pred.data)) {
              return {
                data: res?.data,
                total: res?.count,
                page: pageIndex,
              };
            }
            return {
              data: res?.data,
              total: res?.count,
              page: pageIndex,
            };
          });
        }
      });
    },
    [data.length, total, keyWord]
  );

  useEffect(() => {
    getData(1);
  }, [getData]);

  return (
    <div className='h-full flex flex-col overflow-hidden px-4'>
      <div
        className='flex-1 rounded-2xl shadow-card bg-white my-4'
        //  onScrollToLower={() => getData(page + 1)}
      >
        <ImgArticle
          data={data}
          onClick={(it) => {
            navigation(`/hot-serach/detail/live-official?id=${it.id}&word=${keyWord}`);
          }}
        />
      </div>
    </div>
  );
}

export default LiveRoom;
