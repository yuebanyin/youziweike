import { Infiniteloading } from '@/components';
import { getUserWithdrawalList } from '@/services';
import { memo, useEffect, useState } from 'react';
import RecordsBlock from './block';

const WithdrawRecords = () => {
  const [rest, setRest] = useState(null);
  const [list, setList] = useState<any>([]);
  const [pageSize, setPageSize] = useState(1);

  useEffect(() => {
    getDataList(1);
  }, []);

  //加载数据
  const getDataList = (pageSize) => {
    console.log('pagesize', pageSize);
    setPageSize(pageSize);
    getUserWithdrawalList({
      pageIndex: pageSize,
      pageSize: 10,
    })
      .then((res: any) => {
        console.log(res);
        if (res.data.code === 210) {
          const { withdrawalList, userCommissionInfo } = res.data.data;
          setList((pre) => [...pre, ...withdrawalList]); // 更新记录
          setRest(userCommissionInfo.currentCommission);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStatus = (status) => {
    let res = '';
    switch (status) {
      case 0:
        res = '审核中';
        break;
      case 1:
        res = '打款中';
        break;
      case 2:
        res = '已打款';
        break;
      case 3:
        res = '已驳回';
        break;
      default:
        break;
    }
    return res;
  };
  return (
    <div className='p-4 flex flex-col flex-1'>
      <div className='w-86 rounded p-2.5 bg-active-text mb-3 m-auto'>
        <span className='text-sm text-white mr-2'>当前您的钱包余额(元)</span>
        <span className='text-xl text-white'>{rest}</span>
      </div>
      <Infiniteloading
        hasMore={false}
        containerId='withdraw-refreshScroll'
        loadMore={() => {
          console.log(0);
          getDataList(pageSize + 1);
        }}
      >
        {list?.length > 0 ? (
          list.map((item: any) => {
            return (
              <div key={item.id} className='bg-white p-3 rounded-lg mb-2 shadow-tile'>
                <div className='flex justify-between mb-2'>
                  <div className='text-xs text-primary-text'>提现单号</div>
                  <div className='text-xs text-assist'>{item?.orderNo}</div>
                </div>
                <div className='flex justify-between mb-2'>
                  <div className='text-xs text-primary-text'>申请时间</div>
                  <div className='text-xs text-assist'>{item?.insertTime}</div>
                </div>
                <div className='flex justify-between mb-2'>
                  <div className='text-xs text-primary-text'>申请金额</div>
                  <div className='text-xs text-assist'>{item?.amount}</div>
                </div>
                <div className='flex justify-between mb-2'>
                  <div className='text-xs text-primary-text'>实际到账金额（手续费）</div>
                  <div className='d-f'>
                    <div className='text-xs color-main'>￥{item?.actAmount}</div>
                    <div className='text-xs text-assist'>(￥{item?.fee})</div>
                  </div>
                </div>
                <div className='flex justify-between mb-2'>
                  <div className='text-xs text-primary-text'>申请状态</div>
                  <div className='text-xs text-assist'>{getStatus(item?.orderState)}</div>
                </div>
              </div>
            );
          })
        ) : (
          <RecordsBlock />
        )}
      </Infiniteloading>
    </div>
  );
};

export default memo(WithdrawRecords);
