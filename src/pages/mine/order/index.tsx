import { Img, Infiniteloading } from '@/components';
import { useNavigation } from '@/hooks';
import { getContentDetail, getCourseOrderList } from '@/services';
import { Tabs } from 'esy-ui';
import { memo, useEffect, useState } from 'react';
const TabItem = Tabs.Item;

// const orderList = [
//   {
//     id: 3,
//     orderType: 1,
//     orderNo: '2024011616563672800001006001',
//     orderAmount: 99,
//     actualAmount: 0.01,
//     createTime: '2024-01-16 16:56:36',
//     payTime: '2024-01-16 16:57:13',
//     contentId: 3,
//     contentTitle: '老梁的24节人情世故练达课：社会艰险套路多，我帮你来击破！',
//     coverUrl: 'https://img.lycheer.net/cover/67771467/60473105052d704111b4cd20.jpg',
//     contentType: 1,
//   },
//   {
//     id: 4,
//     orderType: 1,
//     orderNo: '2024011616563672800001006001',
//     orderAmount: 99,
//     actualAmount: 0.01,
//     createTime: '2024-01-16 16:56:36',
//     payTime: '2024-01-16 16:57:13',
//     contentId: 3,
//     contentTitle: '老梁的24节人情世故练达课：社会艰险套路多，我帮你来击破！',
//     coverUrl: 'https://img.lycheer.net/cover/67771467/60473105052d704111b4cd20.jpg',
//     contentType: 1,
//   },
// ];
const tabs = [
  { title: <>课程订单</>, paneKey: '0', children: <>容-1</> },
  { title: <>实体商品订单</>, paneKey: '1', children: <>容-2</> },
];
const Order = () => {
  const navigation = useNavigation();

  const [current, setCurrent] = useState(0); // 设置当前tab
  const [data, setData] = useState<any>({ list: [], dataTotal: null }); //订单列表

  const [pageSize, setPageSize] = useState(1);

  useEffect(() => {
    getDataList(1);
  }, []);

  //加载数据
  const getDataList = (size) => {
    setPageSize(size);
    getCourseOrderList({
      pageIndex: size,
      pageSize: 10,
    })
      .then((res: any) => {
        console.log(res);
        if (res?.code === 210) {
          const newRes = res?.data.map((item) => {
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

  // q切换tab
  const changeTab = (value) => {
    if (value !== current) {
      setCurrent(value);
    }
  };

  const handleIntoOrder = (item) => {
    if (item?.contentId) {
      getContentDetail({ id: item?.contentId })
        .then((res: any) => {
          console.log('根据详情决定订单跳转', res);
          if (res?.code === 210) {
            const { isLive } = res?.data;
            if (isLive) {
              navigation(`/detail?id=${item?.contentId}`);
            } else {
              navigation(`/detail?id=${item?.contentId || item?.id}`);
            }
          }
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div>
      <Tabs
        tabs={null}
        isRipple={false}
        classNames={{
          contentitem: 'w-full inline-block align-top',
          'title:active': 'text-active-text',
          'title:nodisabled': 'cursor-pointer text-assist',
          title: 'text-center transition-all duration-250 z-1 relative overflow-hidden text-nowrap break-keep whitespace-nowrap flex-1-0-auto bg-white',
          indicator: 'absolute bg-active-text rounded-3xl transition-left-top duration-250 z-1 h-1',
          content: 'p-4',
        }}
        indicatorRatio={0.2}
        onClick={(value) => changeTab(value)}
      >
        <TabItem title={tabs[0].title} paneKey={'0'} className='bg-white'>
          <Infiniteloading hasMore={data.dataTotal > (data.list || []).length} containerId='order-refreshScroll' loadMore={() => getDataList(pageSize + 1)}>
            {data &&
              data.list?.map((item: any) => {
                return (
                  <div className='rounded-lg p-3 bg-white shadow-tile mb-2'>
                    {/* 0201 */}
                    <div className='flex items-center justify-between border-b-[1px] border-split text-assist text-xs pb-1'>
                      <div>订单类型：暂不区分</div>
                      <div>购于：{item.payTime.split(' ')[0]}</div>
                    </div>
                    <div className='flex py-4 border-b-[1px] border-split'>
                      <Img isNoTheme src={item.coverUrl} className='w-31 h-19 rounded mr-2' />
                      <div>
                        <div className='text-sm text-primary-text w-46 oe-two'>{item.contentTitle}</div>
                        <div className='flex items-baseline justify-between h-6 pt-3'>
                          <div className='text-sm text-active-text'>￥{item.actualAmount}</div>
                          <div
                            className={`text-sm w-20 h-6 rounded-7.5 flex justify-center items-center m-0 text-white bg-active-text`}
                            onClick={() => {
                              handleIntoOrder(item);
                            }}
                          >
                            进入听课
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='pt-2 flex justify-end'>
                      <div
                        className='w-16 h-6 flex justify-center items-center rounded-7.5 bg-split text-sm text-primary-text m-0'
                        onClick={() => {
                          console.log('点击售后');
                        }}
                      >
                        售后
                      </div>
                    </div>
                  </div>
                );
              })}
          </Infiniteloading>
        </TabItem>
        <TabItem title={tabs[1].title} paneKey={'1'}>
          <div className='text-center'>实体商品订单</div>
        </TabItem>
      </Tabs>
    </div>
  );
};
export default memo(Order);
