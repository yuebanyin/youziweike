import { Img, Infiniteloading } from '@/components';
import { getMyMessageList } from '@/services';
import { Tabs } from 'esy-ui';
import { memo, useEffect, useState } from 'react';
import avatar from '@/assets/images/common/mine/avatar.png';
const TabItem = Tabs.Item;

const tabs = [
  { title: <>我的消息</>, paneKey: '0', children: <>容-1</> },
  { title: <>系统消息</>, paneKey: '1', children: <>容-2</> },
];

// const messageInit = [
//   {
//     senderId: -101,
//     profile: '',
//     nickName: '',
//     messageCount: 1,
//     lastMessag: '亲爱的用户，您提交的个人信息已通过审核',
//     lastMessagTime: '2024-01-12 16:02:05',
//   },
//   {
//     senderId: -102,
//     profile: '',
//     nickName: '',
//     messageCount: 1,
//     lastMessag: '亲爱的用户，您提交的个人信息已通过审核',
//     lastMessagTime: '2024-01-12 16:02:05',
//   },
//   {
//     senderId: -103,
//     profile: '',
//     nickName: '',
//     messageCount: 1,
//     lastMessag: '亲爱的用户，您提交的个人信息已通过审核',
//     lastMessagTime: '2024-01-12 16:02:05',
//   },
// ];
const Message = () => {
  const [current, setCurrent] = useState(0); // 设置当前tab
  const [data, setData] = useState<any>({ list: [], dataTotal: null }); //聊天列表
  const [pageSize, setPageSize] = useState(1);
  // const [chatPageSize, setChatPageSize] = useState(1); //具体消息
  // const [chatList, setChatList] = useState<any>([]); //具体消息列表

  useEffect(() => {
    getDataList(1);
  }, []);

  //加载聊天列表数据
  const getDataList = (size) => {
    setPageSize(size);
    getMyMessageList({
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

  //具体的聊天消息列表
  // const getChatData = (item, chatPageSize) => {
  //   setPageSize(chatPageSize);
  //   getChatMessage({
  //     pageIndex: pageSize,
  //     pageSize: 10,
  //     senderId: item?.senderId,
  //   })
  //     .then((res: any) => {
  //       console.log(res);
  //       if (res.code === 210) {
  //         const newRes = res.data.map((item) => {
  //           return { ...item, status: true };
  //         });
  //         console.log('newwww', newRes);
  //         setChatList((pre) => [...pre, ...newRes]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // q切换tab
  const changeTab = (value) => {
    if (value !== current) {
      setCurrent(value);
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
          indicator: 'absolute bg-active-text rounded-3xl transition-left-top duration-250 z-1',
        }}
        indicatorRatio={0.4}
        onClick={(value) => changeTab(value)}
      >
        <TabItem title={tabs[0].title} paneKey={'0'} className='bg-white'>
          <Infiniteloading hasMore={data.dataTotal > (data.list || []).length} containerId='message-refreshScroll' loadMore={() => getDataList(pageSize + 1)}>
            {data.list &&
              data.list.map((item) => {
                return (
                  <div className='mt-1 px-4 py-3 flex items-center border-b-[1px] border-split bg-white flex-1'>
                    <Img isNoTheme src={item.profile || avatar} className='w-10 h-10 rounded-half mr-2' />
                    <div className='flex-1'>
                      <div className='flex justify-between'>
                        <div className='text-sm text-primary-text'>{item.nickName || '客服消息'}</div>
                        <div className='text-xs text-assist'>{item.lastMessagTime}</div>
                      </div>
                      <div className='flex justify-between'>
                        <div className='w-50 oe text-xs text-assist'>{item.lastMessag}</div>
                        <div className='w-4 h-4 rounded-half flex items-center justify-center text-white text-mini bg-pri-red'>{item.messageCount}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </Infiniteloading>
        </TabItem>
        <TabItem title={tabs[1].title} paneKey={'1'}>
          <div className='text-center mt-4'>这里是系统消息</div>
        </TabItem>
      </Tabs>
    </div>
  );
};

export default memo(Message);
