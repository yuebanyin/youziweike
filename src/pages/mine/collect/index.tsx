import { memo, useEffect, useState } from 'react';
import CollectBlock from './block';
import fire from '@/assets/images/common/mine/fire.png';
import { getCollectList, getCollect } from '@/services';
import { Img, Infiniteloading, Modal } from '@/components';
import { useNavigation } from '@/hooks';
import { Toast } from 'esy-ui';

const MyCollect = () => {
  const navigation = useNavigation();

  const [data, setData] = useState<any>({ list: [], dataTotal: null }); //收藏列表

  const [pageSize, setPageSize] = useState(1);
  const [open, setOpen] = useState(false);
  const [focusItem, setFocusItem] = useState();

  useEffect(() => {
    getDataList(1);
  }, []);

  //加载数据
  const getDataList = (size) => {
    setPageSize(size);
    getCollectList({
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
  // 训练营收藏
  // const handleTrain = () => {
  //   console.log('训练营收藏');
  // };

  // 是否收藏
  const handleCollect = (item) => {
    console.log('点击收藏按钮', item, data);
    setFocusItem(item);

    if (item.status) {
      setOpen(true);
    } else {
      getFreshData(item);
      getSingleCollect(item, '收藏成功');
    }
  };

  // 单个收藏操作
  const getSingleCollect = (item, msg) => {
    getCollect({
      id: item.id,
    })
      .then((res: any) => {
        console.log(res);
        if (res.code === 210) {
          Toast.show({
            content: msg,
            duration: 1500,
            type: 'success',
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 更新数据
  const getFreshData = (item) => {
    const newRes = data.list.map((idx: any) => {
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
      <div className='flex items-center justify-between p-4'>
        <div className='text-primary-text text-base font-bold'>收藏记录</div>
        {/* <DButton
          size="mini-pro"
          className="w-25 text-sm text-active-text m-0 border-[1px] border-active-text"
          onClick={() => {
            handleTrain();
          }}
        >
          训练营收藏
        </DButton> */}
      </div>

      <Infiniteloading hasMore={data.dataTotal > (data.list || []).length} containerId='collect-refreshScroll' loadMore={() => getDataList(pageSize + 1)}>
        {data?.list?.length > 0 ? (
          data.list.map((it: any) => {
            return (
              <div key={it.id} className={`bg-white br-2 mb-2 flex p-3 shadow-tile`}>
                <div className='bg-default mr-2 rounded'>
                  <Img isNoTheme src={it.coverUrl} className='w-28 h-16 ' />
                  <div className='text-center'>
                    <Img isNoTheme src={fire} className='w-4 h-4 mr-2' />
                    <span className='text-assist text-xs'>{it.popularCount} 人</span>
                  </div>
                </div>
                <div>
                  <div className='text-sm text-primary-text oe-two'>{it.title}</div>
                  <div className=' flex items-baseline justify-between w-48 h-6 pt-3'>
                    <div className='text-xs text-assist'>已更新{it.currUpdate}节</div>
                    <div
                      className={`w-22 h-8 rounded-7.5 text-sm flex items-center justify-center m-0 ${it.status ? 'text-btn-gray border-[1px] border-split' : 'text-white bg-active-text '}`}
                      onClick={() => {
                        handleCollect(it);
                      }}
                    >
                      {it.status ? '取消收藏' : '收藏'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <CollectBlock>
            <div className='wds-text3 color-assist'>暂无收藏的课程</div>
            <div className='wds-text3 color-assist'>快去首页发现更多的内容吧</div>
            <div
              onClick={() => {
                navigation('/');
              }}
              className='w-26 rounded-7.5 flex items-center justify-center h-8 text-sm text-active-text m-0 border-[1px] border-active-text mt-6'
            >
              回首页看看
            </div>
          </CollectBlock>
        )}
      </Infiniteloading>
      <Modal
        open={open}
        title='是否取消收藏该专栏'
        cancleText='继续收藏'
        okText='取消收藏'
        onOk={() => {
          getFreshData(focusItem);
          getSingleCollect(focusItem, '取消成功');
          setOpen(false);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default memo(MyCollect);
