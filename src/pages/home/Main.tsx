import { useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Tabs, isArray } from 'esy-ui';
import { Img, Swiper, Ittitle, Live, Boutique, Common } from '@/components';
import { getIndexInit, getMoreList, getSubMoreList, getSubCategory, getCategoryInit } from '@/services';
import { useGlobalStore, useHomeStore } from '@/mobx';
import { useFormatText, useNavigation } from '@/hooks';
import { quickPageUrl } from '@/constants';

const TabItem = Tabs.Item;

function Main() {
  const { setMoreStatus, firstIndex, hasMore } = useHomeStore();
  const { changeState } = useGlobalStore();
  const [data, setData] = useState<any>({});
  const [subData, setSubData] = useState<any>({});
  const [subTypes, setSubTypes] = useState<any>([]);
  const [id, setId] = useState(null);
  const [subId, setSubId] = useState(null);
  const [moreData, setMoreData] = useState([]);
  const [hasSubMore, setHasSubMore] = useState(false);
  const navigation = useNavigation();
  const text = useFormatText();

  const getMoreData = useCallback((id, page = 1) => {
    if (!id) return;
    getMoreList({ categoryId: id, pageSize: 10, pageIndex: page })
      .then((res: any) => {
        if (res?.data) {
          setMoreData(res?.data);
        }
      })
      .catch(() => {});
  }, []);

  const getSubMoreData = useCallback((id, page = 1) => {
    if (!id) return;
    getSubMoreList({ categoryId: id, pageSize: 10, pageIndex: page })
      .then((res: any) => {
        if (res?.data) {
          setMoreData(res?.data);
        }
      })
      .catch(() => {});
  }, []);

  const getFirstData = useCallback(() => {
    changeState('isLoading', true);
    getIndexInit()
      .then((res: any) => {
        console.warn('首页数据初始化res:', res);
        if (res?.data) {
          setData(res?.data);
          if (isArray(res?.data?.header)) {
            setId(res?.data?.header[0]?.id);
            setMoreStatus(res?.data?.header[0]?.id, res?.data?.hasMore);
          }
        }
      })
      .catch((error) => {
        console.warn('error 错误信息', error);
      })
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState, setMoreStatus]);

  useEffect(() => {
    // 切换subId 时获取数据
    if (subId && subTypes.length > 0) {
      changeState('isLoading', true);
      getSubCategory({ id: subId })
        .then((res: any) => {
          console.warn({ res });
          if (res?.data) {
            setSubData(res?.data);
            setHasSubMore(res?.data?.hasMore);
          }
        })
        .catch(() => {})
        .finally(() => {
          changeState('isLoading', false);
        });
    }
  }, [changeState, subId, subTypes]);

  useEffect(() => {
    // 推荐以外的tab 第一个subType数据
    if (id && id !== firstIndex) {
      changeState('isLoading', true);
      getCategoryInit({ id })
        .then((res: any) => {
          if (res?.data) {
            setSubData(res?.data);
            setSubId(res?.data?.subCategory[0]?.id);
            setSubTypes(res?.data?.subCategory);
            setHasSubMore(res?.data?.hasMore);
          }
        })
        .catch(() => {})
        .finally(() => {
          changeState('isLoading', false);
        });
    }
  }, [changeState, firstIndex, id]);

  useEffect(() => {
    // 初始化更多推荐
    if (!id) return;
    if (id === firstIndex && hasMore) {
      getMoreData(id, 1);
    } else if (id !== firstIndex && subId && hasSubMore) {
      getSubMoreData(subId, 1);
    } else {
      setMoreData([]);
    }
  }, [id, firstIndex, getMoreData, getSubMoreData, hasMore, hasSubMore, subId]);

  useEffect(() => {
    // 初始化推荐数据
    getFirstData();
  }, [getFirstData]);

  // 跳转到其他页面
  const goPath = (info) => {
    if (info.key) {
      navigation(`/${quickPageUrl[info.key]}?id=${info.configData}`);
    }
  };

  if (isArray(data?.header) && data.header.length > 0) {
    return (
      <div className=''>
        <Tabs
          tabs={null}
          onTouchStart={(info: any) => {
            console.warn({ info });
            if (id !== info.paneKey) {
              setId(info.paneKey);
            }
          }}
          indicatorRatio={0.25}
          classNames={{
            contentitem: 'w-full inline-block align-top',
            'indicator:horizontal': 'h-1 bottom-0',
            'title:active': 'text-primary-text',
            'title:normal': 'px-1 py-1.5 w-20 h-9 text-assist',
            indicator: 'absolute bg-active-text rounded-3xl transition-left-top duration-250 z-1',
          }}
        >
          {data.header.map((it, idx) => (
            <TabItem key={`title-${it.id}`} title={it.categoryName} paneKey={it.id}>
              {idx === 0 ? (
                <>
                  {isArray(data?.banners) && (
                    <div className='px-4 h-30 mt-2 mb-4'>
                      <Swiper imgClassName='h-30 flex-1 rounded-lg' list={data?.banners} />
                    </div>
                  )}

                  <div className='flex items-center'>
                    {isArray(data?.quickViews) &&
                      data?.quickViews.map((it, idx) => (
                        <div
                          className='flex-1 flex flex-col justify-center items-center'
                          key={it.id || idx}
                          onClick={() => {
                            goPath(it);
                          }}
                        >
                          <Img className='w-8 h-8' src={it.icon} isNoTheme />
                          <div className='text-xs text-assist'>{it?.quickName}</div>
                        </div>
                      ))}
                  </div>
                  <div className='px-4 my-4'>
                    <Ittitle className='mb-2' title={text({ text: '最新直播活动', key: 'new_live_active' })} />
                    <Live data={isArray(data?.lives) && isArray(data?.lives[0]?.items) ? data?.lives[0]?.items : []} />
                  </div>
                  {isArray(data?.modules) &&
                    data?.modules.map((it, idx) => {
                      if (it.bgImg) {
                        return <Boutique key={it.id || idx} {...it} />;
                      }
                      return (
                        <div key={it.id || idx} className='px-4 py-3 bg-default'>
                          <Common {...it} />
                        </div>
                      );
                    })}
                  {isArray(moreData) && moreData.length > 0 && <Common titleClassName='pt-4 px-4' contents={moreData} moduleName={text({ text: '更多推荐', key: 'more' })} />}
                </>
              ) : (
                <>
                  <div className='flex items-center justify-between overflow-x-auto overflow-y-hidden mx-4 my-2'>
                    {isArray(subTypes) &&
                      subTypes.length > 0 &&
                      subTypes.map((subItem, idx) => (
                        <div
                          className={`py-1 px-4 flex-1 text-xs rounded-full mr-4 last:mr-0 ${subId === subItem.id ? 'bg-active-bg text-active-text' : 'text-primary-text bg-default'}`}
                          key={subItem.id || idx}
                          onClick={() => {
                            if (subId !== subItem.id) {
                              setSubId(subItem.id);
                            }
                          }}
                        >
                          {subItem.categoryName}
                        </div>
                      ))}
                  </div>
                  <div className='bg-default px-4 py-2'>{isArray(subData?.banners) && subData.banners.length > 0 && <Swiper imgClassName='h-30 flex-1 rounded-lg' list={subData.banners} />}</div>
                  {isArray(moreData) && moreData.length > 0 && <Common titleClassName='pt-2 px-4' contents={moreData} moduleName={text({ text: '更多推荐', key: 'more' })} />}
                </>
              )}
            </TabItem>
          ))}
        </Tabs>
      </div>
    );
  }

  return null;
}

export default observer(Main);
