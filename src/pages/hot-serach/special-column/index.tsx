/** 专栏 */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getChannel } from '@/services';
import ImgTextList from '../detail/ImgTextList';

function SpecialColumn() {
  const [{ data, total, page }, setData] = useState({
    data: [],
    total: 0,
    page: 1,
  });
  const [searchParams] = useSearchParams();
  const keyWord = searchParams.get('word') || '';

  console.warn(page, total);

  // const getData = useCallback(
  //   (pageIndex) => {
  //     if (total <= data.length && pageIndex !== 1) return;
  //     getChannel({ pageSize: 10, pageIndex, keyWord }).then((res: any) => {
  //       if (Array.isArray(res?.data)) {
  //         setData((pred) => {
  //           if (Array.isArray(pred.data)) {
  //             return {
  //               data: [...pred.data, ...res.data],
  //               total: res?.count,
  //               page: pageIndex,
  //             };
  //           }
  //           return {
  //             data: res?.data,
  //             total: res?.count,
  //             page: pageIndex,
  //           };
  //         });
  //       }
  //     });
  //   },
  //   [data.length, keyWord, total]
  // );

  useEffect(() => {
    getChannel({ pageSize: 10, pageIndex: 1, keyWord })
      .then((res: any) => {
        if (Array.isArray(res?.data)) {
          setData({
            data: res?.data,
            total: res?.count,
            page: 1,
          });
        }
      })
      .catch(() => {});
  }, [keyWord]);

  return (
    <div className='h-full flex flex-col px-4 overflow-hidden'>
      <div
        // scrollY
        className='flex-1 rounded-2xl shadow-card bg-white my-4'
        // onScrollToLower={() => getData(page + 1)}
      >
        <ImgTextList data={data} />
      </div>
    </div>
  );
}

export default SpecialColumn;
