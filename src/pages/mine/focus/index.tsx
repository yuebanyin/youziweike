import { Img, Infiniteloading, Modal } from '@/components';
import { getOfficialList, getOfficial } from '@/services';
import { Toast } from 'esy-ui';
import { memo, useEffect, useState } from 'react';

const MyFocus = () => {
  const [data, setData] = useState<any>({ list: [], dataTotal: null }); //关注列表

  const [pageSize, setPageSize] = useState(1);
  const [open, setOpen] = useState(false);
  const [focusItem, setFocusItem] = useState();

  useEffect(() => {
    getDataList(1);
  }, []);

  //加载数据
  const getDataList = (size) => {
    setPageSize(size);
    getOfficialList({
      pageIndex: size,
      pageSize: 10,
    })
      .then((res: any) => {
        console.log(res);
        if (res.code === 210) {
          const newRes = res.data.map((item) => {
            return { ...item, status: true };
          });
          console.log('newwww', newRes);
          setData((pre) => ({ ...pre, list: [...pre.list, ...newRes], dataTotal: res?.count }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 我要直播
  // const handleLive = () => {
  //   console.log('我要直播');
  // };

  // 是否关注
  const handleFocus = (item) => {
    console.log('点击关注按钮', item, data);
    setFocusItem(item);

    if (item.status) {
      setOpen(true);
    } else {
      getFreshData(item);
      getSingleFocus(item, '关注成功');
    }
  };

  // 单个关注操作
  const getSingleFocus = (item, msg) => {
    getOfficial({
      id: item.id,
    })
      .then((res: any) => {
        console.log(res);
        if (res.data.code === 210) {
          Toast.show({ content: msg, type: 'success', duration: 1500 });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 更新数据
  const getFreshData = (item) => {
    const newRes = data.list.map((idx) => {
      if (idx.id === item.id) {
        return { ...idx, status: !idx.status };
      } else {
        return idx;
      }
    });
    setData((pre) => ({ ...pre, list: newRes }));
  };
  return (
    <div>
      <div className='flex justify-between items-center p-4 mb-4'>
        <div className='text-primary-text text-base font-bold'>我关注的直播间</div>
        {/* <DButton
          size="mini-pro"
          className="w-22 text-sm bg-active-text text-white m-0"
          onClick={() => {
            handleLive();
          }}
        >
          我要直播
        </DButton> */}
      </div>

      <Infiniteloading hasMore={data.dataTotal > (data.list || []).length} containerId='focus-refreshScroll' loadMore={() => getDataList(pageSize + 1)}>
        {data?.list?.map((item: any) => {
          return (
            <>
              <div
                key={item.id}
                className='p-3 shadow-tile mb-2 flex items-center justify-between rounded-lg mx-4'
                onClick={() => {
                  // Taro.navigateTo({
                  //   url: `/packSearch/liveOfficial/index?id=${item.id}`,
                  // });
                }}
              >
                <Img isNoTheme className='w-10 h-10 rounded-half' src={item?.profile} />
                <div>
                  <div className='text-sm text-primary-text'>{item.name}</div>
                  <div className='text-xs text-assist w-40 oe'>{item.description}</div>
                </div>
                <div
                  className={`w-22 h-8 rounded-7.5 text-sm flex items-center justify-center m-0 ${item.status ? 'text-btn-gray border-[1px] border-split' : 'text-white bg-active-text '}`}
                  onClick={() => {
                    handleFocus(item);
                  }}
                >
                  {item.status ? '取消关注' : '关注'}
                </div>
              </div>
            </>
          );
        })}
      </Infiniteloading>
      <Modal
        open={open}
        title='是否不再关注该直播间'
        cancleText='取消'
        okText='不再关注'
        onOk={() => {
          getFreshData(focusItem);
          getSingleFocus(focusItem, '取消成功');
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default memo(MyFocus);
