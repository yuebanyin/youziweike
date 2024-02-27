import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { isArray } from 'esy-ui';
import { getLiveRoom, getChannel, getContent } from '@/services';
import ImgTextList from './ImgTextList';
import { formatW } from '@/utils/digit';
import { useFormatText, useNavigation } from '@/hooks';
import { ssGetJsonItem, ssSetJsonItem } from '@/utils';
import { Img } from '@/components';
import { defaultSearchValue } from '..';
import searchPng from '@/assets/images/common/search.png';

const defaultParams = {
  pageIndex: 1,
  pageSize: 10,
};

function Detail() {
  const [val, setVal] = useState('');
  const [dataR, setDataR] = useState({ data: [], total: 0 });
  const [dataC, setDataC] = useState({ data: [], total: 0 });
  const [dataL, setDataL] = useState({ data: [], total: 0 });
  // const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const param = searchParams.get('search');
  const navigation = useNavigation();
  const text = useFormatText();

  const getLR = useCallback((v?: string) => {
    getLiveRoom({ ...defaultParams, pageSize: 3, keyWord: v })
      .then((res: any) => {
        setDataR({ data: res?.data, total: res?.count });
      })
      .catch(() => {});
  }, []);

  const getZL = useCallback((v?: string) => {
    getChannel({ ...defaultParams, pageSize: 3, keyWord: v })
      .then((res: any) => {
        setDataC({ data: res?.data, total: res?.count });
      })
      .catch(() => {});
  }, []);

  const getKC = useCallback((v?: string, page?: number) => {
    getContent({ ...defaultParams, pageIndex: page || 1, keyWord: v })
      .then((res: any) => {
        setDataL((pred) => {
          if (Array.isArray(pred.data)) {
            return {
              data: [...pred.data, ...res.data],
              total: res?.count,
            };
          }
          return {
            data: res?.data,
            total: res?.count,
          };
        });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!param) return;
    getLR(param);
    getZL(param);
    getKC(param);
  }, [getLR, getZL, getKC, param]);

  useEffect(() => {
    if (param) {
      setVal(param);
    }
  }, [param]);

  const changeValue = (e) => {
    setVal(e?.target?.value);
    if (!e?.target?.value) {
      navigation(-1);
    }
  };

  const activeClick = () => {
    if (val) {
      getLR(val);
      getZL(val);
      getKC(val);
      const newHistorys: string[] = [];
      const historys = ssGetJsonItem('search-history');
      historys.forEach((his) => {
        if (newHistorys.length >= 7) {
          //
        } else if (his === val) {
          // 其他位置
        } else {
          newHistorys.push(his);
        }
      });
      ssSetJsonItem('search-history', [val, ...newHistorys]);
    }
  };

  // const nextPage = () => {
  //   if (dataL.total <= dataL.data.length) return;
  //   getKC(val, page + 1);
  //   setPage(page + 1);
  // };

  return (
    <div className='bg-white w-full h-full flex flex-col overflow-hidden'>
      <div className='py-2'>
        <div className='flex items-center justify-between mx-4'>
          <div className='flex items-center py-1 px-4 bg-default rounded-full flex-1 h-8'>
            <Img src={searchPng} isNoTheme className='w-6 h-6 mr-2' />
            <input
              value={val}
              onChange={changeValue}
              placeholder={defaultSearchValue}
              className='bg-default w-full placeholder:text-xs placeholder:text-assist text-primary-text text-sm outline-0 border-0'
            />
          </div>
          <div onClick={activeClick} className='px-4 h-8 bg-active-text text-white text-sm flex items-center justify-center ml-2 rounded-full cursor-pointer'>
            {text({ text: '搜索', key: 'search' })}
          </div>
        </div>
      </div>
      <div className='flex flex-col bg-default overflow-y-auto'>
        {isArray(dataR.data) && dataR.data?.length > 0 && (
          <div className='m-4'>
            <div className='flex items-center justify-between '>
              <div className='text-base font-bold'>{text({ text: '直播间', key: 'live_room' })}</div>
              <div
                onClick={() => {
                  navigation(`live-room?word=${val}`);
                }}
                className='text-xs text-assist cursor-pointer'
              >
                {text({ text: '查看更多', key: 'view_more' })} &gt;
              </div>
            </div>
            <div className=' grid grid-cols-3 gap-4 mt-4 w-full'>
              {dataR.data?.map((it: any) => (
                <div
                  className='px-2.5 py-4 flex flex-col bg-white rounded-lg shadow-card cursor-pointer'
                  key={it?.id}
                  onClick={() => {
                    navigation(`live-official?id=${it.id}&word=${val}`);
                  }}
                >
                  <Img src={it?.profile} className='w-12 h-12 m-auto rounded-half' isNoTheme />
                  <div className='text-sm truncate mt-1 mb-0.5 text-center w-20'>{it?.name}</div>
                  <div className='text-mini text-assist text-center'>
                    {formatW(it?.popularCount)}
                    {text({ text: '关注', key: 'care' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {isArray(dataC.data) && dataC.data?.length > 0 && (
          <div className='m-4'>
            <div className='flex items-center justify-between'>
              <div className='text-base font-bold'>
                {text({ text: '专栏', key: 'special_column' })}（{dataC?.total}）
              </div>
              <div onClick={() => navigation(`special-column?word=${val}`)} className='text-xs text-assist cursor-pointer'>
                {text({ text: '查看更多', key: 'view_more' })} &gt;
              </div>
            </div>
            <ImgTextList data={dataC?.data} />
          </div>
        )}
        {dataL.data?.length > 0 && (
          <div className='flex flex-col flex-1 m-4'>
            <div className='text-base font-bold'>{text({ text: '课程', key: 'learn' })}</div>
            <ImgTextList data={dataL?.data} type={2} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Detail;
